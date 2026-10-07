import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import './Services.css'

export function ServicesPage() {
  return (
    <div className="services-page">
      {/* Editorial Hero */}
      <section className="services-hero container">
        <div className="services-hero__meta">
          <span className="label text-accent">IGNITE° CAPABILITIES</span>
          <span className="label font-mono text-muted">10 DISCIPLINES</span>
        </div>

        <h1 className="services-hero__headline font-display">
          What we build<br />
          <span className="italic font-normal">when the default</span><br />
          isn’t good enough.
        </h1>

        <p className="services-hero__sub font-sans">
          We reject cookie-cutter templates, sluggish codebases, and disconnected agency handoffs.
          Every service we provide is rooted in deep product thinking, architectural rigor, and deployable craft.
        </p>

        {/* Quick jump anchor links */}
        <div className="services-hero__anchors">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="services-hero__anchor font-mono">
              <span className="text-accent">{s.number}</span> {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Services List with Streamlined Balanced Editorial Layout */}
      <section className="services-list container">
        {services.map((service, idx) => {
          const isEven = idx % 2 === 1

          return (
            <article
              key={service.id}
              id={service.id}
              className={`service-block ${isEven ? 'service-block--alt' : ''}`}
            >
              <div className="service-block__grid">
                {/* Information / Narrative Column */}
                <div className="service-block__info">
                  <div className="service-block__kicker">
                    <span className="service-block__num font-mono">{service.number}</span>
                    <span className="service-block__badge font-mono">DISCIPLINE</span>
                  </div>

                  <h2 className="service-block__title font-display">{service.title}</h2>

                  {service.tagline && (
                    <p className="service-block__tagline font-sans italic">
                      "{service.tagline}"
                    </p>
                  )}

                  <p className="service-block__desc font-sans">
                    {service.description}
                  </p>

                  <div className="service-block__cta-wrap">
                    <Link
                      to={`/quote?service=${service.id}`}
                      className="service-block__cta-btn"
                    >
                      <span>Start a Project in this Area</span>
                      <span className="service-block__cta-icon" aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>

                {/* Specs / Deliverables Column */}
                <div className="service-block__specs">
                  <div className="service-block__section">
                    <div className="service-block__section-header">
                      <span className="service-block__section-label font-mono">TYPICAL DELIVERABLES</span>
                      <span className="service-block__section-count font-mono">[{service.deliverables.length}]</span>
                    </div>
                    <ul className="service-block__deliv-list">
                      {service.deliverables.map((item) => (
                        <li key={item} className="font-sans">
                          <span className="service-block__check" aria-hidden="true">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-block__section service-block__section--tech">
                    <span className="service-block__section-label font-mono">PRIMARY STACK</span>
                    <div className="service-block__tech-tags">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="service-block__tag font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      {/* Services Footer Banner */}
      <section className="services-cta container">
        <div className="services-cta__box">
          <h2 className="services-cta__title font-display">
            Have a project that spans<br />
            <span className="italic font-normal">multiple disciplines?</span>
          </h2>
          <p className="services-cta__sub font-sans">
            Most of our engagements unite design, engineering, and intelligence simultaneously.
            Tell us about your challenge and we will architect a tailored proposal.
          </p>
          <Link to="/quote" className="services-cta__btn">
            <span>REQUEST A CUSTOM ARCHITECTURE PROPOSAL</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
