export interface Service {
  id: string
  number: string
  title: string
  tagline?: string
  description: string
  problemSolved?: string
  whatWeProvide?: string
  deliverables: string[]
  technologies: string[]
  exampleUseCases?: string[]
  capabilities?: string[]
  featured?: boolean
}

export interface CaseStudySection {
  title: string
  subtitle?: string
  content: string
  points?: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  client: string
  category: string
  tags: string[]
  year: string
  description: string
  oneLineOutcome?: string
  industry?: string
  challenge?: string
  solution?: string
  outcome?: string
  context?: string
  problem?: string
  approach?: string
  experience?: string
  engineering?: string
  keyFeatures?: { title: string; desc: string }[]
  result?: string
  coverImage?: string
  images?: string[]
  featured?: boolean
  comingSoon?: boolean
  nextSlug?: string
  workType?: 'STUDIO PROTOTYPE' | 'STUDIO EXPLORATION' | 'PRODUCT EXPLORATION' | 'INTERNAL R&D' | 'CLIENT PROJECT'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    dribbble?: string
  }
}

export interface Faq {
  id: string
  question: string
  answer: string
  category?: string
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  clientReceives?: string
  deliverables?: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  category: 'Engineering' | 'Design' | 'AI' | 'Product' | 'Startup'
  author: {
    name: string
    role: string
  }
  publishedAt: string
  readingTime: string
  coverImage?: string
  content: string[]
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}
