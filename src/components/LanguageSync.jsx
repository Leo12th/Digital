import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/': 'meta.title',
  '/sobre': 'about.title',
  '/servicos': 'services.title',
  '/portfolio': 'portfolio.title',
  '/projetos': 'projects.title',
  '/blog': 'blog.title',
  '/contato': 'contact.title',
}

export function LanguageSync() {
  const { i18n, t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const lang = i18n.language?.slice(0, 2) || 'pt'
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en'
  }, [i18n.language])

  useEffect(() => {
    const path = location.pathname
    const titleKey = PAGE_TITLES[path] || (path.startsWith('/blog/') ? 'blog.title' : 'meta.title')
    document.title = `${t(titleKey)} | ${t('company.name')}`
  }, [location.pathname, i18n.language])

  return null
}
