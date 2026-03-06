import { SocialShare } from './SocialShare'
import { PROJECT_SLUG_TO_I18N } from '../data/projects'

export function ProjectCard({ project, t, title, description, image, tags = [], slug, url }) {
  const i18nKey = project ? PROJECT_SLUG_TO_I18N[project.slug] : null
  const displayTitle = project && t ? t(`projects.${i18nKey}.title`) : title
  const displayDesc = project && t ? t(`projects.${i18nKey}.description`) : description
  const displayTags = project && t ? t(`projects.${i18nKey}.tags`, { returnObjects: true }) : tags
  const displayImage = project?.image || image
  const displaySlug = project?.slug || slug
  const shareUrl = url || (typeof window !== 'undefined' ? `${window.location.origin}/projetos/${displaySlug}` : '')

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
        <SocialShare url={shareUrl} title={displayTitle} compact />
      </div>
    </article>
  )
}
