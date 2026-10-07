import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageTransition } from './PageTransition'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { useLenis } from '@/hooks/useLenis'
import { usePageMeta } from '@/hooks/usePageMeta'

// Film grain SVG — base64 encoded turbulence noise
const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
  <filter id='noise'>
    <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='300' height='300' filter='url(#noise)' opacity='1'/>
</svg>`

const GRAIN_URL = `data:image/svg+xml;base64,${btoa(GRAIN_SVG)}`

export function RootLayout() {
  // Initialize Lenis smooth scroll (synced to GSAP)
  useLenis()
  // Dynamic page SEO titles & descriptions
  usePageMeta()


  return (
    <>
      {/* Film grain overlay */}
      <div
        id="grain"
        aria-hidden="true"
        style={{
          backgroundImage: `url("${GRAIN_URL}")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Custom cursor — auto-disabled on touch */}
      <CustomCursor />

      {/* Skip to content for keyboard nav */}
      <a href="#main-content" className="sr-only" style={{ position: 'absolute', zIndex: 9999 }}>
        Skip to main content
      </a>

      <Header />

      <PageTransition>
        <Outlet />
      </PageTransition>

      <Footer />
    </>
  )
}
