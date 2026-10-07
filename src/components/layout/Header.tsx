import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { brand } from '@/config/brand'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { PrimaryButton } from '@/components/ui/Buttons'
import './Header.css'

const EXPO_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]
const EXPO_IN_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { label: 'Work',     href: '/work'     },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about'    },
  { label: 'Insights', href: '/insights' },
]

const MENU_ITEMS = [
  { label: 'Services', href: '/services', number: '01' },
  { label: 'Work',     href: '/work',     number: '02' },
  { label: 'About',    href: '/about',    number: '03' },
  { label: 'Insights', href: '/insights', number: '04' },
  { label: 'Contact',  href: '/contact',  number: '05' },
]

export function Header() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const reduced   = usePrefersReducedMotion()
  const location  = useLocation()

  // Close menu on route change
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setMenuOpen(false)
  }


  // Scroll-based header style
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // GSAP entrance
  useEffect(() => {
    if (reduced || !headerRef.current) return
    gsap.fromTo(
      headerRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.2 }
    )
  }, [reduced])

  const menuVariants: Variants = {
    closed: { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
    open:   {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      transition: { duration: 0.65, ease: EXPO_EASE } satisfies Transition,
    },
  }

  // Function variant — typed loosely to avoid TS union complexity
  const menuItemVariants = {
    closed: { y: 60, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: EXPO_IN_EASE,
        delay: 0.15 + i * 0.08,
      } satisfies Transition,
    }),
  } as const

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
        aria-label="Site header"
      >
        <div className="header__inner container">
          {/* Brand */}
          <Link to="/" className="header__brand" aria-label={`${brand.brandName} — Home`}>
            <span className="header__brand-name">{brand.brandName}</span>
            <span className="header__brand-suffix" aria-hidden="true">{brand.brandSuffix}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="header__nav" aria-label="Primary navigation">
            <ul className="header__nav-list" role="list">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Menu toggle */}
          <div className="header__actions">
            <PrimaryButton to="/quote" className="header__cta">
              Start a Project ↗
            </PrimaryButton>

            <button
              className={`header__menu-btn ${menuOpen ? 'header__menu-btn--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="header__menu-line" aria-hidden="true" />
              <span className="header__menu-line" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="fullscreen-menu"
            className="fullscreen-menu"
            variants={menuVariants}
            initial={reduced ? false : 'closed'}
            animate="open"
            exit={reduced ? {} : 'closed'}
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="fullscreen-menu__inner container">
              {/* Left: giant nav */}
              <nav aria-label="Fullscreen navigation">
                <ul className="fullscreen-menu__list" role="list">
                  {MENU_ITEMS.map(({ label, href, number }, i) => (
                    <li key={href} className="fullscreen-menu__item">
                      <motion.div
                        className="overflow-hidden"
                        custom={i}
                        variants={menuItemVariants}
                        initial={reduced ? false : 'closed'}
                        animate="open"
                        exit={reduced ? {} : 'closed'}
                      >
                        <Link
                          to={href}
                          className="fullscreen-menu__link"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="fullscreen-menu__number">{number}</span>
                          <span className="fullscreen-menu__label">{label}</span>
                        </Link>
                      </motion.div>
                      <div className="fullscreen-menu__divider" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right: info panel */}
              <motion.div
                className="fullscreen-menu__info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
                exit={{ opacity: 0 }}
              >
                <p className="label">Get in touch</p>
                <a href={`mailto:${brand.email}`} className="fullscreen-menu__email">
                  {brand.email}
                </a>

                <div className="fullscreen-menu__social">
                  {Object.entries(brand.socialLinks).map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fullscreen-menu__social-link"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </a>
                  ))}
                </div>

                <p className="fullscreen-menu__location label">
                  {brand.location}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
