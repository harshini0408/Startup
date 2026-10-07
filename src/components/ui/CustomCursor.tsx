import { useEffect, useRef, useState } from 'react'
import { useIsTouch } from '@/hooks/useUtils'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import './CustomCursor.css'

export type CursorState = 'default' | 'view' | 'open' | 'drag' | 'explore' | 'send' | 'link'

interface CustomCursorProps {
  state?: CursorState
}

export function CustomCursor({ state = 'default' }: CustomCursorProps) {
  const isTouch   = useIsTouch()
  const reduced   = usePrefersReducedMotion()
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  const labels: Record<CursorState, string> = {
    default: '', view: 'VIEW', open: 'OPEN', drag: 'DRAG',
    explore: 'EXPLORE', send: 'SEND', link: '',
  }
  const label = isTouch || reduced ? '' : (labels[state] || '')


  useEffect(() => {
    if (isTouch || reduced) return

    document.body.classList.add('has-custom-cursor')

    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
      setVisible(true)
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        // Inertial lag for the outer ring
        ringX += (dotX - ringX) * 0.12
        ringY += (dotY - ringY) * 0.12
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    rafId = requestAnimationFrame(animate)

    // Contextual states from data attributes
    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      if (cursorType && ringRef.current) {
        ringRef.current.setAttribute('data-state', cursorType)
      }
    }

    const handleLeave = () => {
      if (ringRef.current) ringRef.current.setAttribute('data-state', 'default')
    }

    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout',  handleLeave)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout',  handleLeave)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [isTouch, reduced])

  if (isTouch || reduced) return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        data-visible={visible}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        data-visible={visible}
        data-state="default"
        aria-hidden="true"
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  )
}

