import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SocialShare } from '../components'
import { posts, POST_SLUG_TO_I18N } from '../data/posts'

export function BlogPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const post = posts.find(p => p.slug === slug)
  const i18nKey = post ? POST_SLUG_TO_I18N[post.slug] : null

  if (!post || !i18nKey) {
    return (
      <section className="section">
        <div className="container">
          <p>{t('common.postNotFound')}</p>
          <Link to="/blog">{t('blog.backToBlog')}</Link>
        </div>
      </section>
    )
  }

  const title = t(`blog.posts.${i18nKey}.title`)
  const excerpt = t(`blog.posts.${i18nKey}.excerpt`)
  const content = t(`blog.posts.${i18nKey}.content`)
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <article className="section blog-post">
      <div className="container">
        <Link to="/blog" className="back-link">← {t('blog.backToBlog')}</Link>
        <header className="post-header">
          <span className="post-meta">{post.date} • {t('company.name')}</span>
          <h1 className="post-title">{title}</h1>
        </header>
        <div className="post-image">
          <img src={post.image || '/vite.svg'} alt={title} />
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="post-share">
          <SocialShare url={url} title={title} description={excerpt} />
        </div>
      </div>
    </article>
  )
}
