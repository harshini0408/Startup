import { useState } from 'react'
import { services } from '@/data/services'
import { ArrowLink } from '@/components/ui/Buttons'
import './Capabilities.css'

const PREVIEW_DETAILS: Record<string, { badge: string; metrics: string[]; highlight: string }> = {
  'web-digital-experiences': {
    badge: 'DIGITAL EXPERIENCES',
    metrics: ['Responsive on all devices', 'Online store & payments', 'High conversion layouts'],
    highlight: 'Business websites and online stores that clearly position your brand and convert.',
  },
  'saas-product-development': {
    badge: 'COMMERCIAL SAAS',
    metrics: ['Browser-based access', 'Accounts & workspaces', 'Subscription billing'],
    highlight: 'Production-ready web software engineered for daily operations and user scale.',
  },
  'ui-ux-product-design': {
    badge: 'EXPERIENCE DESIGN',
    metrics: ['Clear layout planning', 'Brand-aligned interfaces', 'Clickable previews'],
    highlight: 'Intuitive layouts and simplified user journeys that earn immediate customer trust.',
  },
  'backend-api-engineering': {
    badge: 'CORE SYSTEMS',
    metrics: ['Reliable databases', 'Third-party integrations', 'Access & permissions'],
    highlight: 'Resilient backend foundations and APIs handling your daily business functions.',
  },
  'ai-integration': {
    badge: 'INTELLIGENT WORKFLOWS',
    metrics: ['Document extraction', 'Smart summarization', 'Content drafting'],
    highlight: 'Useful AI capabilities embedded directly into your existing software and tools.',
  },
  'agentic-ai-automation': {
    badge: 'AUTONOMOUS AGENTS',
    metrics: ['Repetitive task automation', 'Cross-tool assistants', 'Human approval controls'],
    highlight: 'Workflows that carry out multi-step tasks across connected business tools.',
  },
  'data-analytics': {
    badge: 'BUSINESS INTELLIGENCE',
    metrics: ['Unified spreadsheets & tools', 'Data cleaning & deduplication', 'Clear visual dashboards'],
    highlight: 'Turning fragmented numbers and spreadsheets into real-time operational clarity.',
  },
  'mvp-development': {
    badge: 'RAPID LAUNCH',
    metrics: ['Essential feature selection', 'Working user journey', 'Iterative improvements'],
    highlight: 'Turning ambitious product ideas into working software real users can try.',
  },
  'recommendation-systems': {
    badge: 'PERSONALIZATION ENGINES',
    metrics: ['Browse & buy suggestions', 'Related add-on items', 'Custom business rules'],
    highlight: 'Intelligent product and content recommendations that increase user engagement.',
  },
  'chatbots': {
    badge: 'CONVERSATIONAL AI',
    metrics: ['Instant FAQ resolution', 'Enquiry data collection', 'Smooth human handover'],
    highlight: 'Chatbots that answer questions, guide visitors, and triage incoming leads.',
  },
}

export function Capabilities() {
  const [activeId, setActiveId] = useState<string>(services[0]?.id || 'web-digital-experiences')
  const activeService = services.find((s) => s.id === activeId) || services[0]
  const preview =
    PREVIEW_DETAILS[activeId] ||
    PREVIEW_DETAILS['web-digital-experiences'] || {
      badge: 'STUDIO CAPABILITY',
      metrics: ['High reliability', 'Clean architecture', 'Continuous improvement'],
      highlight: activeService.description,
    }

  return (
    <section className="capabilities" id="capabilities" aria-label="Studio Capabilities">
      <div className="container">
        {/* Section Header */}
        <div className="capabilities__header">
          <div className="capabilities__meta">
            <span className="label text-accent">02 / CAPABILITIES</span>
            <span className="label capabilities__studio-tag">DISCIPLINES</span>
          </div>
          <h2 className="capabilities__headline font-display">
            From idea<br />
            <span className="italic font-normal">to interface</span><br />
            to intelligence.
          </h2>
        </div>

        {/* Interactive Layout: Left rows + Right preview panel */}
        <div className="capabilities__grid">
          {/* Service rows */}
          <div className="capabilities__list" role="tablist" aria-label="Capabilities list">
            {services.map((service) => {
              const isActive = service.id === activeId
              return (
                <div
                  key={service.id}
                  className={`capabilities__item ${isActive ? 'capabilities__item--active' : ''}`}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                >
                  <div className="capabilities__item-top">
                    <span className="capabilities__item-num label font-mono">
                      {service.number}
                    </span>
                    <h3 className="capabilities__item-title font-sans">
                      {service.title}
                    </h3>
                  </div>

                  <p className="capabilities__item-desc">
                    {service.description}
                  </p>

                  <ul className="capabilities__tags">
                    {(service.capabilities || service.deliverables || []).map((cap) => (
                      <li key={cap} className="capabilities__tag font-mono">
                        {cap}
                      </li>
                    ))}
                  </ul>

                </div>
              )
            })}

            <div className="capabilities__cta-wrap">
              <ArrowLink to="/services" className="capabilities__cta">
                EXPLORE ALL CAPABILITIES
              </ArrowLink>
            </div>
          </div>

          {/* Sticky visual preview panel on desktop */}
          <div className="capabilities__preview-wrap">
            <div className="capabilities__preview-panel">
              <div className="capabilities__preview-header">
                <span className="label text-accent font-mono">
                  {preview.badge}
                </span>
                <span className="capabilities__preview-status label font-mono">
                  STATUS: OPERATIONAL
                </span>
              </div>

              <div className="capabilities__preview-body">
                <span className="capabilities__preview-num font-display">
                  {activeService.number}
                </span>
                <h4 className="capabilities__preview-title font-display italic">
                  {activeService.title}
                </h4>
                <p className="capabilities__preview-highlight">
                  "{preview.highlight}"
                </p>

                <div className="capabilities__preview-specs">
                  <span className="label font-mono capabilities__specs-title">
                    KEY BENCHMARKS
                  </span>
                  <ul className="capabilities__specs-list">
                    {preview.metrics.map((m) => (
                      <li key={m} className="capabilities__specs-item font-mono">
                        <span className="capabilities__spec-dot" aria-hidden="true" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="capabilities__preview-footer">
                <span className="label font-mono">IGNITE ARCHITECTURE CORE</span>
                <span className="label text-accent font-mono">CORE / {activeService.number}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
