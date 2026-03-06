import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SocialShare } from './SocialShare'

export function BlogCard({ slug, title, excerpt, date, author, image }) {
  const { t } = useTranslation()
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : ''

  return (
    <article className="blog-card">
      <Link to={`/blog/${slug}`} className="blog-image">
        <img src={image || '/vite.svg'} alt={title} />
      </Link>
      <div className="blog-content">
        <span className="blog-meta">{date} {author && `• ${t('company.name')}`}</span>
        <h3 className="blog-title">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="blog-excerpt">{excerpt}</p>
        <div className="blog-actions">
          <Link to={`/blog/${slug}`} className="btn btn-primary btn-sm">{t('blog.readMore')}</Link>
          <SocialShare url={url} title={title} compact />
        </div>
      </div>
    </article>
  )
}
