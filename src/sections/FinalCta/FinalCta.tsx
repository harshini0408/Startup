import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowLink } from '@/components/ui/Buttons'
import { brand } from '@/config/brand'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import './FinalCta.css'

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const auraRef    = useRef<HTMLDivElement>(null)
  const reduced    = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const section = sectionRef.current
    const aura = auraRef.current
    if (!section || !aura) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(aura, {
        x,
        y,
        duration: 1.4,
        ease: 'power3.out',
      })
    }

    section.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => section.removeEventListener('mousemove', handleMouseMove)
  }, [reduced])

  return (
    <section ref={sectionRef} className="final-cta" aria-label="Start a Project">
      {/* Pointer light field */}
      <div ref={auraRef} className="final-cta__aura" aria-hidden="true" />

      {/* Grid watermark */}
      <div className="final-cta__grid" aria-hidden="true" />

      <div className="container final-cta__inner">
        {/* Availability status */}
        <div className="final-cta__status">
          <span className="final-cta__pulse" aria-hidden="true" />
          <span className="label font-mono text-accent">
            CURRENT STATUS: ACCEPTING SELECT Q4 & Q1 ENGAGEMENTS
          </span>
        </div>

        {/* Monumental statement */}
        <h2 className="final-cta__headline font-display">
          Have something<br />
          <span className="italic font-normal">worth building?</span><br />
          Let’s make it real.
        </h2>

        <p className="final-cta__sub font-sans">
          Tell us about your product challenge, technical roadmap, or MVP vision.
          We review every brief carefully and respond directly with candid architectural feedback.
        </p>

        {/* Action buttons */}
        <div className="final-cta__actions">
          <ArrowLink to="/quote" className="final-cta__btn-primary">
            START A PROJECT
          </ArrowLink>
          <Link to="/contact" className="final-cta__btn-secondary font-mono">
            BOOK A CONVERSATION →
          </Link>
        </div>

        {/* Studio footer meta */}
        <div className="final-cta__footer font-mono">
          <div className="final-cta__footer-item">
            <span className="label">DIRECT INQUIRIES:</span>
            <a href={`mailto:${brand.email}`} className="final-cta__email">
              {brand.email}
            </a>
          </div>
          <div className="final-cta__footer-item">
            <span className="label">STUDIO LOCATION:</span>
            <span className="final-cta__loc">{brand.location} — GLOBAL DELIVERY</span>
          </div>
        </div>
      </div>
    </section>
  )
}
