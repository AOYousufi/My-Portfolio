import { useEffect, useRef } from 'react'
import './PageLoader.css'

export default function PageLoader({ onComplete }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    const exit = setTimeout(() => {
      overlayRef.current?.classList.add('pl-exit')
      setTimeout(onComplete, 220)
    }, 400)
    return () => clearTimeout(exit)
  }, [onComplete])

  return (
    <div ref={overlayRef} className="pl-overlay" aria-hidden="true">
      <div className="pl-bar" />
      <svg
        className="pl-mark"
        viewBox="0 0 140 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 86 L40 10 L72 86" stroke="white" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 86 Q8 100 24 100 Q40 100 40 86" stroke="#4ab8c0" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M110 54 L92 12"  stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M110 54 L128 12" stroke="white" strokeWidth="11" strokeLinecap="round"/>
        <path d="M110 54 L110 86" stroke="white" strokeWidth="11" strokeLinecap="round"/>
      </svg>
    </div>
  )
}
