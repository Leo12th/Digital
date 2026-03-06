import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BlogCard, Pagination } from '../components'
import { posts, POST_SLUG_TO_I18N } from '../data/posts'

const ITEMS_PER_PAGE = 6

export function Blog() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return posts.slice(start, start + ITEMS_PER_PAGE)
  }, [page])

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t('blog.title')}</h1>
        <p className="section-subtitle">{t('blog.subtitle')}</p>

        <div className="blog-grid">
          {paginated.map(post => {
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

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  )
}
