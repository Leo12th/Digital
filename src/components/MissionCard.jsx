import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './MissionCard.css'

export function MissionCard() {
  const { t } = useTranslation()

  return (
    <section className="mission-card-section">
      <div className="mission-card-section-grid" aria-hidden />
      <div className="mission-card-frame">
        <div className="mission-card-grid" aria-hidden />
        <div className="mission-card-glow" aria-hidden />
        <div className="container container-services mission-card-inner">
          <div className="mission-card-content">
            <h2 className="mission-card-title">
              <span className="mission-card-line">{t('home.heroTitle')}</span>
              <span className="mission-card-highlight">{t('home.heroHighlight')}</span>
              <span className="mission-card-line">{t('home.heroSubtitle')} {t('home.heroSubtitle2')}</span>
            </h2>
            <p className="mission-card-description">{t('home.heroDescription')}</p>
            <div className="mission-card-actions">
              <Link to="/contato" className="btn btn-outline">{t('home.cta')}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
