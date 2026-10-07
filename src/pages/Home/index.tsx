import { Hero } from '@/sections/Hero/Hero'
import { Capabilities } from '@/sections/Capabilities/Capabilities'
import { SelectedWork } from '@/sections/SelectedWork/SelectedWork'
import { FeaturedCaseStudy } from '@/sections/FeaturedCaseStudy/FeaturedCaseStudy'
import { WhyUs } from '@/sections/WhyUs/WhyUs'
import { Process } from '@/sections/Process/Process'
import { Technology } from '@/sections/Technology/Technology'
import { Industries } from '@/sections/Industries/Industries'
import { AboutTeaser } from '@/sections/AboutTeaser/AboutTeaser'
import { FaqSection } from '@/sections/FaqSection/FaqSection'
import { FinalCta } from '@/sections/FinalCta/FinalCta'

export function HomePage() {
  return (
    <>
      {/* SECTION 01: AMBITION — Editorial Hero with experimental typography */}
      <Hero />

      {/* SECTION 03: WHAT WE BUILD — Capabilities with interactive telemetry */}
      <Capabilities />

      {/* SECTION 04: PROOF — 4 Massive Selected Work showcases */}
      <SelectedWork />

      {/* SECTION 05: FEATURED CASE STUDY — Deep-dive mini-story */}
      <FeaturedCaseStudy />

      {/* SECTION 06: WHY IT MATTERS — Real Working Principles */}
      <WhyUs />

      {/* SECTION 07: HOW WE BUILD — 7-Stage Execution Process */}
      <Process />

      {/* SECTION 08: TECHNOLOGY — Curated Stack Architecture */}
      <Technology />

      {/* SECTION 09: DOMAINS — Problems We Are Interested in Solving */}
      <Industries />

      {/* SECTION 10: WHO WE ARE — Studio Ethos & Workstation */}
      <AboutTeaser />

      {/* SECTION 11: CLARITY — FAQ Accordion */}
      <FaqSection />

      {/* SECTION 12: START A PROJECT — Monumental Final CTA */}
      <FinalCta />
    </>
  )
}
