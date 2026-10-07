// Hook to set contextual cursor states via data-cursor on elements
export function useCursor() {
  return {
    view:    { 'data-cursor': 'view' } as Record<string, string>,
    open:    { 'data-cursor': 'open' } as Record<string, string>,
    drag:    { 'data-cursor': 'drag' } as Record<string, string>,
    explore: { 'data-cursor': 'explore' } as Record<string, string>,
    send:    { 'data-cursor': 'send' } as Record<string, string>,
    link:    { 'data-cursor': 'link' } as Record<string, string>,
  }
}
