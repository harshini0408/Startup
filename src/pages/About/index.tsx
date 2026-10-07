import { team } from '@/data/team'
import { ArrowLink } from '@/components/ui/Buttons'
import imgStudio from '@/assets/showcase/studio.jpg'
import './About.css'

export function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero container">
        <div className="about-hero__meta">
          <span className="label text-accent">03 — ABOUT IGNITE°</span>
          <span className="label font-mono text-muted">STUDIO MANIFESTO</span>
        </div>

        <h1 className="about-hero__headline font-display">
          We’re not<br />
          <span className="italic font-normal">interested in</span><br />
          ordinary software.
        </h1>

        <p className="about-hero__sub font-sans">
          Ignite was founded on a simple observation: the world is full of software that works just well enough, looks completely uninspired, and frustrates everyone who touches it. We exist to build the opposite.
        </p>
      </section>

      {/* Origin Story */}
      <section className="about-origin container">
        <div className="about-origin__grid">
          <div className="about-origin__left">
            <span className="label text-accent font-mono">ORIGIN & THESIS</span>
            <h2 className="about-origin__title font-display">
              Why the studio exists.
            </h2>
          </div>

          <div className="about-origin__right font-sans">
            <p className="about-origin__lead">
              The technology industry is divided between large bureaucratic consultancies that move slowly, and design shops that deliver mockups they cannot engineer.
            </p>
            <p>
              In traditional agencies, designers create static Figma files without understanding database constraints, while engineers implement interfaces without caring about typography, spatial rhythm, or micro-interaction feedback.
            </p>
            <p>
              Ignite is an independent digital product studio that reunites design and engineering under one roof. We understand the business problem, design the exact tactile experience, write the production code, and help ship it into real users’ hands.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Workspace Frame */}
      <section className="about-visual container">
        <div className="about-visual__frame">
          <img
            src={imgStudio}
            alt="Ignite studio workstation showing architecture diagrams"
            className="about-visual__image"
          />
          <div className="about-visual__overlay" />
          <div className="about-visual__badge font-mono">
            <span>INDEPENDENT CORE / CRAFT OVER CONFORMITY</span>
          </div>
        </div>
      </section>

      {/* Principles & Philosophy */}
      <section className="about-philosophy container">
        <div className="about-philosophy__header">
          <span className="label text-accent font-mono">WORKING PHILOSOPHY</span>
          <h2 className="about-philosophy__title font-display">
            How we operate day-to-day.
          </h2>
        </div>

        <div className="about-philosophy__grid">
          <div className="about-philosophy__card">
            <span className="about-philosophy__num font-mono">01</span>
            <h3 className="about-philosophy__name font-sans">Direct Collaboration</h3>
            <p className="about-philosophy__desc font-sans">
              No account managers, no junior intermediaries, and no message relay games. You work directly with founding engineers and product designers who understand your product deeply.
            </p>
          </div>

          <div className="about-philosophy__card">
            <span className="about-philosophy__num font-mono">02</span>
            <h3 className="about-philosophy__name font-sans">Prototypes That Ship</h3>
            <p className="about-philosophy__desc font-sans">
              We don’t build disposable mockups meant only for presentation slide decks. Every interface prototype is structured with production-grade components that evolve directly into shipping software.
            </p>
          </div>

          <div className="about-philosophy__card">
            <span className="about-philosophy__num font-mono">03</span>
            <h3 className="about-philosophy__name font-sans">High Agency Execution</h3>
            <p className="about-philosophy__desc font-sans">
              We take ownership of ambiguities. When technical challenges arise, we don’t wait for you to specify every step; we evaluate the trade-offs, prototype solutions, and present clear options.
            </p>
          </div>

          <div className="about-philosophy__card">
            <span className="about-philosophy__num font-mono">04</span>
            <h3 className="about-philosophy__name font-sans">Radical IP Ownership</h3>
            <p className="about-philosophy__desc font-sans">
              Everything we create belongs 100% to you. Clean repositories, comprehensive documentation, reproducible docker environments, and automated CI/CD pipelines so you are never locked in.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Team */}
      <section className="about-team container">
        <div className="about-team__header">
          <span className="label text-accent font-mono">STUDIO LEADERSHIP</span>
          <h2 className="about-team__title font-display">
            Small by design. Direct from conversation to execution.
          </h2>
          <p className="about-team__sub font-sans">
            We intentionally remain compact. No account managers or message relay games—you work directly with the founding engineers and architects who design and write your code.
          </p>
        </div>

        <div className="about-team__grid">
          {team.map((member) => (
            <div key={member.id} className="about-team__card">
              <div className="about-team__card-avatar font-mono">
                <span>{member.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="about-team__card-info">
                <h3 className="about-team__name font-sans">{member.name}</h3>
                <p className="about-team__role label font-mono text-accent">{member.role}</p>
                <p className="about-team__bio font-sans">{member.bio}</p>

                {member.socialLinks && (
                  <div className="about-team__links font-mono">
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="about-team__link">
                        LinkedIn ↗
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="about-team__link">
                        GitHub ↗
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="about-team__link">
                        X / Twitter ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About CTA */}
      <section className="about-cta container">
        <div className="about-cta__box">
          <h2 className="about-cta__title font-display">
            Ready to build with a studio<br />
            <span className="italic font-normal">that cares about the details?</span>
          </h2>
          <p className="about-cta__sub font-sans">
            Whether you are launching a greenfield product or overhauling an existing system, we would love to learn about what you are building.
          </p>
          <ArrowLink to="/quote" className="about-cta__btn">
            START A CONVERSATION
          </ArrowLink>
        </div>
      </section>
    </div>
  )
}
