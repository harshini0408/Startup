import { useState, useMemo, useEffect } from 'react'
import { articles } from '@/data/articles'
import { ArrowLink } from '@/components/ui/Buttons'
import type { Article } from '@/types'
import './Insights.css'

const CATEGORIES = ['ALL', 'Engineering', 'Design', 'AI', 'Product', 'Startup'] as const

export function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedArticle) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedArticle])

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'ALL') return articles
    return articles.filter((a) => a.category.toUpperCase() === activeCategory.toUpperCase())
  }, [activeCategory])

  return (
    <div className="insights-page">
      <div className="container">
        {/* Header */}
        <header className="insights-hero">
          <div className="insights-hero__meta">
            <span className="label text-accent">05 — STUDIO ESSAYS</span>
            <span className="label font-mono text-muted">PERSPECTIVES & PAPERS</span>
          </div>

          <h1 className="insights-hero__headline font-display">
            Thoughts on<br />
            <span className="italic font-normal">engineering</span> and craft.
          </h1>

          <p className="insights-hero__sub font-sans">
            Candid writing on product design, architecture choices, real-world AI implementation, and independent studio philosophy.
          </p>

          {/* Category Filters */}
          <div className="insights-filters" role="tablist" aria-label="Insights category filter">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  className={`insights-filter-btn font-mono ${isActive ? 'insights-filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={isActive}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </header>

        {/* Article Cards Grid */}
        <div className="insights-grid">
          {filteredArticles.map((article, idx) => {
            const num = (idx + 1).toString().padStart(2, '0')
            return (
              <article key={article.slug} className="insight-card">
                <div className="insight-card__meta font-mono">
                  <span className="text-accent">{article.category}</span>
                  <span className="text-muted">·</span>
                  <span className="text-muted">{article.readingTime}</span>
                  <span className="insight-card__num text-muted ml-auto">[{num}]</span>
                </div>

                <h2 className="insight-card__title font-display">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="insight-card__title-btn"
                  >
                    {article.title}
                  </button>
                </h2>

                <p className="insight-card__desc font-sans">
                  {article.description}
                </p>

                <div className="insight-card__footer font-mono">
                  <span className="insight-card__author label text-muted">
                    BY {article.author.name.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="insight-card__read-link"
                  >
                    READ ESSAY →
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Read Article Modal / Drawer */}
        {selectedArticle && (
          <div className="article-modal-backdrop" onClick={() => setSelectedArticle(null)}>
            <div
              className="article-modal"
              role="dialog"
              aria-modal="true"
              aria-label={selectedArticle.title}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="article-modal__header">
                <div className="article-modal__meta font-mono">
                  <span className="text-accent">{selectedArticle.category}</span>
                  <span className="text-muted">· {selectedArticle.publishedAt}</span>
                  <span className="text-muted">· {selectedArticle.readingTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="article-modal__close font-mono"
                  aria-label="Close article"
                >
                  ✕ CLOSE [ESC]
                </button>
              </div>

              <h2 className="article-modal__title font-display">
                {selectedArticle.title}
              </h2>

              <p className="article-modal__byline font-mono label text-muted">
                WRITTEN BY {selectedArticle.author.name.toUpperCase()} · {selectedArticle.author.role}
              </p>

              <div className="article-modal__content font-sans">
                {selectedArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="article-modal__footer">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="article-modal__footer-btn font-mono"
                >
                  ← BACK TO ALL ARTICLES
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Insights Footer Box */}
        <section className="insights-cta">
          <div className="insights-cta__box">
            <span className="label font-mono text-accent">OPEN EXCHANGE</span>
            <h2 className="insights-cta__title font-display">
              Have thoughts on our technical approach?
            </h2>
            <p className="insights-cta__desc font-sans">
              We frequently write open architectural reflections. If you are solving similar problems in production, we would love to exchange perspectives.
            </p>
            <ArrowLink to="/contact" className="insights-cta__btn">
              GET IN TOUCH
            </ArrowLink>
          </div>
        </section>
      </div>
    </div>
  )
}
