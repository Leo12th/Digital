import { Link } from 'react-router-dom'
import { ServiceIcons } from './Icons'

const ICON_KEYS = ['shirt', 'rotate', 'fileSearch', 'store', 'cart', 'megaphone', 'chart']

export function ServiceCard({ icon, title, description, href }) {
  const Icon = ServiceIcons[icon] || ServiceIcons.scan

  const content = (
    <>
      <div className="service-icon">
        <Icon className="icon-svg" size={32} strokeWidth={1.5} />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
    </>
  )

  if (href) {
    return (
      <Link to={href} className="service-card-link">
        <article className="service-card">{content}</article>
      </Link>
    )
  }

  return <article className="service-card">{content}</article>
}
