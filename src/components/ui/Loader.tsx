import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { brand } from '@/config/brand'
import './Loader.css'

const WORDS = ['DESIGN', 'ENGINEERING', 'INTELLIGENCE']

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const loaderRef  = useRef<HTMLDivElement>(null)
  const nameRef    = useRef<HTMLDivElement>(null)
  const wordRef    = useRef<HTMLDivElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const el      = loaderRef.current
    const nameEl  = nameRef.current
    const wordEl  = wordRef.current
    const lineEl  = lineRef.current
    if (!el || !nameEl || !wordEl || !lineEl) return

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    // Fade in brand name
    tl.fromTo(nameEl,
      { yPercent: 80, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )

    // Line expand
    .fromTo(lineEl,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )

    // Cycle through words
    WORDS.forEach((word, i) => {
      tl.add(() => setWordIndex(i))
      tl.fromTo(wordEl,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
      if (i < WORDS.length - 1) {
        tl.to(wordEl,
          { yPercent: -60, opacity: 0, duration: 0.25, ease: 'power2.in' },
          '+=0.28'
        )
      }
    })

    // Hold briefly
    tl.to({}, { duration: 0.4 })

    // Exit: clip upward
    tl.to(el, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.75,
      ease: 'power4.inOut',
    }, '+=0.1')

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div ref={loaderRef} className="loader" aria-hidden="true">
      <div className="loader__inner">
        <div className="loader__name-wrap">
          <div ref={nameRef} className="loader__name">
            {brand.brandName}<span className="loader__suffix">{brand.brandSuffix}</span>
          </div>
        </div>
        <div ref={lineRef} className="loader__line" />
        <div className="loader__word-wrap">
          <div ref={wordRef} className="loader__word">
            {WORDS[wordIndex]}
          </div>
        </div>
      </div>
    </div>
  )
}
