import { brand } from '@/config/brand'
import './Legal.css'

export function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="legal-hero__sub font-sans">
            How Ignite collects, protects, and handles information submitted through this website.
          </p>
        </header>

        {/* Explicit Review Disclaimer */}
        <div className="legal-disclaimer">
          <span className="label font-mono text-accent">LEGAL REVIEW NOTICE</span>
          <p className="legal-disclaimer__text font-mono">
            This document represents a structured informational placeholder for the Ignite digital studio demonstration. Prior to commercial public launch, this policy must be formally audited and adapted by qualified legal counsel in accordance with applicable regional data protection regulations (GDPR, CCPA, DPDP).
          </p>
        </div>

        {/* Content */}
        <div className="legal-content">
          <section className="legal-section">
            <span className="legal-section__num font-mono">01</span>
            <h2 className="legal-section__title font-sans">Information We Collect</h2>
            <p className="legal-section__body font-sans">
              We collect information that you voluntarily transmit through our inquiry forms, consultation wizard, or direct email correspondence—including your name, corporate email address, organization name, phone number, and project descriptions.
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">02</span>
            <h2 className="legal-section__title font-sans">How We Use Inquiries</h2>
            <p className="legal-section__body font-sans">
              All submitted data is utilized strictly to evaluate technical feasibility, respond to commercial project briefs, prepare architecture proposals, and coordinate collaborative communication. We do not sell, rent, or monetize your contact records to third-party data brokers.
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">03</span>
            <h2 className="legal-section__title font-sans">Cookies & Technical Telemetry</h2>
            <p className="legal-section__body font-sans">
              This website uses essential session tokens and performance telemetry to support smooth routing, navigation state, and responsive viewport rendering. We do not deploy invasive cross-site advertising trackers or behavioural fingerprinting cookies.
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">04</span>
            <h2 className="legal-section__title font-sans">Data Security & Retention</h2>
            <p className="legal-section__body font-sans">
              We maintain strict technical and organizational safeguards across all hosting infrastructure. Project briefs and submitted documents are held in encrypted environments and deleted upon request.
            </p>
          </section>

          <section className="legal-section">
            <span className="legal-section__num font-mono">05</span>
            <h2 className="legal-section__title font-sans">Client Confidentiality</h2>
            <p className="legal-section__body font-sans">
              We treat all submitted technical specifications, pitch decks, and commercial product ideas with strict professional non-disclosure. We are pleased to execute mutual NDAs prior to in-depth technical discovery discussions.
            </p>
          </section>

          <div className="legal-contact-box font-mono">
            <p className="label text-muted">LEGAL INQUIRIES & DATA REMOVAL:</p>
            <p style={{ marginTop: '0.4rem' }}>
              Direct questions regarding our privacy practices to{' '}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
