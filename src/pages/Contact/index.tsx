import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react'
import { brand } from '@/config/brand'
import { submitContact } from '@/lib/api'
import { trackEvent } from '@/lib/analytics'
import {
  CONTACT_PROJECT_TYPES,
  CONTACT_BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
} from '@/config/projectOptions'
import './Contact.css'

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  description: string
  website_url: string // Honeypot trap
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: CONTACT_PROJECT_TYPES[0],
  budget: CONTACT_BUDGET_OPTIONS[1],
  timeline: TIMELINE_OPTIONS[1],
  description: '',
  website_url: '',
}

export function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState<string>('')
  const [referenceId, setReferenceId] = useState<string>('')
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const formStartTimeRef = useRef<number>(0)
  const hasInteractedRef = useRef<boolean>(false)
  const successCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    formStartTimeRef.current = Date.now()
  }, [])

  // Focus success card on completion for accessibility
  useEffect(() => {
    if (status === 'success' && successCardRef.current) {
      successCardRef.current.focus()
    }
  }, [status])

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true
      trackEvent('contact_form_started')
    }
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    const trimmedName = form.name.trim()
    const trimmedEmail = form.email.trim()
    const trimmedDescription = form.description.trim()

    if (!trimmedName || trimmedName.length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters).'
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please provide a valid work email address.'
    }
    if (!trimmedDescription || trimmedDescription.length < 15) {
      errs.description = 'Please provide a brief technical context (at least 15 characters).'
    }

    setErrors(errs)

    // Focus the first invalid field
    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0]
      const el = document.getElementById(firstKey)
      if (el) el.focus()
    }

    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setServerError('')

    if (!validate() || status === 'submitting') return

    setStatus('submitting')

    try {
      const response = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        phone: form.phone.trim() || undefined,
        project_type: form.projectType,
        budget_range: form.budget,
        timeline: form.timeline,
        message: form.description.trim(),
        website_url: form.website_url, // Honeypot
        form_start_time: formStartTimeRef.current,
      })

      if (response.success) {
        setStatus('success')
        setReferenceId(response.reference_id || '')
        trackEvent('contact_form_submitted', {
          project_type: form.projectType,
          budget: form.budget,
        })
      } else {
        setStatus('error')
        setServerError(
          response.message || 'Something interrupted the submission. Your brief is still here — please try again.'
        )
        if (response.errors) {
          setErrors((prev) => ({ ...prev, ...response.errors }))
        }
        trackEvent('contact_form_failed')
      }
    } catch {
      setStatus('error')
      setServerError('Something interrupted the submission. Your brief is still here — please try again.')
      trackEvent('contact_form_failed')
    }
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setStatus('idle')
    setServerError('')
    setErrors({})
    setReferenceId('')
    formStartTimeRef.current = Date.now()
    hasInteractedRef.current = false
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <header className="contact-hero">
          <div className="contact-hero__meta">
            <span className="label text-accent">04 — DIRECT INQUIRY</span>
            <span className="label font-mono text-muted">ACCEPTING PARTNERSHIPS</span>
          </div>

          <h1 className="contact-hero__headline font-display">
            Tell us<br />
            <span className="italic font-normal">what you’re</span><br />
            building.
          </h1>

          <p className="contact-hero__sub font-sans">
            Every engagement starts with a direct technical dialogue. No junior sales reps—you’ll hear back directly from a founding engineer or product director.
          </p>
        </header>

        {/* Contact Layout: Form + Studio Info Sidebar */}
        <div className="contact-grid">
          {/* Main Form */}
          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div
                className="contact-success"
                role="alert"
                tabIndex={-1}
                ref={successCardRef}
              >
                <span className="contact-success__icon text-accent font-mono">✓ INQUIRY RECEIVED</span>
                <h2 className="contact-success__title font-display">
                  Thank you, {form.name}.
                </h2>
                <p className="contact-success__body font-sans">
                  Your brief is with us. We have received your submission regarding <strong>{form.company}</strong>. Our founding team is reviewing your requirements and will reach out to <strong>{form.email}</strong> directly with architectural thoughts and next steps.
                </p>

                {referenceId && (
                  <div
                    style={{
                      marginTop: '1.25rem',
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

                <button
                  type="button"
                  onClick={resetForm}
                  className="contact-success__reset font-mono"
                  style={{ marginTop: '1.75rem' }}
                >
                  SUBMIT ANOTHER BRIEF →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Honeypot anti-spam field (hidden from genuine users) */}
                <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website_url">Do not fill this field</label>
                  <input
                    id="website_url"
                    name="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website_url}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setForm((prev) => ({ ...prev, website_url: e.target.value }))
                    }
                  />
                </div>

                {serverError && (
                  <div
                    role="alert"
                    style={{
                      padding: '0.9rem 1.1rem',
                      marginBottom: '1.25rem',
                      background: 'rgba(220, 38, 38, 0.08)',
                      border: '1px solid rgba(220, 38, 38, 0.25)',
                      borderRadius: '4px',
                      color: '#f87171',
                      fontSize: '0.85rem',
                      fontFamily: 'monospace',
                    }}
                  >
                    ⚠ {serverError}
                  </div>
                )}

                {/* 2-col inputs */}
                <div className="contact-form__row">
                  <div className="contact-field">
                    <label htmlFor="name" className="contact-field__label font-mono">
                      YOUR NAME *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={form.name}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`contact-input ${errors.name ? 'contact-input--error' : ''}`}
                    />
                    {errors.name && (
                      <span id="name-error" className="contact-field__error font-mono">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="email" className="contact-field__label font-mono">
                      WORK EMAIL *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="alex@venture.com"
                      value={form.email}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`contact-input ${errors.email ? 'contact-input--error' : ''}`}
                    />
                    {errors.email && (
                      <span id="email-error" className="contact-field__error font-mono">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-field">
                    <label htmlFor="company" className="contact-field__label font-mono">
                      COMPANY / VENTURE (OPTIONAL)
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Systems (or stealth)"
                      value={form.company}
                      aria-invalid={errors.company ? 'true' : 'false'}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="phone" className="contact-field__label font-mono">
                      PHONE (OPTIONAL)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="contact-input"
                    />
                  </div>
                </div>

                {/* Project Selectors */}
                <div className="contact-form__row">
                  <div className="contact-field">
                    <label htmlFor="projectType" className="contact-field__label font-mono">
                      PROJECT TYPE
                    </label>
                    <select
                      id="projectType"
                      value={form.projectType}
                      onChange={(e) => handleInputChange('projectType', e.target.value)}
                      className="contact-select font-mono"
                    >
                      {CONTACT_PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="budget" className="contact-field__label font-mono">
                      ESTIMATED BUDGET
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="contact-select font-mono"
                    >
                      {CONTACT_BUDGET_OPTIONS.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="timeline" className="contact-field__label font-mono">
                    TARGET TIMELINE
                  </label>
                  <select
                    id="timeline"
                    value={form.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="contact-select font-mono"
                  >
                    {TIMELINE_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="contact-field">
                  <label htmlFor="description" className="contact-field__label font-mono">
                    PROJECT DESCRIPTION *
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    required
                    placeholder="Tell us about the problem you are solving, core user workflows, existing stack constraints, or what success looks like..."
                    value={form.description}
                    aria-invalid={errors.description ? 'true' : 'false'}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`contact-textarea ${errors.description ? 'contact-textarea--error' : ''}`}
                  />
                  {errors.description && (
                    <span id="description-error" className="contact-field__error font-mono">
                      {errors.description}
                    </span>
                  )}
                </div>

                <div className="contact-form__submit-wrap">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="contact-submit-btn font-mono"
                  >
                    {status === 'submitting' ? 'SENDING...' : 'SEND INQUIRY →'}
                  </button>
                  <span className="contact-form__note label font-mono text-muted">
                    DIRECT FOUNDER & ARCHITECT REVIEW
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="contact-sidebar">
            <div className="contact-sidebar__card">
              <span className="label font-mono text-accent">DIRECT EMAIL</span>
              <a href={`mailto:${brand.email}`} className="contact-sidebar__email font-mono">
                {brand.email}
              </a>
              <p className="contact-sidebar__text font-sans">
                Prefer to send an existing PRD or architectural brief directly? Email us anytime.
              </p>
            </div>

            <div className="contact-sidebar__card">
              <span className="label font-mono text-accent">STUDIO BASE</span>
              <p className="contact-sidebar__loc font-mono">{brand.location}</p>
              <p className="contact-sidebar__text font-sans">
                Operating across IST, GMT, and US East timezones with seamless async communication.
              </p>
            </div>

            <div className="contact-sidebar__card">
              <span className="label font-mono text-accent">MULTI-STEP ESTIMATOR</span>
              <p className="contact-sidebar__text font-sans">
                Prefer an interactive guided consultation with instant scope calculations?
              </p>
              <a href="/quote" className="contact-sidebar__quote-link font-mono">
                TRY THE 6-STEP INQUIRY WIZARD →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
