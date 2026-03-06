import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectCard, Pagination } from '../components'
import { projects } from '../data/projects'

const ITEMS_PER_PAGE = 6

export function Projetos() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return projects.slice(start, start + ITEMS_PER_PAGE)
  }, [page])

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t('projects.title')}</h1>
        <p className="section-subtitle">{t('projects.subtitle')}</p>

        <div className="projects-grid">
          {paginated.map(proj => (
            <ProjectCard key={proj.id} project={proj} t={t} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </section>
  )
}
