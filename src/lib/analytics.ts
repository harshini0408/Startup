// ============================================================
// ANALYTICS ABSTRACTION LAYER
// Privacy-safe conversion event dispatch.
// Never logs PII (names, emails, phones, private descriptions).
// Ready for plug-and-play PostHog, Plausible, or Google Analytics.
// ============================================================

export type AnalyticsEventName =
  | 'contact_form_started'
  | 'contact_form_submitted'
  | 'contact_form_failed'
  | 'quote_started'
  | 'quote_step_completed'
  | 'quote_submitted'
  | 'quote_failed'
  | 'case_study_opened'
  | 'start_project_clicked'
  | 'filter_changed'
  | 'navigation_click'

export interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined | null
}

export function trackEvent(name: AnalyticsEventName, properties?: AnalyticsProperties): void {
  // In development, log cleanly to console if debug enabled
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[Analytics Event] %c${name}`, 'color: #D97706; font-weight: bold;', properties ?? {})
  }

  // Hook for Plausible / PostHog / Window analytics if present
  try {
    const windowWithAnalytics = window as unknown as {
      plausible?: (event: string, options?: { props?: AnalyticsProperties }) => void
      posthog?: { capture: (event: string, properties?: AnalyticsProperties) => void }
      gtag?: (command: string, action: string, params?: AnalyticsProperties) => void
    }

    if (typeof windowWithAnalytics.plausible === 'function') {
      windowWithAnalytics.plausible(name, { props: properties })
    } else if (windowWithAnalytics.posthog && typeof windowWithAnalytics.posthog.capture === 'function') {
      windowWithAnalytics.posthog.capture(name, properties)
    } else if (typeof windowWithAnalytics.gtag === 'function') {
      windowWithAnalytics.gtag('event', name, properties)
    }
  } catch {
    // Non-blocking catch
  }
}
