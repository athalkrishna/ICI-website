import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, honeypot } = body

    // If honeypot is filled, it's a bot. Discard silently and return success.
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // TODO: Connect to actual database or CRM
    console.log('Event interest registered for:', email)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
