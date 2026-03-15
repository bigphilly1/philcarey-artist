import Head from 'next/head'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact, Phil Carey Artist</title>
        <meta name="description" content="Get in touch with Phil Carey about original paintings, prints, or commissions." />
      </Head>

      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
      }}>
        <div style={{
          maxWidth: '480px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
            Contact
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300,
            lineHeight: 1.2,
          }}>
            Get in touch
          </h1>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: 1.8, maxWidth: '380px' }}>
            Questions about a specific work, sizing, shipping, or commissions. Phil responds to every enquiry personally.
          </p>

          <div style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
          }}>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                Email
              </p>
              <a
                href="mailto:phil@cornerstonemedia.com.au"
                style={{ fontSize: '0.92rem', color: 'var(--text)', borderBottom: '1px solid var(--border)', paddingBottom: '1px' }}
              >
                phil@cornerstonemedia.com.au
              </a>
            </div>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                Based in
              </p>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)' }}>Sydney, Australia</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
