import { useTranslation } from 'react-i18next'
import { Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react'

const SHARE_ICONS = {
  Facebook,
  Twitter,
  LinkedIn: Linkedin,
  WhatsApp: MessageCircle,
}

export function SocialShare({ url, title, description = '', compact = false }) {
  const { t } = useTranslation()
  const encodedUrl = encodeURIComponent(url || '')
  const encodedTitle = encodeURIComponent(title || '')

  const shares = [
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: 'WhatsApp', url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
  ]

  return (
    <div className={`social-share ${compact ? 'compact' : ''}`}>
      {!compact && (
        <span className="share-label">
          <Share2 size={16} />
          {t('blog.share')}:
        </span>
      )}
      {shares.map(({ name, url: shareUrl }) => {
        const Icon = SHARE_ICONS[name]
        return (
          <a
            key={name}
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t('blog.share')} ${name}`}
            className="share-btn"
          >
            {Icon ? <Icon size={18} /> : name}
          </a>
        )
      })}
    </div>
  )
}
