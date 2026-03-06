import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useTranslation()
  if (totalPages <= 1) return null

  const pages = []
  const showPrev = currentPage > 1
  const showNext = currentPage < totalPages

  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <nav className="pagination" aria-label={t('common.pagination')}>
      {showPrev && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          aria-label={t('common.prevPage')}
        >
          <ChevronLeft size={20} />
        </button>
      )}
      <div className="pagination-pages">
        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {showNext && (
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label={t('common.nextPage')}
        >
          <ChevronRight size={20} />
        </button>
      )}
    </nav>
  )
}
