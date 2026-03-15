import '../styles/globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}
