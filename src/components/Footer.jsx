import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, MessageCircle, Mail } from 'lucide-react'
import { SocialShare } from './SocialShare'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-neon-line" aria-hidden>
        <div className="footer-neon-line-inner" />
      </div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="/Logo2.png" alt="DIGITAL" className="logo-img" onError={(e) => { e.target.style.display='none'; e.target.nextSibling?.classList.add('show') }} />
              <span className="logo-text">DIGITAL</span>
            </Link>
          </div>
          <div className="footer-links">
            <Link to="/sobre"><ChevronRight size={14} className="link-icon" />{t('nav.about')}</Link>
            <Link to="/servicos"><ChevronRight size={14} className="link-icon" />{t('nav.services')}</Link>
            <Link to="/portfolio"><ChevronRight size={14} className="link-icon" />{t('nav.portfolio')}</Link>
            <Link to="/blog"><ChevronRight size={14} className="link-icon" />{t('nav.blog')}</Link>
            <Link to="/contato"><ChevronRight size={14} className="link-icon" />{t('nav.contact')}</Link>
          </div>
          <div className="footer-contact">
            <a href="https://wa.me/5555984553553" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} className="contact-icon" />
              {t('contact.whatsapp')}: +55 55 98455-3553
            </a>
            <a href="mailto:contato@digitalintegracoes.com.br">
              <Mail size={18} className="contact-icon" />
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
