import { Router } from 'express'

export const cnpjRouter = Router()

function normalizeCnpj(cnpj) {
  return String(cnpj).replace(/\D/g, '').slice(0, 14)
}

function isValidCnpjLength(cnpj) {
  return cnpj.length === 14
}

cnpjRouter.get('/', async (req, res) => {
  const raw = req.query.cnpj
  if (!raw) {
    return res.status(400).json({ error: 'CNPJ é obrigatório' })
  }

  const cnpj = normalizeCnpj(raw)
  if (!isValidCnpjLength(cnpj)) {
    return res.status(400).json({ error: 'CNPJ deve ter 14 dígitos' })
  }

  try {
    const response = await fetch(`https://open.cnpja.com/office/${cnpj}`)
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'CNPJ não encontrado' })
      }
      const text = await response.text()
      throw new Error(text || `API retornou ${response.status}`)
    }
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('CNPJ API error:', err.message)
    res.status(500).json({ error: 'Erro ao consultar CNPJ. Tente novamente.' })
  }
})
