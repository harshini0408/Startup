import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export function NotFoundPage() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div className="not-found-page">
      {/* Background Grid */}
      <div className="not-found__grid" aria-hidden="true" />

      <div className="container not-found__inner">
        <div className="not-found__meta font-mono">
          <span className="text-accent">ERROR / 404_NULL_REFERENCE</span>
          <span className="text-muted">
            CURSOR: [{coords.x.toString().padStart(4, '0')}, {coords.y.toString().padStart(4, '0')}]
          </span>
        </div>

        <div className="not-found__watermark font-display" aria-hidden="true">
          404
        </div>

        <h1 className="not-found__headline font-display">
          We looked.<br />
          <span className="italic font-normal">There’s nothing</span><br />
          to build here.
        </h1>

        <p className="not-found__sub font-sans">
          The requested coordinate does not exist in our system architecture. It may have been deprecated, relocated, or never engineered in the first place.
        </p>

        <div className="not-found__actions">
          <Link to="/" className="not-found__btn font-mono">
            BACK HOME →
          </Link>
          <Link to="/work" className="not-found__secondary font-mono">
            EXPLORE SELECTED WORK
          </Link>
        </div>
      </div>
    </div>
  )
}
