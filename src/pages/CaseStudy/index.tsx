import { useParams, Link, Navigate } from 'react-router-dom'
import { projects } from '@/data/projects'
import './CaseStudy.css'


export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return <Navigate to="/work" replace />
  }

  const nextProject = projects.find((p) => p.slug === project.nextSlug) || projects[0]

  return (
    <article className="case-study-page" aria-label={`Case study: ${project.title}`}>
      {/* 1. Case Study Hero */}
      <header className="case-study-hero container">
        <div className="case-study-hero__back">
          <Link to="/work" className="case-study-hero__back-link font-mono">
            ← BACK TO SELECTED WORK
          </Link>
        </div>

        <div className="case-study-hero__meta">
          <span className="label text-accent font-mono">{project.category}</span>
          <span className="label text-muted font-mono">{project.year}</span>
        </div>

        <h1 className="case-study-hero__title font-display">
          {project.title}
        </h1>

        <p className="case-study-hero__outcome font-sans">
          "{project.oneLineOutcome || project.description}"
        </p>

        {/* Project Metadata Specs Grid */}
        <div className="case-study-hero__specs font-mono">
          <div className="case-study-hero__spec-item">
            <span className="label text-muted">INDUSTRY</span>
            <span className="case-study-hero__spec-val">{project.industry || 'Digital Technology'}</span>
          </div>
          <div className="case-study-hero__spec-item">
            <span className="label text-muted">CLASSIFICATION</span>
            <span className="case-study-hero__spec-val text-accent">{project.workType || 'STUDIO PROTOTYPE'}</span>
          </div>
          <div className="case-study-hero__spec-item">
            <span className="label text-muted">CLIENT / INITIATIVE</span>
            <span className="case-study-hero__spec-val">{project.client}</span>
          </div>
          <div className="case-study-hero__spec-item">
            <span className="label text-muted">DISCIPLINE</span>
            <span className="case-study-hero__spec-val">{project.category}</span>
          </div>
          <div className="case-study-hero__spec-item">
            <span className="label text-muted">CORE STACK</span>
            <span className="case-study-hero__spec-val">{project.tags.join(' · ')}</span>
          </div>
        </div>
      </header>

      {/* Full-Width Panoramic Media Banner */}
      <section className="case-study-media container">
        <div className="case-study-media__frame">
          <img
            src={project.coverImage}
            alt={`${project.title} system interface`}
            className="case-study-media__img"
          />
          <div className="case-study-media__overlay" />
          <div className="case-study-media__badge font-mono">
            <span>PRODUCTION COCKPIT ARCHITECTURE</span>
          </div>
        </div>
      </section>

      {/* Deep-Dive Narrative Chapters */}
      <div className="case-study-body container">
        {/* Chapter 01: Context */}
        <section className="case-study-chapter">
          <div className="case-study-chapter__header">
            <span className="case-study-chapter__num font-mono">01</span>
            <h2 className="case-study-chapter__title font-display">Context</h2>
          </div>
          <div className="case-study-chapter__content font-sans">
            <p className="case-study-chapter__lead">
              What was happening in the environment?
            </p>
            <p>{project.context || project.description}</p>
          </div>
        </section>

        {/* Chapter 02: Problem */}
        <section className="case-study-chapter">
          <div className="case-study-chapter__header">
            <span className="case-study-chapter__num font-mono">02</span>
            <h2 className="case-study-chapter__title font-display">Problem</h2>
          </div>
          <div className="case-study-chapter__content font-sans">
            <p className="case-study-chapter__lead">
              What critical bottlenecks demanded engineering intervention?
            </p>
            <p>{project.problem || project.challenge}</p>
          </div>
        </section>

        {/* Chapter 03: Approach */}
        <section className="case-study-chapter">
          <div className="case-study-chapter__header">
            <span className="case-study-chapter__num font-mono">03</span>
            <h2 className="case-study-chapter__title font-display">Approach</h2>
          </div>
          <div className="case-study-chapter__content font-sans">
            <p className="case-study-chapter__lead">
              How did we reason through the system constraints?
            </p>
            <p>{project.approach || project.solution}</p>
          </div>
        </section>

        {/* Chapter 04: Experience */}
        <section className="case-study-chapter">
          <div className="case-study-chapter__header">
            <span className="case-study-chapter__num font-mono">04</span>
            <h2 className="case-study-chapter__title font-display">Experience</h2>
          </div>
          <div className="case-study-chapter__content font-sans">
            <p className="case-study-chapter__lead">
              UI/UX decisions, spatial hierarchy, and interaction design.
            </p>
            <p>{project.experience}</p>
          </div>
        </section>

        {/* Chapter 05: Engineering */}
        <section className="case-study-chapter">
          <div className="case-study-chapter__header">
            <span className="case-study-chapter__num font-mono">05</span>
            <h2 className="case-study-chapter__title font-display">Engineering</h2>
          </div>
          <div className="case-study-chapter__content font-sans">
            <p className="case-study-chapter__lead">
              Architecture, data models, state machines, and runtime characteristics.
            </p>
            <p>{project.engineering}</p>

            <div className="case-study-stack-box">
              <span className="label font-mono text-muted">TECHNOLOGIES IN ACTION:</span>
              <div className="case-study-stack-tags">
                {project.tags.map((t) => (
                  <span key={t} className="case-study-stack-tag font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 06: Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section className="case-study-chapter">
            <div className="case-study-chapter__header">
              <span className="case-study-chapter__num font-mono">06</span>
              <h2 className="case-study-chapter__title font-display">Key Features</h2>
            </div>
            <div className="case-study-chapter__content">
              <p className="case-study-chapter__lead font-sans">
                Tangible components and capabilities delivered.
              </p>
              <div className="case-study-features-grid">
                {project.keyFeatures.map((kf) => (
                  <div key={kf.title} className="case-study-feature-card">
                    <h3 className="case-study-feature-card__title font-sans">
                      {kf.title}
                    </h3>
                    <p className="case-study-feature-card__desc font-sans">
                      {kf.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Chapter 07: Result */}
        <section className="case-study-chapter">
          <div className="case-study-chapter__header">
            <span className="case-study-chapter__num font-mono">07</span>
            <h2 className="case-study-chapter__title font-display">Result</h2>
          </div>
          <div className="case-study-chapter__content font-sans">
            <p className="case-study-chapter__lead">
              Actual tangible deliverables and operational impact.
            </p>
            <p className="case-study-result-highlight">
              {project.result || project.outcome}
            </p>
          </div>
        </section>
      </div>

      {/* 08: Next Project Transition */}
      <aside className="case-study-next" aria-label="Next case study">
        <div className="container">
          <div className="case-study-next__inner">
            <span className="label font-mono text-accent">08 / NEXT CASE STUDY</span>
            <h2 className="case-study-next__title font-display">
              <Link to={`/work/${nextProject.slug}`} className="case-study-next__link">
                {nextProject.title} →
              </Link>
            </h2>
            <p className="case-study-next__category font-mono label text-muted">
              {nextProject.category} · {nextProject.year}
            </p>
          </div>
        </div>
      </aside>
    </article>
  )
}
