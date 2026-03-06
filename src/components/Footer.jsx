import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SocialShare } from './SocialShare'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="DIGITAL" className="logo-img" onError={(e) => { e.target.style.display='none'; e.target.nextSibling?.classList.add('show') }} />
              <span className="logo-text">DIGITAL</span>
            </Link>
            <p className="tagline">{t('footer.tagline')}</p>
          </div>
          <div className="footer-links">
            <Link to="/sobre">{t('nav.about')}</Link>
            <Link to="/servicos">{t('nav.services')}</Link>
            <Link to="/portfolio">{t('nav.portfolio')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
            <Link to="/contato">{t('nav.contact')}</Link>
          </div>
          <div className="footer-contact">
            <a href="https://wa.me/5562992969882" target="_blank" rel="noopener noreferrer">
              {t('contact.whatsapp')}: (62) 9 9296-9882
            </a>
            <a href="mailto:contato@digitalintegracoes.com.br">
              contato@digitalintegracoes.com.br
            </a>
          </div>
          <div className="footer-share">
            <SocialShare url={typeof window !== 'undefined' ? window.location.href : ''} title={t('footer.shareTitle')} />
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {t('company.name')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
