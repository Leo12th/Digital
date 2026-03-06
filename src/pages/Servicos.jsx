import { useTranslation } from 'react-i18next'
import { ServiceCard } from '../components'

export function Servicos() {
  const { t } = useTranslation()

  const services = [
    { icon: 'shirt', title: t('services.virtualFitting.title'), desc: t('services.virtualFitting.desc') },
    { icon: 'rotate', title: t('services.fitting360.title'), desc: t('services.fitting360.desc') },
    { icon: 'fileSearch', title: t('services.cnpj.title'), desc: t('services.cnpj.desc') },
    { icon: 'store', title: t('services.platforms.pos'), desc: t('services.platforms.title') },
    { icon: 'cart', title: t('services.platforms.ecommerce'), desc: t('services.platforms.title') },
    { icon: 'megaphone', title: t('services.platforms.events'), desc: t('services.platforms.title') },
    { icon: 'chart', title: t('services.marketing.title'), desc: t('services.marketing.desc') },
  ]

  return (
    <section className="section">
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
