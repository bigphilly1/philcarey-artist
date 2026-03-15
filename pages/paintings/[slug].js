import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import paintings from '../../data/paintings.json'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function PaintingPage({ painting, relatedWorks }) {
  const [selectedType, setSelectedType] = useState('original')
  const [loading, setLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const price = selectedType === 'original' ? painting.price : painting.printPrice

  const handlePurchase = async () => {
    if (selectedType === 'print') {
      // Prints: send enquiry until print supplier is activated
      window.location.href = `mailto:phil@cornerstonemedia.com.au?subject=Print enquiry: ${painting.title}&body=Hi Phil, I am interested in a print of ${painting.title}. Please let me know the details.`
      return
    }

    // Originals: Stripe checkout
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paintingSlug: painting.slug,
          type: selectedType,
        }),
      })
      const { sessionId, error } = await response.json()
      if (error) throw new Error(error)

      const stripe = await stripePromise
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) throw new Error(stripeError.message)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again or contact phil@cornerstonemedia.com.au')
    } finally {
      setLoading(false)
    }
  }

  const btnLabel = loading
    ? 'Loading...'
    : selectedType === 'print'
    ? 'Enquire about this print'
    : `Purchase original, $${painting.price.toLocaleString()}`

  return (
    <>
      <Head>
        <title>{painting.title}, Phil Carey Artist</title>
        <meta name="description" content={`${painting.title}. ${painting.medium}. ${painting.dimensions}. Original painting and prints available.`} />
      </Head>

      <div style={{ padding: '3rem 0 5rem' }}>
        <div className="container">

          {/* Breadcrumb */}
          <nav style={{ marginBottom: '2rem' }}>
            <Link href="/" style={{ fontSize: '0.75rem', color: 'var(--text-light)', letterSpacing: '0.06em' }}>
              Works
            </Link>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: '0 0.5rem' }}>
              /
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text)', letterSpacing: '0.06em' }}>
              {painting.title}
            </span>
          </nav>

          {/* Main layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '5rem',
            alignItems: 'start',
          }}
            className="painting-layout"
          >

            {/* Image */}
            <div>
              <div style={{
                background: 'var(--bg-card)',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src={painting.image}
                  alt={painting.title}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentNode.style.minHeight = '400px'
                  }}
                  style={{
                    width: '100%',
                    display: 'block',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
              </div>
              {painting.description && (
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-light)',
                  marginTop: '1.25rem',
                  lineHeight: 1.7,
                }}>
                  {painting.description}
                </p>
              )}
            </div>

            {/* Details panel */}
            <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
              <p style={{
                fontSize: '0.65rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-light)',
                marginBottom: '0.75rem',
              }}>
                {painting.category}
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: '0.5rem',
              }}>
                {painting.title}
              </h1>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                marginBottom: '2rem',
              }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{painting.medium}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{painting.dimensions}</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>Unframed</p>
              </div>

              {/* Type toggle */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                border: '1px solid var(--border)',
                marginBottom: '1.5rem',
              }}>
                {['original', 'print'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    style={{
                      padding: '0.75rem 0',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      background: selectedType === type ? 'var(--text)' : 'transparent',
                      color: selectedType === type ? 'var(--bg)' : 'var(--text-light)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    {type === 'original' ? 'Original' : 'Print'}
                  </button>
                ))}
              </div>

              {/* Price */}
              <div style={{ marginBottom: '0.75rem' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 400,
                }}>
                  ${price.toLocaleString()}
                </p>
                {selectedType === 'original' && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                    Plus shipping and GST
                  </p>
                )}
                {selectedType === 'print' && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                    Museum-quality giclée print, archival inks. Enquire for sizing options.
                  </p>
                )}
              </div>

              {/* Purchase button */}
              <button
                onClick={handlePurchase}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: loading ? 'var(--bg-card)' : 'var(--text)',
                  color: loading ? 'var(--text-light)' : 'var(--bg)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  transition: 'all 0.2s ease',
                  cursor: loading ? 'wait' : 'pointer',
                  marginBottom: '1rem',
                  border: 'none',
                }}
                onMouseEnter={e => { if (!loading) e.target.style.background = 'var(--accent)' }}
                onMouseLeave={e => { if (!loading) e.target.style.background = 'var(--text)' }}
              >
                {btnLabel}
              </button>

              {/* Enquiry link */}
              <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', textAlign: 'center' }}>
                Questions?{' '}
                <a
                  href={`mailto:phil@cornerstonemedia.com.au?subject=Enquiry: ${painting.title}`}
                  style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}
                >
                  Get in touch
                </a>
              </p>

              {/* Details list */}
              <div style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}>
                {[
                  ['Shipping', 'Carefully packaged, tracked, insured'],
                  ['Returns', 'Contact us within 14 days of delivery'],
                  ['Certificate', 'Certificate of authenticity with every original'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--text-light)', minWidth: '80px', textTransform: 'uppercase' }}>{label}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.5 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related works */}
          {relatedWorks.length > 0 && (
            <section style={{ marginTop: '6rem', paddingTop: '3rem', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '2rem' }}>
                More works
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}>
                {relatedWorks.map(p => (
                  <Link key={p.slug} href={`/paintings/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ overflow: 'hidden', background: 'var(--bg-card)' }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                        onError={e => e.target.style.display = 'none'}
                      />
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginTop: '0.75rem' }}>{p.title}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>From ${p.printPrice.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .painting-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  const paths = paintings.map(p => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const painting = paintings.find(p => p.slug === params.slug)
  const relatedWorks = paintings
    .filter(p => p.slug !== params.slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return { props: { painting, relatedWorks } }
}
