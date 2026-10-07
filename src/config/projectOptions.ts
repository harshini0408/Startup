// ============================================================
// PROJECT & INQUIRY OPTIONS CONFIGURATION
// Centralized configuration for budget, timeline, service, and stage options.
// Easily configure currency presentation for domestic (INR) or international (USD) clients.
// ============================================================

export interface BudgetTier {
  id: string
  label: string
  description?: string
  currency: 'USD' | 'INR'
  min?: number
  max?: number
}

export const CURRENCY_CONFIG = {
  defaultCurrency: 'USD' as 'USD' | 'INR',
  availableCurrencies: ['USD', 'INR'] as const,
}

export const BUDGET_OPTIONS: BudgetTier[] = [
  {
    id: 'mvp',
    label: '$15,000 – $30,000 (Focused MVP)',
    description: 'Rapid sprint to validated functional MVP',
    currency: 'USD',
    min: 15000,
    max: 30000,
  },
  {
    id: 'commercial',
    label: '$30,000 – $60,000 (Commercial Build)',
    description: 'Production-ready web application or SaaS platform',
    currency: 'USD',
    min: 30000,
    max: 60000,
  },
  {
    id: 'scale',
    label: '$60,000 – $120,000 (Full-Scale System)',
    description: 'Comprehensive multi-service platform with AI automation',
    currency: 'USD',
    min: 60000,
    max: 120000,
  },
  {
    id: 'enterprise',
    label: '$120,000+ (Enterprise Architecture)',
    description: 'Complex distributed system or proprietary AI core',
    currency: 'USD',
    min: 120000,
  },
  {
    id: 'advisory',
    label: "Not sure yet / Let's discuss scope",
    description: 'Scope exploration & architectural discovery',
    currency: 'USD',
  },
]

export const CONTACT_BUDGET_OPTIONS = [
  '$20,000 – $40,000',
  '$40,000 – $75,000',
  '$75,000 – $150,000',
  '$150,000+',
  "Flexible / Let's discuss scope",
] as const

export const SERVICE_OPTIONS = [
  'Website',
  'Web application',
  'SaaS',
  'UI/UX',
  'AI solution',
  'Automation',
  'Backend/API',
  'Recommendation Systems',
  'Chatbots',
  'Not sure yet / Need discovery',
] as const

export const STAGE_OPTIONS = [
  'Idea',
  'Requirements ready',
  'Design ready',
  'Existing product',
  'Need modernization',
  'Not sure yet',
] as const

export const PRIORITY_OPTIONS = [
  'Launch quickly',
  'Improve UX',
  'Automate work',
  'Integrate AI',
  'Build scalable product',
  'Other / Open to suggestion',
] as const

export const TIMELINE_OPTIONS = [
  'ASAP / Immediate start',
  '1–2 months',
  '3–6 months',
  'Flexible / Discovery timeframe',
  'Not decided yet',
] as const

export const CONTACT_PROJECT_TYPES = [
  'Web Application',
  'SaaS Platform',
  'UI/UX Redesign',
  'AI / Agentic Integration',
  'Recommendation Systems',
  'Chatbots',
  'MVP Build',
  'Backend & Infrastructure',
  'Not sure yet / Discovery Call',
  'Other Bespoke Requirement',
] as const
