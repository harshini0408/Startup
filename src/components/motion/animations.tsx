import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger, SplitText)

import { EASE_EXPO, EASE_QUART } from './variants'





// ============================================================
// CLIP-PATH REVEAL — bottom-up wipe
// ============================================================
interface ClipRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ClipReveal({ children, className = '', delay = 0 }: ClipRevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// FADE UP — simple scroll-triggered fade
// ============================================================
interface FadeUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
}

export function FadeUp({ children, className = '', delay = 0, distance = 50 }: FadeUpProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// SCALE REVEAL
// ============================================================
interface ScaleRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScaleReveal({ children, className = '', delay = 0 }: ScaleRevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// STAGGER GROUP — wraps children with stagger
// ============================================================
interface StaggerGroupProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerGroup({ children, className = '', staggerDelay = 0.1 }: StaggerGroupProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = motion.div

// ============================================================
// LINE REVEAL — GSAP SplitText word-by-word reveal
// ============================================================
interface LineRevealProps {
  children: string
  className?: string
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}

export function LineReveal({ children, className = '', delay = 0, as: Tag = 'p' }: LineRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !wrapRef.current) return

    const el = wrapRef.current.querySelector('[data-gsap-text]') as HTMLElement
    if (!el) return

    const split = new SplitText(el, { type: 'lines,words', linesClass: 'line-wrap' })

    gsap.set(split.words, { yPercent: 110, opacity: 0 })

    const ctx = gsap.context(() => {
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.0,
        ease: EASE_EXPO,
        stagger: 0.04,
        delay,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 88%',
          once: true,
        },
      })
    }, wrapRef.current)

    return () => {
      ctx.revert()
      split.revert()
    }
  }, [reduced, delay])

  const inner = <Tag data-gsap-text="true" className={className}>{children}</Tag>

  return <div ref={wrapRef}>{inner}</div>
}

// ============================================================
// TEXT REVEAL — character by character GSAP
// ============================================================
interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}

export function TextReveal({ children, className = '', delay = 0, as: Tag = 'span' }: TextRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !wrapRef.current) return

    const el = wrapRef.current.querySelector('[data-gsap-text]') as HTMLElement
    if (!el) return

    const split = new SplitText(el, { type: 'chars,words' })

    gsap.set(split.chars, { yPercent: 120, opacity: 0 })

    const ctx = gsap.context(() => {
      gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: EASE_EXPO,
        stagger: 0.025,
        delay,
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    }, wrapRef.current)

    return () => {
      ctx.revert()
      split.revert()
    }
  }, [reduced, delay])

  const inner = <Tag data-gsap-text="true" className={className}>{children}</Tag>

  return (
    <div ref={wrapRef} className="overflow-hidden">{inner}</div>
  )
}

// ============================================================
// PARALLAX MEDIA — scroll-based Y-shift
// ============================================================
interface ParallaxMediaProps {
  children: React.ReactNode
  className?: string
  speed?: number  // -1 to 1, negative = scroll down faster
}

export function ParallaxMedia({ children, className = '', speed = 0.15 }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * -100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [reduced, speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// ============================================================
// IMAGE REVEAL — clip-path + scale
// ============================================================
interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  delay?: number
}

export function ImageReveal({ src, alt, className = '', delay = 0 }: ImageRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLImageElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !wrapRef.current || !imgRef.current) return

    const wrap = wrapRef.current
    const img  = imgRef.current

    gsap.set(wrap, { clipPath: 'inset(100% 0 0 0)' })
    gsap.set(img, { scale: 1.12 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top 85%',
          once: true,
        },
      })

      tl.to(wrap, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: EASE_EXPO, delay })
        .to(img,  { scale: 1, duration: 1.4, ease: EASE_QUART }, '<0.1')
    }, wrap)

    return () => ctx.revert()
  }, [reduced, delay])

  return (
    <div ref={wrapRef} className={className} style={{ overflow: 'hidden' }}>
      <img ref={imgRef} src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

// ============================================================
// COUNTER — animated number count-up
// ============================================================
interface CounterProps {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function Counter({ to, duration = 2, suffix = '', prefix = '', className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    if (reduced) {
      ref.current.textContent = `${prefix}${to}${suffix}`
      return
    }

    const el = ref.current
    const obj = { value: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: to,
        duration,
        ease: EASE_EXPO,
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
        },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [to, duration, suffix, prefix, reduced])

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}
