import { useRef, useEffect, useCallback } from 'react'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

function ProjectCard({ project, index, reducedMotion }) {
  const { title, subtitle, description, stack, github, live, accent, icon, category } = project

  const cardRef = useRef(null)
  const spotlightRef = useRef(null)
  const headerRef = useRef(null)
  const bodyRef = useRef(null)
  const rafRef = useRef(null)
  const tiltState = useRef({ rotX: 0, rotY: 0, targetX: 0, targetY: 0 })
  const isHovered = useRef(false)
  const isMobile = useRef(window.matchMedia('(max-width: 768px)').matches)
  const accentRgb = useRef(hexToRgb(accent))

  const animate = useCallback(() => {
    const s = tiltState.current
    const factor = isHovered.current ? 0.12 : 0.07
    s.rotX += (s.targetX - s.rotX) * factor
    s.rotY += (s.targetY - s.rotY) * factor

    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(900px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg)`
    }

    if (headerRef.current) {
      headerRef.current.style.transform =
        `translate(${s.rotY * 0.6}px, ${-s.rotX * 0.6}px)`
    }
    if (bodyRef.current) {
      bodyRef.current.style.transform =
        `translate(${s.rotY * 0.3}px, ${-s.rotX * 0.3}px)`
    }

    const atRest =
      !isHovered.current &&
      Math.abs(s.rotX) < 0.05 &&
      Math.abs(s.rotY) < 0.05

    if (atRest) {
      if (cardRef.current) cardRef.current.style.transform = ''
      if (headerRef.current) headerRef.current.style.transform = ''
      if (bodyRef.current) bodyRef.current.style.transform = ''
      rafRef.current = null
    } else {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isMobile.current || reducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (spotlightRef.current) {
      spotlightRef.current.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(${accentRgb.current},0.12) 0%, transparent 60%)`
    }

    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    tiltState.current.targetX = -((e.clientY - cy) / (rect.height / 2)) * 15
    tiltState.current.targetY = ((e.clientX - cx) / (rect.width / 2)) * 15

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [animate, reducedMotion])

  const handleMouseEnter = useCallback(() => {
    if (isMobile.current || reducedMotion) return
    isHovered.current = true
  }, [reducedMotion])

  const handleMouseLeave = useCallback(() => {
    if (isMobile.current || reducedMotion) return
    isHovered.current = false
    tiltState.current.targetX = 0
    tiltState.current.targetY = 0
    if (spotlightRef.current) {
      spotlightRef.current.style.background = ''
    }
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [animate, reducedMotion])

  const handleClick = useCallback((e) => {
    if (e.target.closest('a') || reducedMotion) return
    const card = cardRef.current
    if (!card) return

    const canvas = document.createElement('canvas')
    const rect = card.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    canvas.style.cssText =
      'position:absolute;inset:0;pointer-events:none;z-index:999;border-radius:20px;'
    card.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    const rgb = accentRgb.current

    const count = 10 + Math.floor(Math.random() * 3)
    const particles = Array.from({ length: count }, () => ({
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12 - 3,
      r: Math.random() * 4 + 2,
    }))

    const start = performance.now()
    const dur = 600

    function draw(now) {
      const t = (now - start) / dur
      if (t >= 1) { canvas.remove(); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.25
        const alpha = 1 - t
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * (1 - t * 0.4), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${alpha})`
        ctx.fill()
      })
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
  }, [reducedMotion])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onResize = (e) => { isMobile.current = e.matches }
    mq.addEventListener('change', onResize)
    return () => {
      mq.removeEventListener('change', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const entranceDelay = `${index * 0.15}s`
  const floatDelay = `${index * 0.8}s`

  return (
    <article
      ref={cardRef}
      className="project-card"
      aria-label={`Project: ${title}`}
      style={{
        '--card-accent': accent,
        '--entrance-delay': entranceDelay,
        '--float-delay': floatDelay,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={spotlightRef} className="card-spotlight" />
      <div className="card-border-glow" />

      <header ref={headerRef} className="card-header">
        <span className="card-icon" style={{ color: accent }}>{icon}</span>
        <div className="card-badge">{category}</div>
      </header>

      <div ref={bodyRef} className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">{subtitle}</p>
        <p className="card-description">{description}</p>
      </div>

      <footer className="card-footer">
        <div className="card-stack">
          {stack.map(s => (
            <span key={s} className="stack-tag">{s}</span>
          ))}
        </div>
        <div className="card-links">
          {github && (
            <a
              className="card-link"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${title} on GitHub`}
              onClick={e => e.stopPropagation()}
            >
              GitHub →
            </a>
          )}
          {live && (
            <a
              className="card-link card-link-live"
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${title} live demo`}
              onClick={e => e.stopPropagation()}
            >
              Live ↗
            </a>
          )}
        </div>
      </footer>

      <div className="card-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </div>
    </article>
  )
}

export default ProjectCard
