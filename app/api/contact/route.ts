export const runtime = "nodejs";

import { NextResponse } from 'next/server'

export type ContactBody = {
  name: string
  email: string
  phone?: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody
    const { name, email, phone, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const user = process.env.EMAIL_USER?.trim()
    const pass = process.env.EMAIL_APP_PASSWORD?.trim().replace(/\s+/g, '') || ''

    if (!user || !pass) {
      console.error('Missing EMAIL_USER or EMAIL_APP_PASSWORD in environment.')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      )
    }

    const nodemailer = (await import('nodemailer')).default
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    })

    const mailOptions = {
      from: user,
      to: user,
      replyTo: email,
      subject: `[Cylage Contact] From ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        '',
        'Message:',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
      html: [
        '<p><strong>Name:</strong> ' + escapeHtml(name) + '</p>',
        '<p><strong>Email:</strong> ' + escapeHtml(email) + '</p>',
        phone ? '<p><strong>Phone:</strong> ' + escapeHtml(phone) + '</p>' : '',
        '<p><strong>Message:</strong></p>',
        '<p>' + escapeHtml(message).replace(/\n/g, '<br>') + '</p>',
      ]
        .filter(Boolean)
        .join(''),
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Contact form send error:', message, err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
