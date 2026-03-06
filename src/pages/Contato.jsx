import { useTranslation } from 'react-i18next'
import { MessageCircle, Mail } from 'lucide-react'
import { ContactForm } from '../components'

export function Contato() {
  const { t } = useTranslation()

  return (
    <section className="section section-page-bg section-contact">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="page-hero">
        <div className="page-hero-grid" aria-hidden />
        <div className="container">
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
      </div>
      <div className="container contact-page">
        <div className="contact-grid">
          <div className="contact-info contact-info-glass">
            <div className="contact-info-item">
              <MessageCircle size={20} className="contact-icon" />
              <div>
                <h3>{t('contact.whatsapp')}</h3>
                <a href="https://wa.me/5555984553553" target="_blank" rel="noopener noreferrer">
                  +55 55 98455-3553
                </a>
              </div>
            </div>
            <div className="contact-info-item">
              <Mail size={20} className="contact-icon" />
              <div>
                <h3>{t('contact.email')}</h3>
                <a href="mailto:contato@digitalintegracoes.com.br">
                  contato@digitalintegracoes.com.br
                </a>
              </div>
            </div>
            <a
              href="https://wa.me/5555984553553"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline contact-cta"
            >
              <MessageCircle size={18} />
              {t('contact.ctaWhatsapp')}
            </a>
          </div>
          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
