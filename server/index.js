import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { cnpjRouter } from './routes/cnpj.js'
import { provadorRouter } from './routes/provador.js'
import { contactRouter } from './routes/contact.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// API routes
app.use('/api/cnpj', cnpjRouter)
app.use('/api/provador', provadorRouter)
app.use('/api/contact', contactRouter)

// Static files (React build)
const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))

// SPA fallback - all other routes serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
