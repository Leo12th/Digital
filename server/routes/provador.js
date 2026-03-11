import { Router } from 'express'
import { GoogleGenAI } from '@google/genai'

export const provadorRouter = Router()

const GEMINI_MODEL = 'gemini-2.0-flash'
const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null

const CATALOGO = [
  { id: '1', nome: 'Blusa Casual Manga Curta', cor: 'Branco', categoria: 'blusa' },
  { id: '2', nome: 'Calça Jeans Slim', cor: 'Azul', categoria: 'calca' },
  { id: '3', nome: 'Vestido Midi Floral', cor: 'Estampado', categoria: 'vestido' },
  { id: '4', nome: 'Camisa Social', cor: 'Azul Marinho', categoria: 'camisa' },
  { id: '5', nome: 'Short Sarja', cor: 'Bege', categoria: 'short' },
]

provadorRouter.post('/', async (req, res) => {
  const { question, style } = req.body
  const input = question || style
  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Envie "question" ou "style" com sua preferência' })
  }

  if (!gemini) {
    return res.status(503).json({
      error: 'Serviço de recomendações indisponível. Configure GEMINI_API_KEY.',
      suggestions: CATALOGO.slice(0, 3),
    })
  }

  const catalogStr = CATALOGO.map((p) => `- ${p.nome} (${p.cor})`).join('\n')

  try {
    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: input,
      config: {
        systemInstruction: `Você é um consultor de moda. O catálogo disponível é:
${catalogStr}

Responda APENAS com um JSON válido no formato: { "suggestions": [ { "id": "1", "reason": "motivo" }, ... ] }
Sugira de 1 a 3 peças do catálogo que combinem com o pedido. Use apenas IDs existentes (1 a 5).`,
      },
    })

    let text = response.text || '{}'
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) text = jsonMatch[0]
    const parsed = JSON.parse(text)
    const suggestions = (parsed.suggestions || []).map((s) => {
      const item = CATALOGO.find((p) => p.id === String(s.id))
      return item ? { ...item, reason: s.reason } : null
    }).filter(Boolean)

    res.json({ suggestions: suggestions.length ? suggestions : CATALOGO.slice(0, 2) })
  } catch (err) {
    console.error('Provador API error:', err.message)
    res.status(500).json({
      error: 'Erro ao gerar recomendações.',
      suggestions: CATALOGO.slice(0, 2),
    })
  }
})
