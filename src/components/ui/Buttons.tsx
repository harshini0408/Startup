import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/motion/MagneticButton'
import './Buttons.css'

// ============================================================
// PRIMARY BUTTON — fill wipe on hover
// ============================================================
interface PrimaryButtonProps {
  children: React.ReactNode
  href?: string
  to?: string
  onClick?: () => void
  className?: string
  external?: boolean
  'aria-label'?: string
}

export function PrimaryButton({
  children,
  href,
  to,
  onClick,
  className = '',
  external,
  'aria-label': ariaLabel,
}: PrimaryButtonProps) {
  const classes = `btn-primary ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        <span className="btn-primary__text">{children}</span>
        <span className="btn-primary__fill" aria-hidden="true" />
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        <span className="btn-primary__text">{children}</span>
        <span className="btn-primary__fill" aria-hidden="true" />
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} aria-label={ariaLabel}>
      <span className="btn-primary__text">{children}</span>
      <span className="btn-primary__fill" aria-hidden="true" />
    </button>
  )
}

// ============================================================
// TEXT LINK — underline slide
// ============================================================
interface TextLinkProps {
  children: React.ReactNode
  href?: string
  to?: string
  className?: string
  external?: boolean
}

export function TextLink({ children, href, to, className = '', external }: TextLinkProps) {
  const classes = `text-link ${className}`

  if (to) {
    return <Link to={to} className={classes}><span>{children}</span></Link>
  }

  return (
    <a
      href={href}
      className={classes}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span>{children}</span>
    </a>
  )
}

// ============================================================
// ARROW LINK — text + animated arrow
// ============================================================
interface ArrowLinkProps {
  children: React.ReactNode
  to?: string
  href?: string
  className?: string
  external?: boolean
}

export function ArrowLink({ children, to, href, className = '', external }: ArrowLinkProps) {
  const inner = (
    <span className="arrow-link__inner">
      <span className="arrow-link__text">{children}</span>
      <motion.span
        className="arrow-link__arrow"
        initial={{ x: 0, y: 0 }}
        whileHover={{ x: 4, y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        ↗
      </motion.span>
    </span>
  )

  const classes = `arrow-link ${className}`

  if (to) return <Link to={to} className={classes}>{inner}</Link>

  return (
    <a
      href={href}
      className={classes}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {inner}
    </a>
  )
}

// ============================================================
// GHOST BUTTON — bordered, no fill
// ============================================================
interface GhostButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

export function GhostButton({ children, onClick, className = '', 'aria-label': ariaLabel }: GhostButtonProps) {
  return (
    <MagneticButton className={`btn-ghost ${className}`} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </MagneticButton>
  )
}
