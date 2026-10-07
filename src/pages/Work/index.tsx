import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import { ArrowLink } from '@/components/ui/Buttons'
import './Work.css'

type FilterKey = 'ALL' | 'WEB' | 'PRODUCT' | 'AI' | 'AUTOMATION' | 'DESIGN'

const FILTERS: FilterKey[] = ['ALL', 'WEB', 'PRODUCT', 'AI', 'AUTOMATION', 'DESIGN']

export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects

    return projects.filter((p) => {
      const matchText = (p.category + ' ' + p.tags.join(' ') + ' ' + p.title).toUpperCase()
      if (activeFilter === 'WEB') return matchText.includes('WEB') || matchText.includes('NEXT') || matchText.includes('REACT')
      if (activeFilter === 'PRODUCT') return matchText.includes('PRODUCT') || matchText.includes('PLATFORM') || matchText.includes('CORE')
      if (activeFilter === 'AI') return matchText.includes('AI') || matchText.includes('AGENT') || matchText.includes('VECTOR')
      if (activeFilter === 'AUTOMATION') return matchText.includes('DISPATCH') || matchText.includes('ORCHESTRAT') || matchText.includes('AUTOMATION')
      if (activeFilter === 'DESIGN') return matchText.includes('EDITORIAL') || matchText.includes('COMMERCE') || matchText.includes('SPATIAL')
      return true
    })
  }, [activeFilter])

  return (
    <div className="work-page">
      {/* Gallery Header */}
      <section className="work-hero container">
        <div className="work-hero__meta">
          <span className="label text-accent">IGNITE° PORTFOLIO</span>
          <span className="label font-mono text-muted">
            STUDIO ARCHIVE [{projects.length.toString().padStart(2, '0')}]
          </span>
        </div>

        <h1 className="work-hero__headline font-display">
          Selected<br />
          <span className="italic font-normal">work.</span>
        </h1>

        <p className="work-hero__sub font-sans">
          A collection of digital products, reactive systems, and autonomous engines engineered with bespoke architecture. Every project demonstrates tangible problem solving—not presentation theatre.
        </p>

        {/* Category Filters */}
        <div className="work-filters" role="tablist" aria-label="Portfolio filters">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f
            return (
              <button
                key={f}
                type="button"
                className={`work-filter-btn font-mono ${isActive ? 'work-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(f)}
                role="tab"
                aria-selected={isActive}
              >
                {f}
              </button>
            )
          })}
        </div>
      </section>

      {/* Editorial Gallery Grid */}
      <section className="work-gallery container">
        <div className="work-gallery__grid">
          {filteredProjects.map((project, idx) => {
            const num = (idx + 1).toString().padStart(2, '0')
            // Varying layout classes for asymmetric editorial rhythm
            const layoutClass = `work-card--layout-${(idx % 4) + 1}`

            return (
              <article
                key={project.id}
                className={`work-card ${layoutClass}`}
              >
                <Link
                  to={`/work/${project.slug}`}
                  className="work-card__link"
                  data-cursor="view"
                >
                  <div className="work-card__media">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="work-card__image"
                      loading={idx < 2 ? 'eager' : 'lazy'}
                    />
                    <div className="work-card__overlay" />

                    <div className="work-card__badge font-mono">
                      <span>{project.workType || project.category}</span>
                    </div>

                    <div className="work-card__hud font-mono">
                      <span>PROTOTYPE / {project.year}</span>
                      <span className="text-accent">VIEW CASE STUDY ↗</span>
                    </div>
                  </div>

                  <div className="work-card__content">
                    <div className="work-card__meta">
                      <span className="work-card__num font-mono">{num}</span>
                      <span className="work-card__client font-mono label">{project.client}</span>
                    </div>

                    <h2 className="work-card__title font-display">
                      {project.title}
                    </h2>

                    <p className="work-card__desc font-sans">
                      {project.description}
                    </p>

                    <div className="work-card__tags">
                      {project.tags.map((t) => (
                        <span key={t} className="work-card__tag font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* Gallery Bottom CTA */}
      <section className="work-cta container">
        <div className="work-cta__inner">
          <p className="label text-accent font-mono">COLLABORATIVE ENGAGEMENTS</p>
          <h2 className="work-cta__title font-display">
            Have an ambitious system<br />
            <span className="italic font-normal">to bring to life?</span>
          </h2>
          <ArrowLink to="/quote" className="work-cta__btn">
            DISCUSS YOUR PROJECT
          </ArrowLink>
        </div>
      </section>
    </div>
  )
}
