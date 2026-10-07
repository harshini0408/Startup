// ============================================================
// CENTRALIZED IGNITE API SERVICE LAYER
// Handles typed HTTP requests, timeouts via AbortController,
// UTM & referrer metadata extraction, honeypot safety, and friendly error mapping.
// ============================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  reference_id?: string
  data?: T
  errors?: Record<string, string>
}

export interface ContactSubmissionPayload {
  name: string
  email: string
  company: string
  phone?: string
  project_type?: string
  budget_range?: string
  timeline?: string
  message: string
  // Anti-spam & metadata
  website_url?: string // Honeypot field (must stay empty)
  form_start_time?: number // Timestamp when user began typing
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
}

export interface QuoteRequestPayload {
  services: string[]
  project_stage: string
  priorities: string[]
  budget_range: string
  timeline: string
  name: string
  email: string
  company: string
  phone?: string
  project_description?: string
  // Anti-spam & metadata
  website_url?: string // Honeypot field
  form_start_time?: number
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
}

export interface HealthResponse {
  status: string
  service: string
  database?: string
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '')
const REQUEST_TIMEOUT_MS = 15000

/**
 * Extracts UTM tracking parameters from current window URL.
 */
export function getUtmParameters() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    referrer: document.referrer || undefined,
  }
}

async function requestWithTimeout<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    })

    clearTimeout(timeoutId)

    const contentType = response.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')
    const responseData = isJson ? await response.json() : null

    if (!response.ok) {
      if (response.status === 422 && responseData?.errors) {
        return {
          success: false,
          message: responseData.message || 'Please review the highlighted fields.',
          errors: responseData.errors,
        }
      }

      if (response.status === 429) {
        return {
          success: false,
          message: 'Too many submissions received. Please wait a few moments before trying again.',
        }
      }

      return {
        success: false,
        message: responseData?.message || 'Something interrupted the submission. Your brief is still here — please try again.',
        errors: responseData?.errors,
      }
    }

    return responseData as ApiResponse<T>
  } catch (err: unknown) {
    clearTimeout(timeoutId)

    if (err instanceof DOMException && err.name === 'AbortError') {
      return {
        success: false,
        message: 'The request timed out. Please check your connection and try again.',
      }
    }

    // Network error / server unavailable
    return {
      success: false,
      message: 'Something interrupted the submission. Your brief is still here — please try again.',
    }
  }
}

/**
 * Submit direct contact form to the production backend.
 */
export async function submitContact(payload: ContactSubmissionPayload): Promise<ApiResponse> {
  const utmData = getUtmParameters()
  const completePayload: ContactSubmissionPayload = {
    ...utmData,
    ...payload,
  }

  return requestWithTimeout('/api/contact', {
    method: 'POST',
    body: JSON.stringify(completePayload),
  })
}

/**
 * Submit 6-step quote wizard parameters to the production backend.
 */
export async function submitQuote(payload: QuoteRequestPayload): Promise<ApiResponse> {
  const utmData = getUtmParameters()
  const completePayload: QuoteRequestPayload = {
    ...utmData,
    ...payload,
  }

  return requestWithTimeout('/api/quote', {
    method: 'POST',
    body: JSON.stringify(completePayload),
  })
}

/**
 * Verify backend health and database readiness.
 */
export async function checkHealth(): Promise<ApiResponse<HealthResponse>> {
  return requestWithTimeout<HealthResponse>('/api/health', {
    method: 'GET',
  })
}
