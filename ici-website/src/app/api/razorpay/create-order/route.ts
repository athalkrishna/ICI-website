import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { razorpay } from '@/lib/razorpay';

const PRICES: Record<string, number> = {
  catalyst: 215000,
  architect: 345000,
  sage: 495000,
  luminary: 695000,
};

const createOrderSchema = z.object({
  levelId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  country: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid data' }, { status: 400 });
    }

    const { levelId, name, email, phone, country } = parsed.data;

    if (!PRICES[levelId]) {
      return NextResponse.json({ error: 'Invalid level specified' }, { status: 400 });
    }

    const baseAmount = PRICES[levelId];
    const totalAmount = baseAmount * 1.18;
    const amountInPaise = Math.round(totalAmount * 100);

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    await prisma.checkoutOrder.create({
      data: {
        razorpayOrderId: order.id,
        levelId,
        email: email.toLowerCase().trim(),
        name: name.trim(),
        phone,
        country,
        amountPaise: amountInPaise,
        currency: 'INR',
      },
    });

    return NextResponse.json(order);
  } catch (error: unknown) {
    console.error('Error creating Razorpay order:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
