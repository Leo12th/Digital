import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Hero, ServiceCard } from '../components'

export function Home() {
  const { t } = useTranslation()

  const featuredServices = [
    { icon: 'shirt', title: t('services.virtualFitting.title'), desc: t('services.virtualFitting.desc') },
    { icon: 'cart', title: t('services.platforms.title'), desc: t('services.platforms.ecommerce') },
    { icon: 'chart', title: t('services.marketing.title'), desc: t('services.marketing.desc') },
  ]

  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('home.seeServices')}</p>
          <div className="services-grid">
            {featuredServices.map((s, i) => (
              <ServiceCard key={i} icon={s.icon} title={s.title} description={s.desc} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/servicos" className="btn btn-primary">{t('home.seeServices')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
