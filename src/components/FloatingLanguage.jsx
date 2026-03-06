import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import { changeLanguage } from '../i18n'

export function FloatingLanguage() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const lang = i18n.language?.toUpperCase().slice(0, 2) || 'PT'

  const languages = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ]

  return (
    <div className="floating-language">
      <button
        className="floating-language-btn"
        onClick={() => setOpen(!open)}
        aria-label={t('common.language')}
        aria-expanded={open}
      >
        <Languages size={20} strokeWidth={2} />
        <span>{lang}</span>
      </button>
      {open && (
        <>
          <div className="floating-language-backdrop" onClick={() => setOpen(false)} aria-hidden />
          <div className="floating-language-dropdown">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { changeLanguage(code); setOpen(false) }}
                className={lang === label ? 'active' : ''}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
