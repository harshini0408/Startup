import { useState } from 'react'
import { processSteps } from '@/data/process'
import './Process.css'

export function Process() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = processSteps[activeIdx] || processSteps[0]

  return (
    <section className="process" id="process" aria-label="Our Process">
      <div className="container">
        {/* Header */}
        <div className="process__header">
          <div className="process__meta">
            <span className="label text-accent">05 / HOW WE WORK</span>
            <span className="label font-mono process__tag">
              EXECUTION CYCLE [07]
            </span>
          </div>
          <h2 className="process__headline font-display">
            A disciplined path<br />
            <span className="italic font-normal">from ambiguity</span> to deployment.
          </h2>
        </div>

        {/* Desktop Interactive Stepper */}
        <div className="process__timeline-nav" role="tablist">
          {processSteps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              className={`process__nav-btn font-mono ${
                activeIdx === idx ? 'process__nav-btn--active' : ''
              }`}
              onClick={() => setActiveIdx(idx)}
              role="tab"
              aria-selected={activeIdx === idx}
            >
              <span className="process__nav-num">{step.number}</span>
              <span className="process__nav-title">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Display */}
        <div className="process__stage-card">
          <div className="process__watermark font-display" aria-hidden="true">
            {current.number}
          </div>

          <div className="process__stage-content">
            <div className="process__stage-top">
              <span className="label text-accent font-mono">
                STAGE {current.number} OF 07
              </span>
              <div className="process__stage-controls">
                <button
                  type="button"
                  className="process__ctrl-btn label font-mono"
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
                  aria-label="Previous stage"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  className="process__ctrl-btn label font-mono"
                  disabled={activeIdx === processSteps.length - 1}
                  onClick={() => setActiveIdx((prev) => Math.min(processSteps.length - 1, prev + 1))}
                  aria-label="Next stage"
                >
                  NEXT →
                </button>
              </div>
            </div>

            <h3 className="process__stage-title font-display">
              {current.title}
            </h3>

            <p className="process__stage-desc font-sans">
              {current.description}
            </p>

            <div className="process__deliverables-wrap">
              <span className="label font-mono process__deliv-title">
                TANGIBLE DELIVERABLES:
              </span>
              <ul className="process__deliv-list">
                {current.deliverables?.map((deliv) => (
                  <li key={deliv} className="process__deliv-item font-mono">
                    <span className="process__deliv-check" aria-hidden="true">✓</span>
                    {deliv}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Fallback List */}
        <div className="process__mobile-list">
          {processSteps.map((s) => (
            <div key={s.id} className="process__mobile-item">
              <div className="process__mobile-header">
                <span className="label text-accent font-mono">{s.number}</span>
                <h4 className="process__mobile-title font-sans">{s.title}</h4>
              </div>
              <p className="process__mobile-desc">{s.description}</p>
              <ul className="process__mobile-deliv">
                {s.deliverables?.map((d) => (
                  <li key={d} className="font-mono">{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
