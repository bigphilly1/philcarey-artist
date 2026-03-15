import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const isHome = router.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [router.pathname])

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 'var(--nav-height)',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
    background: scrolled || !isHome ? 'var(--bg)' : 'transparent',
    boxShadow: scrolled ? '0 1px 0 var(--border)' : 'none',
  }

  const linkStyle = (path) => ({
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: router.pathname === path ? 'var(--accent-light)' : '#D4C4B0',
    transition: 'color 0.2s ease',
    padding: '0.25rem 0',
    borderBottom: router.pathname === path ? '1px solid var(--accent-light)' : '1px solid transparent',
  })

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Logo */}
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 400, letterSpacing: '0.02em', color: '#E8DCD0', fontWeight: 500 }}>
          Phil Carey
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
          <Link href="/" style={linkStyle('/')}>Works</Link>
          <Link href="/about" style={linkStyle('/about')}>About</Link>
          <Link href="/contact" style={linkStyle('/contact')}>Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--text)', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--text)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--text)', transition: 'transform 0.2s', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          <Link href="/" style={{ ...linkStyle('/'), fontSize: '0.95rem' }}>Works</Link>
          <Link href="/about" style={{ ...linkStyle('/about'), fontSize: '0.95rem' }}>About</Link>
          <Link href="/contact" style={{ ...linkStyle('/contact'), fontSize: '0.95rem' }}>Contact</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
