import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from 'react'
import { submitQuote } from '@/lib/api'
import { trackEvent } from '@/lib/analytics'
import {
  SERVICE_OPTIONS,
  STAGE_OPTIONS,
  PRIORITY_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
} from '@/config/projectOptions'
import './Quote.css'

interface WizardState {
  services: string[]
  currentStage: string
  priorities: string[]
  budget: string
  timeline: string
  name: string
  company: string
  email: string
  phone: string
  description: string
  website_url: string // Honeypot field
}

const STORAGE_KEY = 'ignite_quote_draft_v1'

const INITIAL_STATE: WizardState = {
  services: ['Web application'],
  currentStage: 'Idea',
  priorities: ['Build scalable product'],
  budget: BUDGET_OPTIONS[1].label,
  timeline: TIMELINE_OPTIONS[1],
  name: '',
  company: '',
  email: '',
  phone: '',
  description: '',
  website_url: '',
}

export function QuotePage() {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...INITIAL_STATE, ...parsed, website_url: '' }
      }
    } catch {
      // Ignore sessionStorage read errors
    }
    return INITIAL_STATE
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [referenceId, setReferenceId] = useState('')

  const formStartTimeRef = useRef<number>(0)
  const hasTrackedStartRef = useRef<boolean>(false)
  const successCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    formStartTimeRef.current = Date.now()
  }, [])

  // Persist draft in sessionStorage whenever state changes (unless already submitted)
  useEffect(() => {
    if (!submitted) {
      try {
        const { website_url: _, ...stateToSave } = state
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
      } catch {
        // Ignore quota/access errors
      }
    }
  }, [state, submitted])

  // Focus success card on submission
  useEffect(() => {
    if (submitted && successCardRef.current) {
      successCardRef.current.focus()
    }
  }, [submitted])

  const toggleService = (s: string) => {
    if (!hasTrackedStartRef.current) {
      hasTrackedStartRef.current = true
      trackEvent('quote_started')
    }
    setState((prev) => {
      const exists = prev.services.includes(s)
      return {
        ...prev,
        services: exists ? prev.services.filter((x) => x !== s) : [...prev.services, s],
      }
    })
  }

  const togglePriority = (p: string) => {
    setState((prev) => {
      const exists = prev.priorities.includes(p)
      return {
        ...prev,
        priorities: exists ? prev.priorities.filter((x) => x !== p) : [...prev.priorities, p],
      }
    })
  }

  const handleNext = () => {
    setError('')
    if (step === 1 && state.services.length === 0) {
      setError('Please select at least one requirement.')
      return
    }
    if (step === 2 && !state.currentStage) {
      setError('Please indicate your current stage.')
      return
    }
    if (step === 3 && state.priorities.length === 0) {
      setError('Please select at least one core priority.')
      return
    }
    if (step === 4 && !state.budget) {
      setError('Please select an estimated budget range.')
      return
    }
    if (step === 5 && !state.timeline) {
      setError('Please select your target timeline.')
      return
    }

    trackEvent('quote_step_completed', { step_number: step })
    setStep((prev) => Math.min(6, prev + 1))
  }

  const handlePrev = () => {
    setError('')
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedName = state.name.trim()
    const trimmedEmail = state.email.trim()
    const trimmedCompany = state.company.trim()

    if (!trimmedName || trimmedName.length < 2) {
      setError('Please provide your name (at least 2 characters).')
      return
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please provide a valid work email address.')
      return
    }

    setSubmitting(true)

    try {
      const response = await submitQuote({
        services: state.services,
        project_stage: state.currentStage,
        priorities: state.priorities,
        budget_range: state.budget,
        timeline: state.timeline,
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        phone: state.phone.trim() || undefined,
        project_description: state.description.trim() || undefined,
        website_url: state.website_url, // Honeypot
        form_start_time: formStartTimeRef.current,
      })

      if (response.success) {
        setSubmitted(true)
        setReferenceId(response.reference_id || '')
        // Clean draft storage after successful submission
        try {
          sessionStorage.removeItem(STORAGE_KEY)
        } catch {
          // Ignore
        }
        trackEvent('quote_submitted', {
          budget: state.budget,
          stage: state.currentStage,
        })
      } else {
        setError(
          response.message || 'Something interrupted the submission. Your brief is still here — please try again.'
        )
        trackEvent('quote_failed')
      }
    } catch {
      setError('Something interrupted the submission. Your brief is still here — please try again.')
      trackEvent('quote_failed')
    } finally {
      setSubmitting(false)
    }
  }

  const resetWizard = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
    setState(INITIAL_STATE)
    setStep(1)
    setSubmitted(false)
    setError('')
    setReferenceId('')
    formStartTimeRef.current = Date.now()
    hasTrackedStartRef.current = false
  }

  const progressPercent = Math.round((step / 6) * 100)

  return (
    <div className="quote-page">
      <div className="container">
        {/* Header */}
        <header className="quote-hero">
          <div className="quote-hero__meta">
            <span className="label text-accent font-mono">05 — PROJECT SCOPING</span>
            <span className="label font-mono text-muted">GUIDED ARCHITECTURAL CONSULTATION</span>
          </div>

          <h1 className="quote-hero__title font-display">
            Scope your<br />
            <span className="italic font-normal">project roadmap</span><br />
            with precision.
          </h1>

          <p className="quote-hero__sub font-sans">
            Answer 6 targeted technical questions to generate a tailored engagement brief, scope estimation, and architectural discussion starting point.
          </p>

          {/* Progress Bar */}
          <div className="quote-progress-wrap">
            <div className="quote-progress-bar">
              <div
                className="quote-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="quote-progress-labels font-mono">
              <span className={step >= 1 ? 'text-accent' : 'text-muted'}>01 SERVICES</span>
              <span className={step >= 2 ? 'text-accent' : 'text-muted'}>02 STAGE</span>
              <span className={step >= 3 ? 'text-accent' : 'text-muted'}>03 PRIORITIES</span>
              <span className={step >= 4 ? 'text-accent' : 'text-muted'}>04 BUDGET</span>
              <span className={step >= 5 ? 'text-accent' : 'text-muted'}>05 TIMELINE</span>
              <span className={step >= 6 ? 'text-accent' : 'text-muted'}>06 DETAILS</span>
            </div>
          </div>
        </header>

        {/* Wizard Card */}
        <div className="quote-wizard-wrap">
          {submitted ? (
            <div
              className="quote-success"
              role="alert"
              tabIndex={-1}
              ref={successCardRef}
            >
              <span className="quote-success__badge font-mono text-accent">✓ PROJECT BRIEF RECEIVED</span>
              <h2 className="quote-success__title font-display">
                We’re analyzing your brief, {state.name}.
              </h2>
              <p className="quote-success__desc font-sans">
                Your brief is with us. Our engineering team has received your project parameters for <strong>{state.company}</strong> ({state.services.join(', ')}). We will review the technical requirements and reply directly to <strong>{state.email}</strong>.
              </p>

              {referenceId && (
                <div
                  style={{
                    margin: '1.25rem 0',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span className="label font-mono text-muted">REFERENCE ID:</span>
                  <span className="font-mono text-accent" style={{ letterSpacing: '0.05em' }}>
                    {referenceId}
                  </span>
                </div>
              )}

              <div className="quote-success__summary font-mono">
                <span className="label text-muted">SUMMARY OF YOUR SELECTION:</span>
                <ul>
                  <li>Services: {state.services.join(', ')}</li>
                  <li>Stage: {state.currentStage}</li>
                  <li>Priorities: {state.priorities.join(', ')}</li>
                  <li>Budget: {state.budget}</li>
                  <li>Timeline: {state.timeline}</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={resetWizard}
                className="quote-success__reset font-mono"
              >
                SUBMIT ANOTHER BRIEF →
              </button>
            </div>
          ) : (
            <div className="quote-wizard">
              {/* STEP 01 */}
              {step === 1 && (
                <div className="quote-step">
                  <span className="label text-accent font-mono">STEP 01</span>
                  <h2 className="quote-step__title font-display">
                    What do you need to build?
                  </h2>
                  <p className="quote-step__desc font-sans">
                    Select all that apply to your current roadmap.
                  </p>

                  <div className="quote-options-grid">
                    {SERVICE_OPTIONS.map((opt) => {
                      const selected = state.services.includes(opt)
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`quote-option-btn font-mono ${selected ? 'quote-option-btn--selected' : ''}`}
                          onClick={() => toggleService(opt)}
                        >
                          <span className="quote-option-check">{selected ? '✓' : '+'}</span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 02 */}
              {step === 2 && (
                <div className="quote-step">
                  <span className="label text-accent font-mono">STEP 02</span>
                  <h2 className="quote-step__title font-display">
                    Where is the project today?
                  </h2>
                  <p className="quote-step__desc font-sans">
                    Help us understand your existing specifications.
                  </p>

                  <div className="quote-options-grid">
                    {STAGE_OPTIONS.map((opt) => {
                      const selected = state.currentStage === opt
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`quote-option-btn font-mono ${selected ? 'quote-option-btn--selected' : ''}`}
                          onClick={() => setState({ ...state, currentStage: opt })}
                        >
                          <span className="quote-option-check">{selected ? '●' : '○'}</span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 03 */}
              {step === 3 && (
                <div className="quote-step">
                  <span className="label text-accent font-mono">STEP 03</span>
                  <h2 className="quote-step__title font-display">
                    What matters most for success?
                  </h2>
                  <p className="quote-step__desc font-sans">
                    Select your core architectural priorities.
                  </p>

                  <div className="quote-options-grid">
                    {PRIORITY_OPTIONS.map((opt) => {
                      const selected = state.priorities.includes(opt)
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`quote-option-btn font-mono ${selected ? 'quote-option-btn--selected' : ''}`}
                          onClick={() => togglePriority(opt)}
                        >
                          <span className="quote-option-check">{selected ? '✓' : '+'}</span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 04 */}
              {step === 4 && (
                <div className="quote-step">
                  <span className="label text-accent font-mono">STEP 04</span>
                  <h2 className="quote-step__title font-display">
                    What is your planned budget?
                  </h2>
                  <p className="quote-step__desc font-sans">
                    Enables us to recommend realistic architectures and milestone scopes.
                  </p>

                  <div className="quote-options-list">
                    {BUDGET_OPTIONS.map((tier) => {
                      const selected = state.budget === tier.label
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          className={`quote-option-btn font-mono ${selected ? 'quote-option-btn--selected' : ''}`}
                          onClick={() => setState({ ...state, budget: tier.label })}
                        >
                          <span className="quote-option-check">{selected ? '●' : '○'}</span>
                          <span>{tier.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 05 */}
              {step === 5 && (
                <div className="quote-step">
                  <span className="label text-accent font-mono">STEP 05</span>
                  <h2 className="quote-step__title font-display">
                    When do you need to launch?
                  </h2>
                  <p className="quote-step__desc font-sans">
                    Select your target deployment milestone.
                  </p>

                  <div className="quote-options-list">
                    {TIMELINE_OPTIONS.map((opt) => {
                      const selected = state.timeline === opt
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`quote-option-btn font-mono ${selected ? 'quote-option-btn--selected' : ''}`}
                          onClick={() => setState({ ...state, timeline: opt })}
                        >
                          <span className="quote-option-check">{selected ? '●' : '○'}</span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* STEP 06 */}
              {step === 6 && (
                <form onSubmit={handleSubmit} className="quote-step quote-form" noValidate>
                  {/* Honeypot field (hidden from genuine users) */}
                  <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                    <label htmlFor="quote_website_url">Do not fill this</label>
                    <input
                      id="quote_website_url"
                      name="quote_website_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={state.website_url}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setState((prev) => ({ ...prev, website_url: e.target.value }))
                      }
                    />
                  </div>

                  <span className="label text-accent font-mono">STEP 06</span>
                  <h2 className="quote-step__title font-display">
                    Where should we send your roadmap?
                  </h2>
                  <p className="quote-step__desc font-sans">
                    Provide your contact details so our founding engineering team can respond.
                  </p>

                  <div className="quote-form__grid">
                    <div className="quote-field">
                      <label className="quote-field__label font-mono">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                        className="quote-input font-sans"
                      />
                    </div>

                    <div className="quote-field">
                      <label className="quote-field__label font-mono">WORK EMAIL *</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@venture.com"
                        value={state.email}
                        onChange={(e) => setState({ ...state, email: e.target.value })}
                        className="quote-input font-sans"
                      />
                    </div>

                    <div className="quote-field">
                      <label className="quote-field__label font-mono">COMPANY / VENTURE (OPTIONAL)</label>
                      <input
                        type="text"
                        placeholder="Acme Labs (or stealth)"
                        value={state.company}
                        onChange={(e) => setState({ ...state, company: e.target.value })}
                        className="quote-input font-sans"
                      />
                    </div>

                    <div className="quote-field">
                      <label className="quote-field__label font-mono">PHONE (OPTIONAL)</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={state.phone}
                        onChange={(e) => setState({ ...state, phone: e.target.value })}
                        className="quote-input font-sans"
                      />
                    </div>
                  </div>

                  <div className="quote-field">
                    <label className="quote-field__label font-mono">
                      ADDITIONAL CONTEXT (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any specific architectural requirements, current tech stack, or reference applications..."
                      value={state.description}
                      onChange={(e) => setState({ ...state, description: e.target.value })}
                      className="quote-textarea font-sans"
                    />
                  </div>

                  {error && <p className="quote-error font-mono">{error}</p>}

                  <div className="quote-actions">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={submitting}
                      className="quote-btn-prev font-mono"
                    >
                      ← PREVIOUS
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="quote-btn-submit font-mono"
                    >
                      {submitting ? 'TRANSMITTING...' : 'SUBMIT PROJECT BRIEF →'}
                    </button>
                  </div>
                </form>
              )}

              {/* Step Navigation Controls for Steps 1-5 */}
              {step < 6 && (
                <div className="quote-actions-wrap">
                  {error && <p className="quote-error font-mono">{error}</p>}
                  <div className="quote-actions">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="quote-btn-prev font-mono"
                      >
                        ← PREVIOUS
                      </button>
                    ) : <div />}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="quote-btn-next font-mono"
                    >
                      CONTINUE →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
