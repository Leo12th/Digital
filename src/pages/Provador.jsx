import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, Shirt } from 'lucide-react'
import { Link } from 'react-router-dom'

const CATALOGO = [
  { id: '1', nome: 'Blusa Casual Manga Curta', cor: 'Branco', categoria: 'blusa', image: '/vite.svg' },
  { id: '2', nome: 'Calça Jeans Slim', cor: 'Azul', categoria: 'calca', image: '/vite.svg' },
  { id: '3', nome: 'Vestido Midi Floral', cor: 'Estampado', categoria: 'vestido', image: '/vite.svg' },
  { id: '4', nome: 'Camisa Social', cor: 'Azul Marinho', categoria: 'camisa', image: '/vite.svg' },
  { id: '5', nome: 'Short Sarja', cor: 'Bege', categoria: 'short', image: '/vite.svg' },
]

export function Provador() {
  const { t } = useTranslation()
  const [styleInput, setStyleInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [selected, setSelected] = useState(null)

  async function handleAsk() {
    if (!styleInput.trim()) return
    setLoading(true)
    setSuggestions([])
    try {
      const res = await fetch('/api/provador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: styleInput, style: styleInput }),
      })
      const json = await res.json()
      setSuggestions(json.suggestions || [])
    } catch {
      setSuggestions(CATALOGO.slice(0, 2))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section section-page-bg">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="container">
        <div className="page-hero">
          <div className="page-hero-grid" aria-hidden />
          <h1 className="section-title">{t('provador.title')}</h1>
          <p className="section-subtitle">{t('provador.subtitle')}</p>
        </div>

        <div className="provador-layout">
          <div className="provador-demo">
            <div className="provador-preview">
              <div className="provador-avatar">
                <Shirt size={80} />
                <span className="provador-avatar-label">{t('provador.avatarPlaceholder')}</span>
              </div>
              {selected && (
                <div className="provador-selected">
                  <strong>{selected.nome}</strong>
                  <span>{selected.cor}</span>
                </div>
              )}
            </div>
          </div>

          <div className="provador-actions">
            <div className="provador-ia">
              <h3><Sparkles size={20} /> {t('provador.iaTitle')}</h3>
              <p className="provador-ia-desc">{t('provador.iaDesc')}</p>
              <div className="provador-input-row">
                <input
                  type="text"
                  value={styleInput}
                  onChange={(e) => setStyleInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                  placeholder={t('provador.placeholder')}
                  disabled={loading}
                  className="provador-input"
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAsk}
                  disabled={loading}
                >
                  {loading ? t('provador.searching') : t('provador.ask')}
                </button>
              </div>
            </div>

            <div className="provador-catalog">
              <h3>{t('provador.catalogTitle')}</h3>
              <div className="provador-catalog-grid">
                {(suggestions.length ? suggestions : CATALOGO).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`provador-card ${selected?.id === item.id ? 'selected' : ''}`}
                    onClick={() => setSelected(item)}
                  >
                    <img src={item.image || '/vite.svg'} alt={item.nome} />
                    <span className="provador-card-name">{item.nome}</span>
                    <span className="provador-card-color">{item.cor}</span>
                    {item.reason && (
                      <span className="provador-card-reason">{item.reason}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="provador-back">
          <Link to="/portfolio" className="link">{t('provador.backToPortfolio')}</Link>
        </p>
      </div>
    </section>
  )
}
