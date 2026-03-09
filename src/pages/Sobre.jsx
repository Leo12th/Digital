import { useTranslation } from 'react-i18next'
import { AboutTeams } from '../components/AboutTeams'

export function Sobre() {
  const { t } = useTranslation()

  return (
    <section className="section section-page-bg">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="page-hero">
        <div className="page-hero-grid" aria-hidden />
        <div className="container">
          <h1 className="section-title">{t('about.title')}</h1>
        </div>
      </div>
      <div className="container">
        <div className="about-content">
          <p className="about-mission">{t('about.mission')}</p>
          <p className="about-desc">{t('about.description')}</p>
          <AboutTeams />
        </div>
      </div>
    </section>
  )
}
