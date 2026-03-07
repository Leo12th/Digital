import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Hero, MissionCard, ServiceCard, ProjectCard, BlogCard } from '../components'
import { projects } from '../data/projects'
import { posts, POST_SLUG_TO_I18N } from '../data/posts'

const PREVIEW_COUNT = 3

export function Home() {
  const { t } = useTranslation()

  const featuredServices = [
    { icon: 'palette', title: t('services.logoIdentity.title'), desc: t('services.logoIdentity.desc') },
    { icon: 'rocket', title: t('services.trafficManagement.title'), desc: t('services.trafficManagement.desc') },
    { icon: 'bot', title: t('services.whatsappChatbot.title'), desc: t('services.whatsappChatbot.desc') },
  ]

  const portfolioPreview = projects.slice(0, PREVIEW_COUNT)
  const projetosPreview = projects.slice(PREVIEW_COUNT, PREVIEW_COUNT * 2)
  const blogPreview = posts.slice(0, PREVIEW_COUNT)

  return (
    <>
      <Hero />
      <MissionCard />
      <section className="section section-compact section-hero-bg">
        <div className="section-hero-bg-grid" aria-hidden />
        <div className="container container-services">
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('home.seeServices')}</p>
          <div className="services-grid">
            {featuredServices.map((s, i) => (
              <ServiceCard key={i} icon={s.icon} title={s.title} description={s.desc} />
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
            <Link to="/servicos" className="btn btn-primary">{t('home.seeServices')}</Link>
          </div>
        </div>
      </section>

      <section className="section section-compact section-page-bg">
        <div className="section-page-bg-grid" aria-hidden />
        <div className="container container-services">
          <h2 className="section-title">{t('portfolio.title')}</h2>
          <p className="section-subtitle">{t('portfolio.subtitle')}</p>
          <div className="projects-grid">
            {portfolioPreview.map(proj => (
              <ProjectCard key={proj.id} project={proj} t={t} variant="portfolio" />
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
            <Link to="/portfolio" className="btn btn-primary">{t('home.seePortfolio')}</Link>
          </div>
        </div>
      </section>

      <section className="section section-compact section-page-bg">
        <div className="section-page-bg-grid" aria-hidden />
        <div className="container container-services">
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
          <div className="projects-grid">
            {projetosPreview.map(proj => (
              <ProjectCard key={proj.id} project={proj} t={t} variant="projects" />
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
            <Link to="/projetos" className="btn btn-primary">{t('home.seeProjects')}</Link>
          </div>
        </div>
      </section>

      <section className="section section-compact section-page-bg">
        <div className="section-page-bg-grid" aria-hidden />
        <div className="container container-services">
          <h2 className="section-title">{t('blog.title')}</h2>
          <p className="section-subtitle">{t('blog.subtitle')}</p>
          <div className="blog-grid">
            {blogPreview.map(post => {
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
          <div style={{ textAlign: 'right', marginTop: '1.25rem' }}>
            <Link to="/blog" className="btn btn-primary">{t('home.seeBlog')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
