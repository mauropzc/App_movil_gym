import { Resend } from 'resend'

const resend = new Resend('re_iQ21j6RN_NkTESwg35pZHD9UoNpPhHC6g')

export async function sendEmails() {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
      to: ['yorth21@gmail.com'],
      subject: 'Codigo recuperacion de contraseña',
      text: 'Tu codigo es 123456',
  })

  if (error) {
    console.error('Error sending email:', error)
    return
  }

  console.log('Email sent:', data)
}