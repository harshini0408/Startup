import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import { ArrowLink } from '@/components/ui/Buttons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import './SelectedWork.css'

gsap.registerPlugin(ScrollTrigger)

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRefs  = useRef<(HTMLImageElement | null)[]>([])
  const reduced    = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Parallax on each project image
      imageRefs.current.forEach((img) => {
        if (!img) return
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.06 },
          {
            yPercent: 8,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} className="selected-work" id="selected-work" aria-label="Selected Work">
      <div className="container">
        {/* Section Header */}
        <div className="selected-work__header">
          <div className="selected-work__meta">
            <span className="label text-accent">03 / SELECTED WORK</span>
            <span className="label selected-work__count">PROTOTYPES & SYSTEMS [04]</span>
          </div>
          <h2 className="selected-work__headline font-display">
            A few things<br />
            <span className="italic font-normal">we’ve brought</span><br />
            to life.
          </h2>
        </div>

        {/* Massive Project Showcases */}
        <div className="selected-work__list">
          {projects.map((project, idx) => {
            const isReversed = idx % 2 === 1
            const num = (idx + 1).toString().padStart(2, '0')

            return (
              <article
                key={project.id}
                className={`selected-work__card ${isReversed ? 'selected-work__card--reversed' : ''}`}
              >
                {/* Visual Media Frame */}
                <div
                  className="selected-work__media-wrap"
                  data-cursor="view"
                >
                  <Link
                    to={`/work/${project.slug}`}
                    className="selected-work__media-link"
                    aria-label={`View ${project.title} case study`}
                  >
                    <div className="selected-work__media-inner">
                      <img
                        ref={(el) => { imageRefs.current[idx] = el }}
                        src={project.coverImage}
                        alt={`${project.title} product interface preview`}
                        className="selected-work__img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="selected-work__overlay" />
                    </div>
                    <div className="selected-work__badge font-mono">
                      <span>{project.workType || project.category}</span>
                    </div>
                  </Link>
                </div>

                {/* Narrative Details */}
                <div className="selected-work__content">
                  <div className="selected-work__content-top">
                    <span className="selected-work__num font-mono">
                      PROJECT / {num}
                    </span>
                    <span className="selected-work__year label font-mono">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="selected-work__title font-display">
                    <Link to={`/work/${project.slug}`} className="selected-work__title-link">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="selected-work__client label font-mono">
                    {project.client}
                  </p>

                  <div className="selected-work__challenge">
                    <span className="selected-work__section-tag label font-mono">
                      THE CHALLENGE:
                    </span>
                    <p className="selected-work__desc">
                      {project.challenge || project.description}
                    </p>
                  </div>

                  <div className="selected-work__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="selected-work__tag font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="selected-work__cta-wrap">
                    <ArrowLink to={`/work/${project.slug}`} className="selected-work__cta">
                      EXPLORE CASE STUDY
                    </ArrowLink>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Section bottom CTA */}
        <div className="selected-work__footer">
          <p className="selected-work__footer-text font-sans">
            Every product we build is designed with bespoke systems architecture and zero generic shortcuts.
          </p>
          <ArrowLink to="/work" className="selected-work__footer-link">
            VIEW COMPLETE ARCHIVE
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}
