import { useTranslation } from 'react-i18next'
import { Cpu, Megaphone } from 'lucide-react'
import './AboutTeams.css'

export function AboutTeams() {
  const { t } = useTranslation()

  const teamAiParagraphs = t('about.teamAi.paragraphs', { returnObjects: true })
  const teamMarketingParagraphs = t('about.teamMarketing.paragraphs', { returnObjects: true })

  return (
    <div className="about-teams">
      <div className="about-teams-grid" aria-hidden />
      <div className="about-teams-inner">
        <article className="about-team-card about-team-card-ai">
          <div className="about-team-card-glow" aria-hidden />
          <div className="about-team-icon">
            <Cpu className="icon-svg" aria-hidden />
          </div>
          <h2 className="about-team-title">{t('about.teamAi.title')}</h2>
          <div className="about-team-body">
            {Array.isArray(teamAiParagraphs)
              ? teamAiParagraphs.map((p, i) => (
                  <p key={i} className="about-team-paragraph">
                    {p}
                  </p>
                ))
              : (
                  <p className="about-team-paragraph">{teamAiParagraphs}</p>
                )}
          </div>
          <div className="about-team-badges">
            {t('about.teamAi.badges', { returnObjects: true }).map((badge, i) => (
              <span key={i} className="about-team-badge">
                {badge}
              </span>
            ))}
          </div>
        </article>
        <article className="about-team-card about-team-card-marketing">
          <div className="about-team-card-glow" aria-hidden />
          <div className="about-team-icon">
            <Megaphone className="icon-svg" aria-hidden />
          </div>
          <h2 className="about-team-title">{t('about.teamMarketing.title')}</h2>
          <div className="about-team-body">
            {Array.isArray(teamMarketingParagraphs)
              ? teamMarketingParagraphs.map((p, i) => (
                  <p key={i} className="about-team-paragraph">
                    {p}
                  </p>
                ))
              : (
                  <p className="about-team-paragraph">{teamMarketingParagraphs}</p>
                )}
          </div>
          <div className="about-team-badges">
            {t('about.teamMarketing.badges', { returnObjects: true }).map((badge, i) => (
              <span key={i} className="about-team-badge">
                {badge}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
