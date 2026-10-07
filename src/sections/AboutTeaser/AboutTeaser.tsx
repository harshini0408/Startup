import { ArrowLink } from '@/components/ui/Buttons'
import imgStudio from '@/assets/showcase/studio.jpg'
import './AboutTeaser.css'

export function AboutTeaser() {
  return (
    <section className="about-teaser" id="about-teaser" aria-label="About Ignite Studio">
      <div className="container">
        {/* Top Header */}
        <div className="about-teaser__meta">
          <span className="label text-accent">08 / STUDIO ETHOS</span>
          <span className="label font-mono about-teaser__tag">WHO WE ARE</span>
        </div>

        <div className="about-teaser__grid">
          {/* Typography & Philosophy Column */}
          <div className="about-teaser__text-col">
            <h2 className="about-teaser__headline font-display">
              Small team.<br />
              <span className="italic font-normal">Serious about</span><br />
              the details.
            </h2>

            <div className="about-teaser__philosophy">
              <p className="about-teaser__lead font-sans">
                We are an independent product engineering studio that intentionally chooses depth over volume.
              </p>
              <p className="about-teaser__body font-sans">
                We don’t maintain sprawling account management hierarchies or delegate critical architecture to revolving junior contractors. When you work with Ignite, you work directly with founding engineers and product designers who treat your codebase with absolute care.
              </p>
            </div>

            <div className="about-teaser__attributes">
              <div className="about-teaser__attr">
                <span className="about-teaser__attr-num font-mono">01</span>
                <span className="about-teaser__attr-name font-sans">Direct Collaboration</span>
                <p className="about-teaser__attr-desc font-sans">Zero agency middle-layers. Rapid decisions directly with builders.</p>
              </div>
              <div className="about-teaser__attr">
                <span className="about-teaser__attr-num font-mono">02</span>
                <span className="about-teaser__attr-name font-sans">Engineering Rigor</span>
                <p className="about-teaser__attr-desc font-sans">Type-safe architectures, strict performance standards, and clean code.</p>
              </div>
            </div>

            <div className="about-teaser__cta-wrap">
              <ArrowLink to="/about" className="about-teaser__cta">
                MEET THE PEOPLE
              </ArrowLink>
            </div>
          </div>

          {/* Visual Area */}
          <div className="about-teaser__visual-col">
            <div className="about-teaser__frame">
              <img
                src={imgStudio}
                alt="Ignite studio workstation showing system architecture"
                className="about-teaser__image"
                loading="lazy"
              />
              <div className="about-teaser__frame-overlay" />
              <div className="about-teaser__frame-badge font-mono">
                <span className="about-teaser__dot" aria-hidden="true" />
                <span>INDEPENDENT ENGINEERING STUDIO</span>
              </div>
            </div>

            <div className="about-teaser__manifesto-pill">
              <span className="label font-mono text-accent">LOCATION / DISTRIBUTED CORE</span>
              <p className="about-teaser__pill-text font-sans">
                Built with intent. Engineered for global impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
