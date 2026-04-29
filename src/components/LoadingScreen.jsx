import { useEffect, useRef, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete }) {
  const leftRef   = useRef(null)
  const rightRef  = useRef(null)
  const barRef    = useRef(null)
  const markRef   = useRef(null)
  const subRef    = useRef(null)
  const shimRef   = useRef(null)
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let cw = 0, ch = 0

    const resize = () => {
      cw = canvas.width  = canvas.offsetWidth
      ch = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      o: Math.random() * 0.5 + 0.1,
      d: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1)
    }))

    let starRaf
    const drawStars = () => {
      ctx.clearRect(0, 0, cw, ch)
      stars.forEach(s => {
        s.o += s.d
        if (s.o > 0.65 || s.o < 0.08) s.d *= -1
        ctx.beginPath()
        ctx.arc(s.x * cw, s.y * ch, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.o.toFixed(2)})`
        ctx.fill()
      })
      starRaf = requestAnimationFrame(drawStars)
    }
    drawStars()

    const CYCLE    = 2400
    const RUNS     = 0
    let   runCount = 0
    let   startTime = null

    const eio  = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2
    const lerp = (a, b, t) => a + (b - a) * t
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

    let lt = 0, rt = 0, bt = 0, measured = false
    let shimPos = -60, shimOn = false

    const measure = () => {
      const lw = leftRef.current, rw = rightRef.current, mk = markRef.current
      lw.style.width = 'auto'; rw.style.width = 'auto'
      lt = lw.querySelector('span').scrollWidth + 14
      rt = rw.querySelector('span').scrollWidth + 14
      bt = lt + rt + mk.getBoundingClientRect().width
      lw.style.width = '0px'; rw.style.width = '0px'
      measured = true
    }

    const tick = (now) => {
      if (!measured) { rafRef.current = requestAnimationFrame(tick); return }
      if (!startTime) startTime = now

      const elapsed = now - startTime
      const cycleT  = (elapsed % CYCLE) / CYCLE
      runCount      = Math.floor(elapsed / CYCLE)

      let lv = 0, rv = 0, bv = 0, gw = 0.25, so = 0

      if (cycleT >= 0.16 && cycleT < 0.36) {
        const e = eio((cycleT - 0.16) / 0.20)
        lv = lerp(0, lt, e); rv = lerp(0, rt, e)
        bv = lerp(0, bt, e); gw = lerp(0.25, 0.85, e)
        shimOn = false
      } else if (cycleT >= 0.36) {
        lv = lt; rv = rt; bv = bt; gw = 0.85
        so = Math.min(clamp((cycleT - 0.36) / 0.10, 0, 1), 1) * 0.9
        shimOn = cycleT < 0.65
      }

      if (leftRef.current)  leftRef.current.style.width  = lv + 'px'
      if (rightRef.current) rightRef.current.style.width = rv + 'px'
      if (barRef.current) {
        barRef.current.style.width   = bv + 'px'
        barRef.current.style.opacity = bv > 1 ? '1' : '0'
      }
      if (subRef.current)  subRef.current.style.opacity  = so.toFixed(2)
      if (markRef.current) markRef.current.style.filter  =
        `drop-shadow(0 0 ${(8 + gw * 26).toFixed(0)}px rgba(74,184,192,${gw.toFixed(2)}))`

      if (shimRef.current && shimOn) {
        shimRef.current.style.display = 'block'
        shimPos += 3
        if (shimPos > bv + 60) shimPos = -60
        shimRef.current.style.left = shimPos + 'px'
      } else if (shimRef.current) {
        shimRef.current.style.display = 'none'
        shimPos = -60
      }

      if (runCount >= RUNS && cycleT >= 0.65) {
        cancelAnimationFrame(rafRef.current)
        cancelAnimationFrame(starRaf)
        const screen = canvasRef.current?.parentElement
        if (screen) {
          screen.style.transition = 'opacity 0.6s ease'
          screen.style.opacity    = '0'
        }
        setTimeout(() => {
          setVisible(false)
          onComplete?.()
        }, 650)
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    document.fonts.ready.then(() => {
      setTimeout(() => {
        measure()
        rafRef.current = requestAnimationFrame(tick)
      }, 80)
    })

    window.addEventListener('resize', () => { if (measured) setTimeout(measure, 50) })

    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(starRaf)
      window.removeEventListener('resize', resize)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="ls-overlay" role="status" aria-label="Loading portfolio">
      <canvas ref={canvasRef} className="ls-stars" aria-hidden="true" />

      <div className="ls-orb ls-orb-1" aria-hidden="true" />
      <div className="ls-orb ls-orb-2" aria-hidden="true" />
      <div className="ls-orb ls-orb-3" aria-hidden="true" />

      <div className="ls-scene" aria-hidden="true">
        <div className="ls-row">
          <div ref={leftRef} className="ls-wrap ls-left">
            <span>Ahmad</span>
          </div>

          <svg ref={markRef} className="ls-mark" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 86 L40 10 L72 86" stroke="white" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 86 Q8 100 24 100 Q40 100 40 86" stroke="#4ab8c0" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M110 54 L92 12"  stroke="white" strokeWidth="11" strokeLinecap="round"/>
            <path d="M110 54 L128 12" stroke="white" strokeWidth="11" strokeLinecap="round"/>
            <path d="M110 54 L110 86" stroke="white" strokeWidth="11" strokeLinecap="round"/>
          </svg>

          <div ref={rightRef} className="ls-wrap ls-right">
            <span>Yousufi</span>
          </div>
        </div>

        <div ref={barRef} className="ls-bar">
          <div ref={shimRef} className="ls-shimmer" />
        </div>

        <p ref={subRef} className="ls-subtitle">Software Developer</p>
      </div>
    </div>
  )
}
