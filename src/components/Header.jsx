import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'
import { changeLanguage } from '../i18n'
import { Sun, Moon, Menu, Languages } from 'lucide-react'

export function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/sobre', label: t('nav.about') },
    { to: '/servicos', label: t('nav.services') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/projetos', label: t('nav.projects') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/contato', label: t('nav.contact') },
  ]

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="DIGITAL" className="logo-img" onError={(e) => { e.target.style.display='none'; e.target.nextSibling?.classList.add('show') }} />
          <span className="logo-text">DIGITAL</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-selector">
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)} aria-label={t('common.language')}>
              <Languages size={18} />
              <span>{i18n.language?.toUpperCase().slice(0, 2) || 'PT'}</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                <button onClick={() => { changeLanguage('pt'); setLangOpen(false) }}>PT</button>
                <button onClick={() => { changeLanguage('en'); setLangOpen(false) }}>EN</button>
                <button onClick={() => { changeLanguage('es'); setLangOpen(false) }}>ES</button>
              </div>
            )}
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={t('common.toggleTheme')}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('common.menu')}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
