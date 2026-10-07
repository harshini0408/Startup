import { useState } from 'react'
import './Technology.css'

interface TechCategory {
  id: string
  title: string
  number: string
  description: string
  items: { name: string; note: string }[]
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    number: '01',
    description: 'Predictable state, sub-second renders, and fluid micro-choreography.',
    items: [
      { name: 'React', note: 'Component architecture' },
      { name: 'Next.js', note: 'SSR & edge caching' },
      { name: 'TypeScript', note: 'Strict compile-time safety' },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND',
    number: '02',
    description: 'High-throughput event loops, clean API contracts, and async concurrency.',
    items: [
      { name: 'Python', note: 'AI workflows & data processing' },
      { name: 'FastAPI', note: 'Type-safe asynchronous APIs' },
      { name: 'Node.js', note: 'Real-time websocket pipelines' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & AGENTS',
    number: '03',
    description: 'Deterministic intelligence integrated directly into core product flows.',
    items: [
      { name: 'LLM APIs', note: 'Structured JSON reasoning' },
      { name: 'RAG Systems', note: 'Domain-specific semantic search' },
      { name: 'Agent Frameworks', note: 'Multi-step autonomous execution' },
      { name: 'Vector Search', note: 'Sub-10ms embedding lookup' },
    ],
  },
  {
    id: 'data',
    title: 'DATA',
    number: '04',
    description: 'ACID compliance, relational integrity, and ultra-fast in-memory caching.',
    items: [
      { name: 'PostgreSQL', note: 'Primary relational store' },
      { name: 'SQLite', note: 'Embedded & local-first states' },
      { name: 'Redis', note: 'Distributed caching & queues' },
    ],
  },
  {
    id: 'cloud',
    title: 'CLOUD & OPS',
    number: '05',
    description: 'Immutable containerization, zero-downtime deploys, and automated observability.',
    items: [
      { name: 'Docker', note: 'Reproducible runtimes' },
      { name: 'Vercel', note: 'Global edge distribution' },
      { name: 'AWS', note: 'Scalable cloud primitives' },
    ],
  },
]

export function Technology() {
  const [activeCat, setActiveCat] = useState<string | null>(null)

  return (
    <section className="technology" id="technology" aria-label="Technology Stack">
      <div className="container">
        {/* Section Header */}
        <div className="technology__header">
          <div className="technology__meta">
            <span className="label text-accent">06 / TECHNOLOGY</span>
            <span className="label font-mono technology__tag">
              STACK SELECTION
            </span>
          </div>
          <h2 className="technology__headline font-display">
            Tools change.<br />
            <span className="italic font-normal">Good engineering</span><br />
            doesn’t.
          </h2>
          <p className="technology__sub font-sans">
            We don’t treat software like a collage of trendy libraries. We select mature, proven primitives that provide mathematical leverage, operational stability, and effortless maintenance.
          </p>
        </div>

        {/* 5 Stack Columns Grid */}
        <div className="technology__grid">
          {TECH_CATEGORIES.map((cat) => {
            const isHovered = activeCat === cat.id
            return (
              <div
                key={cat.id}
                className={`technology__col ${isHovered ? 'technology__col--active' : ''}`}
                onMouseEnter={() => setActiveCat(cat.id)}
                onMouseLeave={() => setActiveCat(null)}
              >
                <div className="technology__col-header">
                  <span className="technology__col-num font-mono">
                    {cat.number}
                  </span>
                  <h3 className="technology__col-title font-sans">
                    {cat.title}
                  </h3>
                </div>

                <p className="technology__col-desc font-sans">
                  {cat.description}
                </p>

                <ul className="technology__items">
                  {cat.items.map((item) => (
                    <li key={item.name} className="technology__item">
                      <div className="technology__item-top">
                        <span className="technology__item-name font-mono">
                          {item.name}
                        </span>
                        <span className="technology__item-dot" aria-hidden="true" />
                      </div>
                      <span className="technology__item-note label">
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
