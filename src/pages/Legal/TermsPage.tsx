import { brand } from '@/config/brand'
import './Legal.css'

export function TermsPage() {
  return (
    <div className="legal-page">
      <div className="container">
        {/* Header */}
        <header className="legal-hero">
          <div className="legal-hero__meta">
            <span className="label text-accent font-mono">LEGAL COMPLIANCE</span>
            <span className="label font-mono text-muted">LAST REVISED: OCTOBER 2025</span>
          </div>

          <h1 className="legal-hero__title font-display">
            Terms of Use
          </h1>

          <p className="legal-hero__sub font-sans">
            Terms governing access to this website and general engagement standards with Ignite.
          </p>
        </header>

        {/* Explicit Review Disclaimer */}
        <div className="legal-disclaimer">
          <span className="label font-mono text-accent">LEGAL REVIEW NOTICE</span>
          <p className="legal-disclaimer__text font-mono">
            These terms represent a structured informational outline for the Ignite digital studio demonstration. Commercial engineering engagements are governed by separate, bespoke Master Services Agreements (MSA) and Statements of Work (SOW) executed between Ignite and the client organization.
          </p>
        </div>

        {/* Content */}
        <div className="legal-content">
          <section className="legal-section">
            <span className="legal-section__num font-mono">01</span>
            <h2 className="legal-section__title font-sans">Acceptance of Terms</h2>
            <p className="legal-section__body font-sans">
              By accessing and navigating this website, you agree to comply with these terms of service and all applicable statutory laws. If you do not agree with these principles, please refrain from using our digital interfaces.
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">02</span>
            <h2 className="legal-section__title font-sans">Studio Services & Statements of Work</h2>
            <p className="legal-section__body font-sans">
              Descriptions of engineering capabilities, case study prototypes, and architectural methodologies published on this website are for demonstration and informational purposes. Formal commercial commitments are governed exclusively by formal Statements of Work (SOW).
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">03</span>
            <h2 className="legal-section__title font-sans">Intellectual Property & Ownership</h2>
            <p className="legal-section__body font-sans">
              All branding marks, editorial typography, motion choreography, and case study documentation published on this website remain the proprietary intellectual property of Ignite. In client engagements, 100% of custom application code and bespoke assets transfer irrevocably to the client upon milestone payment completion.
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">04</span>
            <h2 className="legal-section__title font-sans">Confidentiality & Non-Disclosure</h2>
            <p className="legal-section__body font-sans">
              Proprietary information shared during discovery phases is held under strict professional confidence. Neither party shall disclose technical specifications or trade secrets without explicit written authorization.
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">05</span>
            <h2 className="legal-section__title font-sans">Limitation of Liability</h2>
            <p className="legal-section__body font-sans">
              This website is provided on an "as is" and "as available" basis without warranties of any kind. Ignite shall not be liable for indirect, consequential, or incidental damages arising from the use or inability to access this digital service.
            </p>
          </section>

          <div className="legal-contact-box font-mono">
            <p className="label text-muted">LEGAL COUNSEL INQUIRIES:</p>
            <p style={{ marginTop: '0.4rem' }}>
              Direct questions regarding our commercial terms to{' '}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
