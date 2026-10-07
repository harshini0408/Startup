import type { ProcessStep } from '@/types'

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description:
      'We deconstruct the core operational problem, technical constraints, and end-user behavior before writing a single line of code.',
    deliverables: [
      'Problem definition workshop',
      'Technical feasibility audit',
      'System dependency map',
      'Scope & timeline blueprint',
    ],
  },
  {
    id: 'define',
    number: '02',
    title: 'Define',
    description:
      'We establish precise product specifications, data models, state architectures, and engineering criteria for every user journey.',
    deliverables: [
      'Functional specification document',
      'Database schema & API contracts',
      'Information architecture',
      'Sprint release milestone plan',
    ],
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    description:
      'From architectural wireframes to interactive high-fidelity prototypes and design systems. We craft interfaces that feel inevitable.',
    deliverables: [
      'Design system & component library',
      'High-fidelity responsive UI',
      'Micro-interaction choreography',
      'Clickable motion prototype',
    ],
  },
  {
    id: 'build',
    number: '04',
    title: 'Build',
    description:
      'Rigorous production engineering with modern frameworks, type-safe APIs, clean architecture, and bi-weekly working demos.',
    deliverables: [
      'Type-safe frontend application',
      'Scalable backend services & APIs',
      'Database migrations & indexes',
      'Comprehensive unit & E2E tests',
    ],
  },
  {
    id: 'validate',
    number: '05',
    title: 'Validate',
    description:
      'Rigorous stress testing across edge cases, concurrency loads, security posture, accessibility compliance, and cross-browser performance.',
    deliverables: [
      'Automated load & benchmark audit',
      'Lighthouse >95 performance score',
      'WCAG AA accessibility validation',
      'User acceptance verification',
    ],
  },
  {
    id: 'ship',
    number: '06',
    title: 'Ship',
    description:
      'Zero-downtime automated deployment to production cloud infrastructure with telemetry, alerting, and error monitoring.',
    deliverables: [
      'CI/CD deployment automation',
      'Cloud infrastructure provisioning',
      'Real-time APM & telemetry logging',
      'Zero-downtime production cutover',
    ],
  },
  {
    id: 'evolve',
    number: '07',
    title: 'Evolve',
    description:
      'Continuous iteration informed by telemetry, feature expansion, and full documentation handover to ensure long-term self-sufficiency.',
    deliverables: [
      'Architecture documentation & schemas',
      'Engineering onboarding walkthroughs',
      'Post-launch SLA warranty support',
      'Iterative roadmap advisory',
    ],
  },
]
