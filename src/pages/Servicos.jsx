import { useTranslation } from 'react-i18next'
import { ServiceCard } from '../components'

export function Servicos() {
  const { t } = useTranslation()

  const services = [
    { icon: 'palette', title: t('services.logoIdentity.title'), desc: t('services.logoIdentity.desc') },
    { icon: 'rocket', title: t('services.trafficManagement.title'), desc: t('services.trafficManagement.desc') },
    { icon: 'bot', title: t('services.whatsappChatbot.title'), desc: t('services.whatsappChatbot.desc') },
    { icon: 'handshake', title: t('services.leadsClients.title'), desc: t('services.leadsClients.desc') },
    { icon: 'globe', title: t('services.highConversionSites.title'), desc: t('services.highConversionSites.desc') },
    { icon: 'settings', title: t('services.onDemandPrograms.title'), desc: t('services.onDemandPrograms.desc') },
    { icon: 'chart', title: t('services.businessStrategy.title'), desc: t('services.businessStrategy.desc') },
    { icon: 'megaphone', title: t('services.adsPerformance.title'), desc: t('services.adsPerformance.desc') },
    { icon: 'film', title: t('services.mediaOnOff.title'), desc: t('services.mediaOnOff.desc') },
    { icon: 'zap', title: t('services.automationSystems.title'), desc: t('services.automationSystems.desc') },
    { icon: 'cpu', title: t('services.systemsWithAi.title'), desc: t('services.systemsWithAi.desc') },
    { icon: 'scan', title: t('services.virtualFitting.title'), desc: t('services.virtualFitting.desc'), href: '/provador' },
    { icon: 'fileSearch', title: t('services.cnpj.title'), desc: t('services.cnpj.desc'), href: '/projetos/consulta-cnpj' },
  ]

  return (
    <section className="section section-page-bg">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="container">
        <h1 className="section-title">{t('services.title')}</h1>
        <p className="section-subtitle">{t('services.subtitle')}</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={i} icon={s.icon} title={s.title} description={s.desc} href={s.href} />
          ))}
        </div>
      </div>
    </section>
  )
}
