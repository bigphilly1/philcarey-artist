import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import paintings from '../data/paintings.json'

export default function Success() {
  const router = useRouter()
  const { painting: slug, type } = router.query
  const painting = slug ? paintings.find(p => p.slug === slug) : null

  return (
    <>
      <Head>
        <title>Thank you, Phil Carey Artist</title>
      </Head>

      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '520px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}>

          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10L8.5 14.5L16 6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
            Order confirmed
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300,
            lineHeight: 1.2,
          }}>
            Thank you for your purchase
          </h1>

          {painting && (
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
              {painting.title}{type === 'print' ? ' (Print)' : ' (Original)'}
            </p>
          )}

          <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', lineHeight: 1.7, maxWidth: '400px' }}>
            A confirmation email is on its way. Phil will be in touch within 48 hours with shipping details and tracking information.
          </p>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
            Questions?{' '}
            <a href="mailto:phil@cornerstonemedia.com.au" style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>
              phil@cornerstonemedia.com.au
            </a>
          </p>

          <Link
            href="/"
            style={{
              marginTop: '1rem',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              borderBottom: '1px solid var(--text)',
              paddingBottom: '2px',
            }}
          >
            Back to all works
          </Link>

        </div>
      </div>
    </>
  )
}
