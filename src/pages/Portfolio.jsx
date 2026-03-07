import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectCard, Pagination } from '../components'
import { projects, categories } from '../data/projects'

const ITEMS_PER_PAGE = 6

export function Portfolio() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter(p => p.category === filter)
  }, [filter])

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filtered.slice(start, start + ITEMS_PER_PAGE)
  }, [filtered, page])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  return (
    <section className="section section-page-bg">
      <div className="section-page-bg-grid" aria-hidden />
      <div className="container">
        <h1 className="section-title">{t('portfolio.title')}</h1>
        <p className="section-subtitle">{t('portfolio.subtitle')}</p>

        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => { setFilter(cat.id); setPage(1) }}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {paginated.map(proj => (
            <ProjectCard
              key={proj.id}
              project={proj}
              t={t}
              variant="portfolio"
            />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  )
}
