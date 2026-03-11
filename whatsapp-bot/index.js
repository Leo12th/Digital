import 'dotenv/config'
import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import { GoogleGenAI } from '@google/genai'
import pino from 'pino'

const GEMINI_MODEL = 'gemini-2.0-flash'
const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null

const logger = pino({ level: 'silent' })

async function getAiReply(message, history = []) {
  if (!gemini) return null
  const systemInstruction = `Você é um assistente de qualificação de leads da empresa DIGITAL, que oferece Provador Virtual, Marketing Digital, CRM e Consulta de CNPJ para o segmento de vestuário.
Responda de forma amigável e profissional. Faça perguntas para entender: segmento (varejo/atacado/eventos), interesse (Provador/Marketing/CRM) e urgência.
Seja conciso. Ao final da qualificação, agradeça e sugira falar com um especialista.`

  const historyText = history
    .map((m) => `${m.fromMe ? 'Assistente' : 'Usuário'}: ${m.text}`)
    .join('\n\n')
  const fullPrompt = historyText
    ? `${historyText}\n\nUsuário: ${message}`
    : message

  try {
    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: fullPrompt,
      config: { systemInstruction },
    })
    return response.text || null
  } catch (err) {
    console.error('Gemini error:', err.message)
    return null
  }
}

async function connect() {
  const { state, saveCreds } = await useMultiFileAuthState('auth')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
    logger,
  })

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const status = lastDisconnect?.error instanceof Boom
        ? lastDisconnect.error.output.statusCode
        : null
      if (status === 401 || status === 403) {
        console.log('Sessão expirada. Delete a pasta auth/ e escaneie o QR novamente.')
      }
      setTimeout(connect, 5000)
    }
  })

  sock.ev.on('creds.update', saveCreds)

  const chatHistory = new Map()

  function getMessageText(msg) {
    return msg?.conversation || msg?.extendedTextMessage?.text || ''
  }

  sock.ev.on('messages.upsert', async ({ messages }) => {
    for (const m of messages) {
      const text = getMessageText(m.message)
      if (m.key.remoteJid?.endsWith('@s.whatsapp.net') && !m.key.fromMe && text) {
        const jid = m.key.remoteJid

        let history = chatHistory.get(jid) || []
        history = history.slice(-10)

        const aiReply = await getAiReply(text, history)
        const reply = aiReply || 'Olá! Obrigado pelo contato. Em breve um especialista responderá. Enquanto isso, conte-nos: qual é o seu segmento (varejo, atacado ou eventos)?'

        if (reply) {
          await sock.sendMessage(jid, { text: reply })
        }

        history.push({ fromMe: false, text })
        history.push({ fromMe: true, text: reply })
        chatHistory.set(jid, history.slice(-20))
      }
    }
  })

  return sock
}

connect().catch(console.error)
