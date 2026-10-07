import type { Article } from '@/types'

export const articles: Article[] = [
  {
    slug: 'architecture-of-inevitability',
    title: 'The Architecture of Inevitability: Why Simple Interfaces Demand Brutal Technical Discipline',
    category: 'Engineering',
    author: {
      name: 'Ignite Architecture Team',
      role: 'Founding Engineering Practice',
    },
    publishedAt: 'October 2025',
    readingTime: '6 min read',
    description:
      'How hidden state complexity, compile-time strictness, and reactive actor loops create digital products that feel effortless on the surface.',
    content: [
      'When an interface feels intuitive, it is almost never because the underlying problem was simple. It is because the engineering team made deliberate, painful architectural trade-offs to shield the user from chaotic real-world states.',
      'In traditional web applications, developers frequently allow database schemas and API idiosyncrasies to leak directly onto the UI canvas. A user clicks a button, a spinner freezes the viewport, a network timeout displays an unhandled 500 alert, and the illusion of software as a physical tool evaporates.',
      'At Ignite, we build toward software that feels inevitable. This demands optimistic UI updates backed by local state queues, type-safe API contracts that guarantee boundary integrity, and background re-validation mechanisms that eliminate jarring page flickers.',
      'Simplicity on the surface is not the absence of complexity; it is the mastery of it.',
    ],
  },
  {
    slug: 'ai-without-the-theatre',
    title: 'AI Without the Theatre: Deploying LLMs as Deterministic Engineering Primitives',
    category: 'AI',
    author: {
      name: 'Ignite Systems Group',
      role: 'Intelligence Practice',
    },
    publishedAt: 'September 2025',
    readingTime: '8 min read',
    description:
      'Moving past superficial conversational novelty toward strict JSON schemas, hybrid vector retrieval, and autonomous multi-agent validation loops.',
    content: [
      'The majority of generative AI applications deployed today are presentation theatre. A floating chat widget in the corner of a dashboard asking the user to formulate prompt engineering queries is rarely the right interface.',
      'Real leverage occurs when artificial intelligence is integrated deterministically into core product workflows. The user should not have to ask the AI to summarize an operational invoice; the platform should automatically extract, cross-reference against bank deposits, and highlight anomalies before the user even opens the record.',
      'Achieving this requires treating language models as probabilistic transformation functions constrained by strict JSON schema validators, deterministic fallback rules, and real-time execution graphs.',
      'We use AI when it multiplies operational throughput—never simply because it is fashionable.',
    ],
  },
  {
    slug: 'death-of-the-figma-handoff',
    title: 'The Death of the Figma Handoff: Designing Products in the Medium of Code',
    category: 'Design',
    author: {
      name: 'Ignite Design Practice',
      role: 'Product Architecture',
    },
    publishedAt: 'August 2025',
    readingTime: '5 min read',
    description:
      'Why extraordinary software emerges when product designers understand database schemas and engineers obsess over spatial typography.',
    content: [
      'For the past decade, digital agencies established an artificial assembly line: researchers produce PDFs, designers draw static vector frames in Figma, and engineers receive static links with tickets instructing them to guess the animations and edge cases.',
      'This assembly line produces mediocre software. Static frames cannot communicate how an interface responds when a network latency spikes to 800ms, or how typography scales when a translated German string is twice as long as the mock English label.',
      'When designers understand reactive component lifecycles, and engineers obsess over typography tokens and spatial pacing, the handoff vanishes. Iteration happens directly in the real medium of browsers and tactile prototypes.',
      'That is why Ignite stays small and operates as an integrated studio.',
    ],
  },
]
