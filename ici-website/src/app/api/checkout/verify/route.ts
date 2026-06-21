import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createHmac } from 'crypto';
import { prisma } from '@/lib/prisma';
import { jsonOk, jsonError, serverError } from '@/lib/api';
import { createStudentAccount, checkoutLevelToEnrolledLevel } from '@/lib/enrollment';
import { logActivity } from '@/lib/activity';

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const body = `${orderId}|${paymentId}`;
  const expected = createHmac('sha256', secret).update(body).digest('hex');
  return expected === signature;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload');
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

    if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return jsonError('Payment verification failed', 400);
    }

    const order = await prisma.checkoutOrder.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!order) {
      return jsonError('Order not found', 404);
    }

    if (order.status === 'COMPLETED' && order.studentUserId) {
      return jsonOk({
        alreadyProcessed: true,
        userId: order.studentUserId,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`,
      });
    }

    const enrolledLevel = checkoutLevelToEnrolledLevel(order.levelId);
    const existingUser = await prisma.user.findUnique({ where: { email: order.email } });

    let studentUserId = existingUser?.id;
    let tempPassword: string | undefined;
    let loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login`;

    if (!existingUser) {
      const created = await createStudentAccount(
        {
          email: order.email,
          name: order.name,
          phone: order.phone,
          country: order.country,
          enrolledLevel,
          enrolmentSource: 'PAYMENT',
          studentStatus: 'ENROLLED',
          notes: `Auto-enrolled via Razorpay payment ${razorpay_payment_id}`,
        },
        { sendWelcomeEmail: true },
      );
      studentUserId = created.userId;
      tempPassword = created.tempPassword;
      loginUrl = created.loginUrl;

      await logActivity({
        action: 'STUDENT_CREATED',
        entity: 'StudentProfile',
        entityId: created.profileId,
        details: `${order.name} (payment)`,
        userName: 'Payment System',
      });
    } else if (existingUser.role === 'STUDENT') {
      await prisma.studentProfile.updateMany({
        where: { userId: existingUser.id },
        data: {
          enrolledLevel: enrolledLevel ?? undefined,
          enrolmentSource: 'PAYMENT',
          studentStatus: 'ENROLLED',
        },
      });
    }

    await prisma.checkoutOrder.update({
      where: { id: order.id },
      data: {
        status: 'COMPLETED',
        paymentId: razorpay_payment_id,
        studentUserId,
        completedAt: new Date(),
      },
    });

    return jsonOk({
      success: true,
      userId: studentUserId,
      loginUrl,
      credentialsSent: !existingUser,
      tempPassword: tempPassword ?? null,
    });
  } catch (err) {
    console.error('[checkout/verify POST]', err);
    if (err instanceof Error && err.message.includes('already exists')) {
      return jsonError(err.message, 409);
    }
    return serverError();
  }
}
