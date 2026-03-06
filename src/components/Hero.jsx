import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('home.heroTitle')}{' '}
            <span className="hero-highlight">{t('home.heroHighlight')}</span>{' '}
            {t('home.heroSubtitle')}
          </h1>
          <p className="hero-description">{t('home.heroDescription')}</p>
          <div className="hero-actions">
            <Link to="/contato" className="btn btn-primary">{t('home.cta')}</Link>
            <Link to="/servicos" className="btn btn-outline">{t('home.seeServices')}</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-placeholder" />
        </div>
      </div>
    </section>
  )
}
