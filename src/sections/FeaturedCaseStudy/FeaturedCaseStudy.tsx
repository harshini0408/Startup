import { useState, useRef } from 'react'

import { ArrowLink } from '@/components/ui/Buttons'
import imgKairos from '@/assets/showcase/kairos.jpg'
import imgOrbit from '@/assets/showcase/orbit.jpg'
import './FeaturedCaseStudy.css'

interface Step {
  id: string
  number: string
  label: string
  headline: string
  body: string
  deliverables: string[]
  statLabel: string
  statValue: string
  image: string
}

const CASE_STUDY_STEPS: Step[] = [
  {
    id: 'challenge',
    number: '01',
    label: 'THE CHALLENGE',
    headline: 'Brittle pipelines and 45-minute sync blindspots.',
    body: 'Legacy multi-modal transit networks operated on fragmented batch scripts. When route disruptions or customs holds occurred, operators endured 45+ minute reporting lags—forcing manual phone calls and causing cascading depot gridlocks.',
    deliverables: ['Fragmented batch architecture', '45+ min telemetry blindspots', 'Manual error-prone escalation'],
    statLabel: 'LEGACY REFRESH INTERVAL',
    statValue: '45+ MIN',
    image: imgOrbit,
  },
  {
    id: 'thinking',
    number: '02',
    label: 'OUR THINKING',
    headline: 'From batch cron-jobs to an event-driven actor model.',
    body: 'We discarded monolithic polling in favor of an event-driven reactive state machine. Every vehicle, waypoint, and shipment became an active streaming entity capable of sub-second state recomputation and instant failover quorum.',
    deliverables: ['Event-driven streaming topology', 'Predictive corridor re-routing', 'Sub-second state recomputation'],
    statLabel: 'TARGET SYNC LATENCY',
    statValue: '<100 MS',
    image: imgOrbit,
  },
  {
    id: 'built',
    number: '03',
    label: 'WHAT WE BUILT',
    headline: 'A unified real-time cockpit with vector GIS mapping.',
    body: 'We engineered a high-performance telemetry console utilizing React, WebGL vector maps, and Python FastAPI. Operators can inspect live vehicle velocity, route rebalancing, and telemetry graphs in a single dark-mode glassmorphic workspace.',
    deliverables: ['Custom WebGL geospatial engine', 'Type-safe React & FastAPI layers', 'Multi-tenant operator permissions'],
    statLabel: 'SIMULATED ACTIVE ASSETS',
    statValue: '2,458 NODES',
    image: imgKairos,
  },
  {
    id: 'result',
    number: '04',
    label: 'THE DELIVERABLES',
    headline: 'Deterministic reliability and zero unhandled dispatches.',
    body: 'Shipped a production-grade dispatch platform with sub-100ms websocket latency, offline-tolerant queue sync, automated end-to-end test suites, and Docker containerization ready for cloud deployment.',
    deliverables: ['Zero unhandled dispatch events', 'Automated CI/CD container pipeline', 'Comprehensive engineering handover'],
    statLabel: 'OPERATOR TELEMETRY SYNC',
    statValue: '96.8% ON-TIME',
    image: imgKairos,
  },
]

export function FeaturedCaseStudy() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  const current = CASE_STUDY_STEPS[activeStep]

  return (
    <section ref={containerRef} className="case-study-feature" aria-label="Featured Case Study">
      <div className="container">
        {/* Header */}
        <div className="case-study-feature__header">
          <div className="case-study-feature__meta">
            <span className="label text-accent">DEEP DIVE / FEATURED CASE STUDY</span>
            <span className="label font-mono case-study-feature__project-code">
              PROJECT: KAIROS FLEET
            </span>
          </div>
          <h2 className="case-study-feature__headline font-display">
            How we engineered<br />
            <span className="italic font-normal">an autonomous</span> dispatch system.
          </h2>
        </div>

        {/* Step navigation pills */}
        <div className="case-study-feature__tabs" role="tablist">
          {CASE_STUDY_STEPS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`case-study-feature__tab font-mono ${
                activeStep === idx ? 'case-study-feature__tab--active' : ''
              }`}
              onClick={() => setActiveStep(idx)}
              role="tab"
              aria-selected={activeStep === idx}
            >
              <span className="case-study-feature__tab-num">{s.number}</span>
              <span className="case-study-feature__tab-label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Storytelling Grid */}
        <div className="case-study-feature__grid">
          {/* Left Narrative Column */}
          <div className="case-study-feature__narrative">
            <div className="case-study-feature__step-tag label font-mono">
              STAGE {current.number} / {current.label}
            </div>

            <h3 className="case-study-feature__step-headline font-display">
              {current.headline}
            </h3>

            <p className="case-study-feature__step-body font-sans">
              {current.body}
            </p>

            {/* Architectural Deliverables */}
            <div className="case-study-feature__specs">
              <span className="label font-mono case-study-feature__specs-title">
                KEY TECHNICAL HIGHLIGHTS:
              </span>
              <ul className="case-study-feature__specs-list">
                {current.deliverables.map((item) => (
                  <li key={item} className="case-study-feature__spec-item font-mono">
                    <span className="case-study-feature__bullet" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tangible Metric Badge */}
            <div className="case-study-feature__metric">
              <span className="case-study-feature__metric-value font-display">
                {current.statValue}
              </span>
              <span className="case-study-feature__metric-label label font-mono">
                {current.statLabel}
              </span>
            </div>

            <div className="case-study-feature__cta-row">
              <ArrowLink to="/work/kairos-fleet" className="case-study-feature__cta">
                VIEW FULL ARCHITECTURE BREAKDOWN
              </ArrowLink>
            </div>
          </div>

          {/* Right Visual Panel */}
          <div className="case-study-feature__visual-wrap" data-cursor="view">
            <div className="case-study-feature__frame">
              <img
                src={current.image}
                alt={`Kairos Fleet - ${current.label}`}
                className="case-study-feature__image"
              />
              <div className="case-study-feature__frame-overlay" />

              <div className="case-study-feature__frame-hud font-mono">
                <span className="case-study-feature__hud-left">
                  SYSTEM / TELEMETRY_STREAM_V2
                </span>
                <span className="case-study-feature__hud-right">
                  STATUS: LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
