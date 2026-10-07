import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import './Manifesto.css'

gsap.registerPlugin(ScrollTrigger)

const MANIFESTO_LINES = [
  {
    prefix: 'PHASE 01',
    line: "Good software shouldn't just work.",
    emphasis: 'work',
  },
  {
    prefix: 'PHASE 02',
    line: 'It should feel inevitable.',
    emphasis: 'inevitable',
    serif: true,
  },
  {
    prefix: 'PHASE 03',
    line: 'Simple on the surface.',
    emphasis: 'Simple',
  },
  {
    prefix: 'PHASE 04',
    line: 'Powerful underneath.',
    emphasis: 'Powerful',
    serif: true,
    accent: true,
  },
]

export function Manifesto() {
  const containerRef = useRef<HTMLElement>(null)
  const pinRef       = useRef<HTMLDivElement>(null)
  const linesRef     = useRef<(HTMLDivElement | null)[]>([])
  const reduced      = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const container = containerRef.current
    const pin = pinRef.current
    if (!container || !pin) return

    const isMobile = window.innerWidth <= 768

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Clean vertical narrative without pinning or scroll-traps
        linesRef.current.forEach((lineEl) => {
          if (!lineEl) return
          gsap.fromTo(
            lineEl,
            { opacity: 0.3, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: lineEl,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        })
      } else {
        // Desktop: Compressed, punchy pinning distance
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=120%',
            pin: pin,
            scrub: 0.6,
            anticipatePin: 1,
          },
        })

        linesRef.current.forEach((lineEl, idx) => {
          if (!lineEl) return
          if (idx === 0) {
            tl.fromTo(lineEl, { opacity: 0.25, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 })
              .to(lineEl, { opacity: 0.15, y: -15, duration: 0.3 }, '+=0.3')
          } else {
            tl.fromTo(lineEl, { opacity: 0.05, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 })
            if (idx < linesRef.current.length - 1) {
              tl.to(lineEl, { opacity: 0.15, y: -15, duration: 0.3 }, '+=0.3')
            }
          }
        })
      }
    }, container)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={containerRef} className="manifesto" aria-label="What We Believe">
      <div ref={pinRef} className="manifesto__pin container">
        <div className="manifesto__header">
          <span className="manifesto__label label">01 / WHAT WE BELIEVE</span>
          <div className="manifesto__indicator label" aria-hidden="true">
            MANIFESTO
          </div>
        </div>

        <div className="manifesto__stage">
          {MANIFESTO_LINES.map((item, idx) => (
            <div
              key={item.prefix}
              ref={(el) => { linesRef.current[idx] = el }}
              className={`manifesto__phrase ${idx === 0 ? 'manifesto__phrase--first' : ''}`}
            >
              <span className="manifesto__phrase-tag label" aria-hidden="true">
                [{item.prefix}]
              </span>
              <p
                className={`manifesto__phrase-text ${item.serif ? 'font-display italic' : ''} ${
                  item.accent ? 'manifesto__phrase-text--accent' : ''
                }`}
              >
                {item.line}
              </p>
            </div>
          ))}
        </div>

        <div className="manifesto__footer">
          <span className="label">THE PHILOSOPHY OF INEVITABILITY</span>
          <div className="manifesto__bar" />
        </div>
      </div>
    </section>
  )
}
