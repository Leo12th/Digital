import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BlogCard } from '../components'
import { posts, POST_SLUG_TO_I18N } from '../data/posts'

export function Blog() {
  const { t } = useTranslation()

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => (b.date > a.date ? 1 : -1))
  }, [])

  return (
    <section className="section section-page-bg">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="container">
        <h1 className="section-title">{t('blog.title')}</h1>
        <p className="section-subtitle">{t('blog.subtitle')}</p>

        <div className="blog-grid">
          {sortedPosts.map(post => {
            const i18nKey = POST_SLUG_TO_I18N[post.slug]
            return (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={i18nKey ? t(`blog.posts.${i18nKey}.title`) : post.slug}
                excerpt={i18nKey ? t(`blog.posts.${i18nKey}.excerpt`) : ''}
                date={post.date}
                author={post.author}
                image={post.image}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
