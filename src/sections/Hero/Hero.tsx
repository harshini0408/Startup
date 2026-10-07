import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const line4Ref = useRef<HTMLSpanElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bgWordRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const coordinateRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const section = sectionRef.current
    if (!section) return

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current].filter(Boolean)
    const elements = [metaRef.current, ...lines, subRef.current, ctaRef.current].filter(Boolean)

    const ctx = gsap.context(() => {
      // Cinematic initial entrance timeline
      const tl = gsap.timeline({ delay: 0.15 })

      tl.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.08,
        }
      )

      // Pointer-follow light field & subtle coordinate shift
      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const normX = (x / rect.width - 0.5) * 2
        const normY = (y / rect.height - 0.5) * 2

        if (lightRef.current) {
          gsap.to(lightRef.current, {
            x,
            y,
            duration: 1.2,
            ease: 'power3.out',
          })
        }

        // Spatial typography parallax shift
        if (line1Ref.current && line2Ref.current && line3Ref.current && line4Ref.current) {
          gsap.to(line1Ref.current, { x: normX * 8, y: normY * 4, duration: 0.8, ease: 'power2.out' })
          gsap.to(line2Ref.current, { x: normX * -12, y: normY * 6, duration: 0.8, ease: 'power2.out' })
          gsap.to(line3Ref.current, { x: normX * 10, y: normY * -4, duration: 0.8, ease: 'power2.out' })
          gsap.to(line4Ref.current, { x: normX * -8, y: normY * -6, duration: 0.8, ease: 'power2.out' })
        }

        if (coordinateRef.current) {
          coordinateRef.current.textContent = `LOC: [${Math.round(x).toString().padStart(4, '0')}, ${Math.round(y).toString().padStart(4, '0')}]`
        }
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })

      // Scroll dismantling transformation
      const dismantleTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      dismantleTl
        .to(line1Ref.current, { xPercent: -20, opacity: 0.1, ease: 'none' }, 0)
        .to(line2Ref.current, { xPercent: 25, opacity: 0.05, ease: 'none' }, 0)
        .to(line3Ref.current, { xPercent: -30, opacity: 0.08, ease: 'none' }, 0)
        .to(line4Ref.current, { xPercent: 15, opacity: 0.1, ease: 'none' }, 0)
        .to(subRef.current, { yPercent: 40, opacity: 0, ease: 'none' }, 0)
        .to(ctaRef.current, { yPercent: 50, opacity: 0, ease: 'none' }, 0)
        .to(bgWordRef.current, { yPercent: 35, scale: 1.1, ease: 'none' }, 0)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }, section)

    return () => ctx.revert()
  }, [reduced])

  const scrollToWork = () => {
    const el = document.getElementById('selected-work')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="hero" aria-label="Ignite Studio Ambition">
      {/* Interactive architectural light aura */}
      <div ref={lightRef} className="hero__pointer-light" aria-hidden="true" />

      {/* Giant architectural watermark */}
      <div ref={bgWordRef} className="hero__bg-word" aria-hidden="true">
        IGNITE
      </div>

      {/* Architectural grid overlay */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Real-time coordinate tag */}


      <div className="hero__inner container">


        {/* Main experimental typography statement */}
        <h6 className="hero__statement" aria-label="We build digital products that move businesses.">
          <span ref={line1Ref} className="hero__line hero__line--solid">
            WE BUILD
          </span>
          <span ref={line2Ref} className="hero__line hero__line--serif">
            DIGITAL PRODUCTS
          </span>
          <span ref={line3Ref} className="hero__line hero__line--outline">
            THAT MOVE
          </span>
          <span ref={line4Ref} className="hero__line hero__line--accent">
            BUSINESSES.
          </span>
        </h6>

        {/* Secondary editorial statement */}
        <div className="hero__bottom-row">
          <p ref={subRef} className="hero__sub">
            Design, engineering and AI systems for ambitious products and growing businesses. From first sketch to production deployment.
          </p>

          {/* CTA actions */}
          <div ref={ctaRef} className="hero__cta-row">
            <Link to="/quote" className="hero__cta-primary">
              <span className="hero__cta-primary-text">START A PROJECT</span>
              <span className="hero__cta-primary-icon" aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              onClick={scrollToWork}
              className="hero__cta-secondary"
            >
              <span className="hero__cta-secondary-text">EXPLORE OUR WORK</span>
              <span className="hero__cta-secondary-icon" aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="label">SCROLL</span>
      </div>

      {/* Studio indicator */}
      <div className="hero__number" aria-hidden="true">
        STUDIO / 01
      </div>
    </section>
  )
}
