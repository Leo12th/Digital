import { useTranslation } from 'react-i18next'

export function Sobre() {
  const { t } = useTranslation()

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t('about.title')}</h1>
        <div className="about-content">
          <p className="about-mission">{t('about.mission')}</p>
          <p className="about-desc">{t('about.description')}</p>
          <div className="about-block">
            <h2>{t('about.virtualFitting')}</h2>
            <p>{t('about.virtualFittingDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
