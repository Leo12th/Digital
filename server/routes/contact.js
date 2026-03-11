import { Router } from 'express'
import nodemailer from 'nodemailer'

export const contactRouter = Router()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '25', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
})

const TO_EMAIL = process.env.CONTACT_EMAIL || 'contato@digitalintegracoes.com.br'

contactRouter.post('/', async (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nome, e-mail e mensagem são obrigatórios' })
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Site Digital" <noreply@${req.hostname || 'localhost'}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Contato do site: ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
      html: `<p><strong>Nome:</strong> ${name}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Mensagem:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    })
    res.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err.message)
    res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente.' })
  }
})
