import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About, Phil Carey Artist</title>
        <meta name="description" content="About Phil Carey. Sydney artist working in acrylic. Observational work rooted in Australian landscapes and harbours." />
      </Head>

      <div style={{ padding: '5rem 0 4rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
            maxWidth: '960px',
            margin: '0 auto',
          }}
            className="about-grid"
          >

            {/* Image column */}
            <div>
              <div style={{
                background: 'var(--bg-card)',
                aspectRatio: '4/5',
                overflow: 'hidden',
              }}>
                <img
                  src="/images/sydney-harbour-bridge.jpg"
                  alt="Sydney Harbour Bridge by Phil Carey"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
              <p style={{
                fontSize: '0.7rem',
                color: 'var(--text-light)',
                letterSpacing: '0.06em',
                marginTop: '0.75rem',
              }}>
                Sydney Harbour Bridge, Acrylic on canvas
              </p>
            </div>

            {/* Text column */}
            <div style={{ paddingTop: '1rem' }}>
              <p style={{
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '1.25rem',
              }}>
                About
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: '2rem',
              }}>
                Phil Carey
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.7, fontStyle: 'italic', color: 'var(--text)' }}>
                  I paint because I find it genuinely satisfying, which is probably the most honest thing I can tell you.
                </p>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-light)', fontWeight: 300 }}>
                  The work tends to be observational, rooted in places and light I find interesting, but what I am always chasing is something peaceful. Something you could live with. My style has been getting more complex as I keep learning, but the instinct underneath has not changed: I want to make something worth looking at.
                </p>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-light)', fontWeight: 300 }}>
                  Every painting here is available as an original or a quality print. If something catches your eye, it is meant to.
                </p>
              </div>

              <div style={{
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--text-light)' }}>
                  Based in Sydney, Australia
                </p>
                <a
                  href="mailto:phil@cornerstonemedia.com.au"
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.04em',
                  }}
                >
                  phil@cornerstonemedia.com.au
                </a>
                <Link
                  href="/"
                  style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    borderBottom: '1px solid var(--text)',
                    paddingBottom: '2px',
                  }}
                >
                  View all works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </>
  )
}
