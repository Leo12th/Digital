import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'

export function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

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
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="DIGITAL" className="logo-img" onError={(e) => { e.target.style.display='none'; e.target.nextSibling?.classList.add('show') }} />
          <span className="logo-text">DIGITAL</span>
        </Link>

        <div className="header-nav-fixed">
          <div className="header-nav-inner">
          <nav className={`nav nav-pill ${menuOpen ? 'open' : ''}`}>
            {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => {
                setMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              {label}
            </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={t('common.menu')}>
              <Menu size={24} />
            </button>
          </div>
          </div>
        </div>
      </div>
    </header>
  )
}
