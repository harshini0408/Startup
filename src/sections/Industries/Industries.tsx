import { useState } from 'react'
import './Industries.css'

const DOMAINS = [
  {
    num: '01',
    name: 'STARTUPS',
    focus: 'Zero-to-one velocity and scalable architecture',
    description:
      'Translating ambiguous product theses into resilient, production-ready MVPs that earn initial commercial traction without requiring a rewrite at scale.',
  },
  {
    num: '02',
    name: 'SMES',
    focus: 'Operational leverage and tool modernization',
    description:
      'Replacing fragmented spreadsheets and brittle legacy software with bespoke internal systems that multiply team throughput.',
  },
  {
    num: '03',
    name: 'INTERNAL OPERATIONS',
    focus: 'Custom administrative cockpits and automation',
    description:
      'Engineering unified control planes, permissioned role management, and automated workflow triage to eradicate administrative toil.',
  },
  {
    num: '04',
    name: 'RETAIL & COMMERCE',
    focus: 'Editorial storytelling meets high-conversion checkout',
    description:
      'Designing bespoke commerce architectures that reflect luxury craftsmanship without sacrificing sub-second page performance.',
  },
  {
    num: '05',
    name: 'FINANCE & AUDIT',
    focus: 'Deterministic ledgers and transaction integrity',
    description:
      'Building strict type-safe APIs, auditable database schemas, and low-latency reconciliation streams for high-stakes flows.',
  },
  {
    num: '06',
    name: 'MANUFACTURING & LOGISTICS',
    focus: 'Real-time telemetry and distributed dispatch',
    description:
      'Integrating live IoT sensor streams, route rebalancing engines, and reactive operational dashboards for cross-border operations.',
  },
  {
    num: '07',
    name: 'EDUCATION & KNOWLEDGE',
    focus: 'Structured knowledge retrieval and tactile learning',
    description:
      'Crafting interactive exploratory interfaces and semantic retrieval engines that turn dense repositories into engaging tools.',
  },
]

export function Industries() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0)

  return (
    <section className="industries" id="industries" aria-label="Problems We Are Interested in Solving">
      <div className="container">
        {/* Header */}
        <div className="industries__header">
          <div className="industries__meta">
            <span className="label text-accent">07 / DOMAINS & SECTORS</span>
            <span className="label font-mono industries__tag">
              AREAS OF EXPLORATION
            </span>
          </div>
          <h2 className="industries__headline font-display">
            Problems we’re<br />
            <span className="italic font-normal">interested in solving.</span>
          </h2>
          <p className="industries__sub font-sans">
            Rather than claiming manufactured pedigree across every sector, we bring fundamental product engineering rigor to domains facing acute operational complexity.
          </p>
        </div>

        {/* Editorial Domain List */}
        <div className="industries__list">
          {DOMAINS.map((domain, idx) => {
            const isActive = activeIdx === idx
            return (
              <div
                key={domain.name}
                className={`industries__row ${isActive ? 'industries__row--active' : ''}`}
                onMouseEnter={() => setActiveIdx(idx)}
              >
                <div className="industries__row-left">
                  <span className="industries__num font-mono">{domain.num}</span>
                  <h3 className="industries__name font-sans">{domain.name}</h3>
                </div>

                <div className="industries__row-center">
                  <span className="industries__focus label font-mono">
                    {domain.focus}
                  </span>
                </div>

                <div className="industries__row-right">
                  <p className="industries__desc font-sans">
                    {domain.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
