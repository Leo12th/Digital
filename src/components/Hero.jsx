export function Hero() {
  return (
    <>
      <section className="hero">
        <img
          src={`${import.meta.env.BASE_URL}hero.png`}
          srcSet={`${import.meta.env.BASE_URL}hero.png 1x, ${import.meta.env.BASE_URL}hero-2x.png 2x`}
          alt=""
          className="hero-image"
          aria-hidden
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-neon-divider" aria-hidden>
          <div className="hero-neon-divider-line" />
        </div>
      </section>
    </>
  )
}
