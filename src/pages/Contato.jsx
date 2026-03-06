import { useTranslation } from 'react-i18next'
import { ContactForm } from '../components'

export function Contato() {
  const { t } = useTranslation()

  return (
    <section className="section">
      <div className="container contact-page">
        <div className="contact-header">
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>{t('contact.whatsapp')}</h3>
            <a href="https://wa.me/5562992969882" target="_blank" rel="noopener noreferrer">
              (62) 9 9296-9882
            </a>
            <h3>{t('contact.email')}</h3>
            <a href="mailto:contato@digitalintegracoes.com.br">
              contato@digitalintegracoes.com.br
            </a>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
