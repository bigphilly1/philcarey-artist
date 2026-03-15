import Head from 'next/head'
import Link from 'next/link'
import PaintingCard from '../components/PaintingCard'
import paintings from '../data/paintings.json'

export default function Home() {
  const hero = paintings.find(p => p.hero)
  const gallery = paintings.filter(p => !p.hero)

  return (
    <>
      <Head>
        <title>Phil Carey, Artist, Sydney</title>
        <meta name="description" content="Original paintings and prints by Sydney artist Phil Carey. Observational work rooted in Australian landscapes and harbours." />
        <meta property="og:title" content="Phil Carey, Artist" />
        <meta property="og:description" content="Original paintings and prints. Sydney, Australia." />
      </Head>

      {/* Hero */}
      <section style={{
        position: 'relative',
        height: '92vh',
        minHeight: '560px',
        marginTop: 'calc(-1 * var(--nav-height))',
        overflow: 'hidden',
        background: 'var(--bg-card)',
      }}>
        {hero && (
          <img
            src={hero.image}
            alt={hero.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(44,41,38,0.1) 0%, rgba(44,41,38,0.4) 100%)',
        }} />

        {/* Hero text */}
        <div style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: 0,
          right: 0,
          padding: '0 2rem',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
        }}>
          <div className="container" style={{ padding: 0 }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(247,244,240,0.8)',
              marginBottom: '0.75rem',
            }}>
              Original paintings and prints
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 300,
              color: '#F7F4F0',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
              maxWidth: '600px',
            }}>
              Phil Carey
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(247,244,240,0.85)',
              marginTop: '0.5rem',
            }}>
              Sydney, Australia
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(247,244,240,0.6)' }}>
            Scroll
          </span>
        </div>
      </section>

      {/* Intro strip */}
      <section style={{ padding: '4rem 0 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '0 auto',
            gap: '1.25rem',
          }}>
            <p style={{
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
            }}>
              The Works
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
              fontWeight: 300,
              lineHeight: 1.5,
              color: 'var(--text)',
            }}>
              Every painting is available as an original or a quality print. If something catches your eye, it is meant to.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: '3rem 0 5rem' }}>
        <div className="container">
          
          {/* Hero painting as featured */}
          {hero && (
            <div style={{ marginBottom: '2rem' }}>
              <Link href={`/paintings/${hero.slug}`} style={{ display: 'block' }}>
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--bg-card)',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.02)'
                    e.currentTarget.querySelector('.featured-label').style.color = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                    e.currentTarget.querySelector('.featured-label').style.color = 'var(--text-light)'
                  }}
                >
                  <img
                    src={hero.image}
                    alt={hero.title}
                    style={{
                      width: '100%',
                      height: 'clamp(300px, 50vw, 560px)',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                    onError={(e) => {
                      e.target.style.height = '300px'
                      e.target.style.background = 'var(--bg-card)'
                      e.target.style.display = 'none'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    padding: '1.25rem 0 0',
                  }}>
                    <div>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.35rem' }}>
                        Featured Work
                      </p>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400 }}>
                        {hero.title}
                      </h2>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                        {hero.medium}
                      </p>
                    </div>
                    <span
                      className="featured-label"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', transition: 'color 0.2s ease', paddingBottom: '0.25rem' }}
                    >
                      View work
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {gallery.map(painting => (
              <PaintingCard key={painting.slug} painting={painting} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
