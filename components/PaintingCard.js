import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PaintingCard({ painting }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/paintings/${painting.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      <article style={{
        background: 'var(--white)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(44,41,38,0.12)' : '0 2px 12px rgba(44,41,38,0.06)',
      }}>
        
        {/* Image */}
        <div style={{
          position: 'relative',
          paddingBottom: '80%',
          overflow: 'hidden',
          background: 'var(--bg-card)',
        }}>
          <img
            src={painting.image}
            alt={painting.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
            }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentNode.style.background = 'var(--bg-card)'
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 400,
            marginBottom: '0.35rem',
            color: 'var(--text)',
          }}>
            {painting.title}
          </h3>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-light)',
            letterSpacing: '0.04em',
            marginBottom: '0.75rem',
          }}>
            {painting.medium}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 400,
              color: 'var(--text)',
            }}>
              From ${painting.printPrice ? painting.printPrice.toLocaleString() : painting.price.toLocaleString()}
            </span>
            <span style={{
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: hovered ? 'var(--accent)' : 'var(--text-light)',
              transition: 'color 0.2s ease',
            }}>
              View
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
