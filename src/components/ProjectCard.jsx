import { MessageCircle } from 'lucide-react'
import { PROJECT_SLUG_TO_I18N } from '../data/projects'

const WHATSAPP_PHONE = '5555984553553'

export function ProjectCard({ project, t, title, description, image, tags = [], slug, url, variant = 'portfolio' }) {
  const i18nKey = project ? PROJECT_SLUG_TO_I18N[project.slug] : null
  const displayTitle = project && t ? t(`projects.${i18nKey}.title`) : title
  const displayDesc = project && t ? t(`projects.${i18nKey}.description`) : description
  const displayTags = project && t ? t(`projects.${i18nKey}.tags`, { returnObjects: true }) : tags
  const displayImage = project?.image || image
  const consultMessage = t ? t('projects.consultMessage', { project: displayTitle }) : `Olá! Gostaria de consultar orçamento para o projeto: ${displayTitle}`
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(consultMessage)}`

  return (
    <article className="project-card">
      <div className="project-image">
        <img src={displayImage || '/vite.svg'} alt={displayTitle} />
      </div>
      <div className="project-content">
        <div className="project-tags">
          {(Array.isArray(displayTags) ? displayTags : []).map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <h3 className="project-title">{displayTitle}</h3>
        <p className="project-desc">{displayDesc}</p>
        {variant === 'projects' && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-consult-btn project-consult-btn--accent"
          >
            <MessageCircle size={18} />
            {t ? t('projects.consult') : 'Consultar'}
          </a>
        )}
      </div>
    </article>
  )
}
