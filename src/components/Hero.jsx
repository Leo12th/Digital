import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRef, useEffect, useState } from 'react'

const HERO_IMG = { w: 1922, h: 1340 }
const WOMEN_CROP = { w: 1051, h: 988, x: 0, y: 0 }
const WOMEN_OFFSET_X = 405
const WOMEN_OFFSET_Y = 33

export function Hero() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const [style, setStyle] = useState({})
  const [tilt, setTilt] = useState(0)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const update = () => {
      const { clientWidth: W, clientHeight: H } = el
      const scale = Math.max(W / HERO_IMG.w, H / HERO_IMG.h)
      const heroLeft = W / 2 - 961 * scale
      const heroTop = H / 2 - 375 * scale
      const cropLeft = heroLeft + WOMEN_CROP.x * scale + WOMEN_OFFSET_X * scale
      const cropTop = heroTop + WOMEN_CROP.y * scale + WOMEN_OFFSET_Y
      const cropW = WOMEN_CROP.w * scale
      const cropH = WOMEN_CROP.h * scale
      setStyle({
        left: cropLeft,
        top: cropTop,
        width: cropW,
        height: cropH,
      })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const tiltDeg = Math.min(scrollY * 0.008, 1.2)
      setTilt(-tiltDeg)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <section className="hero" ref={heroRef}>
        <img
          src="/hero.png"
          srcSet="/hero.png 1x, /hero-2x.png 2x"
          alt=""
          className="hero-image"
          aria-hidden
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="hero-women-overlay"
          style={{
            ...style,
            transform: `perspective(1200px) rotateX(${tilt}deg)`,
          }}
          aria-hidden
        >
          <img src="/women.png" alt="" className="hero-women-img" />
        </div>
        <div className="hero-neon-divider" aria-hidden>
          <div className="hero-neon-divider-line" />
        </div>
      </section>
      <section className="hero-content-section">
        <div className="hero-tech-frame">
          <div className="hero-tech-grid" aria-hidden />
          <div className="hero-tech-glow" aria-hidden />
          <div className="container hero-inner">
            <div className="hero-content">
              <h1 className="hero-title hero-title-3d hero-title-uppercase">
                <span className="hero-line">{t('home.heroTitle')}</span>
                <span className="hero-highlight hero-highlight-3d">{t('home.heroHighlight')}</span>
                <span className="hero-line">{t('home.heroSubtitle')}</span>
                <span className="hero-line">{t('home.heroSubtitle2')}</span>
              </h1>
              <p className="hero-description">{t('home.heroDescription')}</p>
              <div className="hero-actions">
                <Link to="/contato" className="btn btn-primary">{t('home.cta')}</Link>
                <Link to="/servicos" className="btn btn-outline">{t('home.seeServices')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
