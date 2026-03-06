import { ServiceIcons } from './Icons'

const ICON_KEYS = ['shirt', 'rotate', 'fileSearch', 'store', 'cart', 'megaphone', 'chart']

export function ServiceCard({ icon, title, description }) {
  const Icon = ServiceIcons[icon] || ServiceIcons.shirt

  return (
    <article className="service-card">
      <div className="service-icon">
        <Icon className="icon-svg" size={32} strokeWidth={1.5} />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
    </article>
  )
}
