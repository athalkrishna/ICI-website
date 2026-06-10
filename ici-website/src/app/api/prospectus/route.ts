import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, country, interest, honeypot } = body

    // If honeypot is filled, it's a bot. Discard silently and return success.
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    if (!email || !name || !country) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 })
    }

    // TODO: Connect to actual database or CRM
    console.log('Prospectus requested for:', { name, email, country, interest })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
