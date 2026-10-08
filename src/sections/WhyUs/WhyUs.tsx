import { useState } from 'react'
import './WhyUs.css'

const PRINCIPLES = [
  {
    number: '01',
    title: 'PROBLEM BEFORE TECHNOLOGY',
    statement: 'We choose technology after understanding what needs to change.',
    deepDive:
      'We never force trendy architectures onto simple problems. Every framework, database, and library in your stack is chosen because it directly solves an operational bottleneck.',
  },
  {
    number: '02',
    title: 'DESIGN + ENGINEERING TOGETHER',
    statement: 'Products are stronger when experience and implementation aren’t separated.',
    deepDive:
      'Designers who understand code and engineers who obsess over typography and spatial pacing. No handoff telephone games; just rapid, unified execution.',
  },
  {
    number: '03',
    title: 'BUILT TO SHIP',
    statement: 'Our prototypes aren’t presentation theatre. We design toward deployable products.',
    deepDive:
      'We don’t build disposable mockups that must be thrown away when real development starts. Our architectures are structured for production from day one.',
  },
  {
    number: '04',
    title: 'AI WHERE IT EARNS ITS PLACE',
    statement: 'We use AI when it produces meaningful leverage—not because it is fashionable.',
    deepDive:
      'We integrate LLMs and autonomous agents where they eliminate genuine human grind and deliver deterministic value—not as superficial decorative gimmicks.',
  },
  {
    number: '05',
    title: 'SMALL TEAM. DIRECT COMMUNICATION.',
    statement: 'No unnecessary layers between the people defining the problem and the people building it.',
    deepDive:
      'You collaborate directly with senior product designers and founding engineers. Decisions happen in hours, not across multi-tiered corporate committees.',
  },
]

export function WhyUs() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section className="why-us" id="why-us" aria-label="Why Ignite Principles">
      <div className="container">
        {/* Section Header */}
        <div className="why-us__header">
          <div className="why-us__meta">
            <span className="label text-accent">WHY US</span>
            <span className="label font-mono why-us__ethos-tag">
              WORKING PRINCIPLES
            </span>
          </div>
          <h2 className="why-us__headline font-display">
            Principles that guide<br />
            <span className="italic font-normal">how we engineer</span> software.
          </h2>
        </div>

        {/* Typographic Interactive List */}
        <div className="why-us__list">
          {PRINCIPLES.map((principle, idx) => {
            const isHovered = hoveredIdx === idx
            return (
              <div
                key={principle.number}
                className={`why-us__item ${isHovered ? 'why-us__item--active' : ''}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="why-us__item-top">
                  <span className="why-us__item-num font-mono">
                    {principle.number}
                  </span>
                  <h3 className="why-us__item-title font-sans">
                    {principle.title}
                  </h3>
                </div>

                <div className="why-us__item-body">
                  <p className="why-us__item-statement font-display italic">
                    "{principle.statement}"
                  </p>
                  <p className="why-us__item-deepdive font-sans">
                    {principle.deepDive}
                  </p>
                </div>

                <div className="why-us__line" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
