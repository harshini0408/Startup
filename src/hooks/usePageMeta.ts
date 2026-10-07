import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '@/data/projects'

export function usePageMeta() {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    let title = 'Ignite° — Product Engineering Studio'
    let description = 'We design interfaces, engineer software, and build intelligent systems.'

    if (path === '/services') {
      title = 'Services & Capabilities — Ignite°'
      description = 'What we build when the default isn’t good enough. Full-spectrum digital product engineering.'
    } else if (path === '/work') {
      title = 'Selected Work & Systems — Ignite°'
      description = 'A curated archive of production prototypes, autonomous systems, and digital platforms.'
    } else if (path.startsWith('/work/')) {
      const slug = path.replace('/work/', '')
      const project = projects.find((p) => p.slug === slug)
      if (project) {
        title = `${project.title} — Case Study — Ignite°`
        description = project.oneLineOutcome || project.description
      } else {
        title = 'Case Study — Ignite°'
      }
    } else if (path === '/about') {
      title = 'About the Studio — Ignite°'
      description = 'We’re not interested in ordinary software. Origin, working philosophy, and studio leadership.'
    } else if (path === '/contact') {
      title = 'Start a Conversation — Ignite°'
      description = 'Direct inquiry with founding engineers. Sub-24 hour technical response.'
    } else if (path === '/quote') {
      title = 'Project Scoping & Consultation — Ignite°'
      description = 'Interactive 6-step project scoping wizard and architecture feasibility estimator.'
    } else if (path === '/insights') {
      title = 'Technical Insights & Essays — Ignite°'
      description = 'Candid thoughts on software architecture, design discipline, and real-world AI.'
    } else if (path === '/privacy') {
      title = 'Privacy Policy — Ignite°'
      description = 'Informational privacy policy and data protection practices.'
    } else if (path === '/terms') {
      title = 'Terms of Use — Ignite°'
      description = 'Studio terms of use and commercial engagement standards.'
    }

    document.title = title

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    }

    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location.pathname])
}
