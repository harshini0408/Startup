import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const location   = useLocation()
  const reduced    = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const overlay = overlayRef.current
    if (!overlay) return

    // Page entering — wipe down to reveal
    gsap.set(overlay, { scaleY: 1, transformOrigin: 'top' })
    gsap.to(overlay, {
      scaleY: 0,
      duration: 0.75,
      ease: 'power4.inOut',
      delay: 0.05,
    })

    return () => { gsap.killTweensOf(overlay) }
  }, [location.pathname, reduced])

  return (
    <>
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="page-transition"
        aria-hidden="true"
        style={{
          transformOrigin: 'top',
          transform: 'scaleY(1)',
        }}
      />
      {/* Page content */}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  )
}

