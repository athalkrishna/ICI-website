import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';

const PRICES: Record<string, number> = {
  catalyst: 215000,
  architect: 345000,
  sage: 495000,
  luminary: 695000,
};

export async function POST(req: Request) {
  try {
    const { levelId } = await req.json();

    if (!levelId || !PRICES[levelId]) {
      return NextResponse.json({ error: 'Invalid level specified' }, { status: 400 });
    }

    const baseAmount = PRICES[levelId];
    // Add 18% GST
    const totalAmount = baseAmount * 1.18;
    const amountInPaise = Math.round(totalAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
