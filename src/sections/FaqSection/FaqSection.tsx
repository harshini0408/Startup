import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqs } from '@/data/faqs'
import './FaqSection.css'

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="container">
        {/* Section Header */}
        <div className="faq-section__header">
          <div className="faq-section__meta">
            <span className="label text-accent">QUESTIONS & ANSWERS</span>
            <span className="label font-mono faq-section__tag">FAQ [08]</span>
          </div>
          <h2 className="faq-section__headline font-display">
            Clarity before<br />
            <span className="italic font-normal">we write</span> a line of code.
          </h2>
        </div>

        {/* Accordion list */}
        <div className="faq-section__list">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id
            const num = (idx + 1).toString().padStart(2, '0')

            return (
              <div
                key={faq.id}
                className={`faq-section__item ${isOpen ? 'faq-section__item--open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-section__trigger"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="faq-section__trigger-left">
                    <span className="faq-section__num font-mono">{num}</span>
                    <h3 className="faq-section__question font-sans">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="faq-section__trigger-right">
                    {faq.category && (
                      <span className="faq-section__cat label font-mono">
                        {faq.category}
                      </span>
                    )}
                    <span className="faq-section__icon font-mono" aria-hidden="true">
                      {isOpen ? '—' : '+'}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-section__answer-wrap"
                    >
                      <div className="faq-section__answer font-sans">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
