import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 0',
      marginTop: '6rem',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.02em' }}>
          Phil Carey
        </span>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', letterSpacing: '0.08em' }}>
          Sydney, Australia
        </p>
        <a
          href="mailto:phil@cornerstonemedia.com.au"
          style={{ fontSize: '0.8rem', color: 'var(--text-light)', letterSpacing: '0.06em', transition: 'color 0.2s ease' }}
          onMouseEnter={e => e.target.style.color = 'var(--accent)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-light)'}
        >
          phil@cornerstonemedia.com.au
        </a>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
          {new Date().getFullYear()} Phil Carey. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
