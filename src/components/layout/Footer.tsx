import { Link } from 'react-router-dom'
import { brand } from '@/config/brand'
import './Footer.css'

const FOOTER_NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

const SERVICES_NAV = [
  { label: 'Digital Experiences', href: '/services' },
  { label: 'Product Engineering', href: '/services' },
  { label: 'AI & Automation', href: '/services' },
  { label: 'Platform & Backend', href: '/services' },
  { label: 'Product Design', href: '/services' },
]

const LEGAL_NAV = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
]

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      {/* Main footer grid */}
      <div className="footer__main container">
        {/* Brand col */}
        <div className="footer__brand-col">
          <Link to="/" className="footer__brand" aria-label={`${brand.brandName} — Home`}>
            <span className="footer__brand-name">{brand.brandName}</span>
            <span className="footer__brand-suffix" aria-hidden="true">{brand.brandSuffix}</span>
          </Link>
          <p className="footer__tagline">{brand.tagline}</p>
          <a href={`mailto:${brand.email}`} className="footer__email font-mono">
            {brand.email}
          </a>
        </div>

        {/* Navigation col */}
        <nav className="footer__nav" aria-label="Main directory">
          <p className="label footer__nav-label text-accent font-mono">INDEX</p>
          <ul className="footer__nav-list" role="list">
            {FOOTER_NAV.map(({ label, href }) => (
              <li key={label}>
                <Link to={href} className="footer__nav-link">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services col */}
        <nav className="footer__nav" aria-label="Capabilities">
          <p className="label footer__nav-label text-accent font-mono">CAPABILITIES</p>
          <ul className="footer__nav-list" role="list">
            {SERVICES_NAV.map(({ label, href }) => (
              <li key={label}>
                <Link to={href} className="footer__nav-link">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social col */}
        <div className="footer__social-col">
          <p className="label footer__nav-label text-accent font-mono">CHANNELS</p>
          <ul className="footer__nav-list" role="list">
            {brand.socialLinks.linkedin && (
              <li>
                <a href={brand.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                  LinkedIn ↗
                </a>
              </li>
            )}
            {brand.socialLinks.github && (
              <li>
                <a href={brand.socialLinks.github} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                  GitHub ↗
                </a>
              </li>
            )}
            {brand.socialLinks.instagram && (
              <li>
                <a href={brand.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                  Instagram ↗
                </a>
              </li>
            )}
            {brand.socialLinks.twitter && (
              <li>
                <a href={brand.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                  X / Twitter ↗
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>



      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy font-mono">
            © {currentYear} {brand.brandName.toUpperCase()} STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="footer__craft-badge label font-mono">
            BUILT WITH INTENT. SHIPPED FROM INDIA.
          </div>
          <nav aria-label="Legal navigation">
            <ul className="footer__legal-list" role="list">
              {LEGAL_NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="footer__legal-link font-mono">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
