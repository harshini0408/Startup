import { Hero } from '@/sections/Hero/Hero'
import { Capabilities } from '@/sections/Capabilities/Capabilities'
import { WhyUs } from '@/sections/WhyUs/WhyUs'
import { Technology } from '@/sections/Technology/Technology'
import { Industries } from '@/sections/Industries/Industries'
import { FaqSection } from '@/sections/FaqSection/FaqSection'
import { FinalCta } from '@/sections/FinalCta/FinalCta'

export function HomePage() {
  return (
    <>
      {/* SECTION 01: AMBITION — Editorial Hero with experimental typography */}
      <Hero />

      {/* SECTION 02: WHAT WE BUILD — Capabilities with interactive telemetry */}
      <Capabilities />

      {/* SECTION 03: WHY IT MATTERS — Real Working Principles */}
      <WhyUs />

      {/* SECTION 04: TECHNOLOGY — Curated Stack Architecture */}
      <Technology />

      {/* SECTION 05: DOMAINS — Problems We Are Interested in Solving */}
      <Industries />

      {/* SECTION 06: CLARITY — FAQ Accordion */}
      <FaqSection />

      {/* SECTION 07: START A PROJECT — Monumental Final CTA */}
      <FinalCta />
    </>
  )
}
