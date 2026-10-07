import { useState, useCallback } from 'react'
import { AppRouter } from './router'
import { Loader } from '@/components/ui/Loader'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [loaded, setLoaded] = useState(() => {
    if (reduced) return true
    try {
      return sessionStorage.getItem('ignite_intro_seen') === 'true'
    } catch {
      return false
    }
  })

  const handleLoaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem('ignite_intro_seen', 'true')
    } catch {
      // Ignore sessionStorage access limits
    }
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      {/* Mount router immediately so resources start loading */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <AppRouter />
      </div>
    </>
  )
}
