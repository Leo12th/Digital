import { useTranslation } from 'react-i18next'
import { ServiceCard } from '../components'

export function Servicos() {
  const { t } = useTranslation()

  const services = [
    { icon: 'scan', title: t('services.virtualFitting.title'), desc: t('services.virtualFitting.desc') },
    { icon: 'layers', title: t('services.fitting360.title'), desc: t('services.fitting360.desc') },
    { icon: 'fileSearch', title: t('services.cnpj.title'), desc: t('services.cnpj.desc') },
    { icon: 'globe', title: t('services.platforms.pos'), desc: t('services.platforms.title') },
    { icon: 'cpu', title: t('services.platforms.ecommerce'), desc: t('services.platforms.title') },
    { icon: 'zap', title: t('services.platforms.events'), desc: t('services.platforms.title') },
    { icon: 'target', title: t('services.marketing.title'), desc: t('services.marketing.desc') },
  ]

  return (
    <section className="section section-page-bg">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="container">
        <h1 className="section-title">{t('services.title')}</h1>
        <p className="section-subtitle">{t('services.subtitle')}</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={i} icon={s.icon} title={s.title} description={s.desc} />
          ))}
        </div>
      </div>
    </section>
  )
}
