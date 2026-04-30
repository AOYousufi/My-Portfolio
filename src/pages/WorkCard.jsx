import { useRef, useEffect, useCallback } from 'react'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

function WorkCard({ item, index, reducedMotion }) {
  const { role, company, location, period, bullets, accent, initial, type } = item

  const cardRef   = useRef(null)
  const spotRef   = useRef(null)
  const headerRef = useRef(null)
  const bodyRef   = useRef(null)
  const rafRef    = useRef(null)
  const tilt      = useRef({ rotX: 0, rotY: 0, tx: 0, ty: 0 })
  const hovered   = useRef(false)
  const mobile    = useRef(window.matchMedia('(max-width: 768px)').matches)
  const rgb       = useRef(hexToRgb(accent))

  const animate = useCallback(() => {
    const s = tilt.current
    const f = hovered.current ? 0.12 : 0.07
    s.rotX += (s.tx - s.rotX) * f
    s.rotY += (s.ty - s.rotY) * f

    if (cardRef.current) {
      cardRef.current.style.transform =
        `perspective(900px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg)`
    }
    if (headerRef.current) {
      headerRef.current.style.transform =
        `translate(${s.rotY * 0.7}px, ${-s.rotX * 0.7}px)`
    }
    if (bodyRef.current) {
      bodyRef.current.style.transform =
        `translate(${s.rotY * 0.35}px, ${-s.rotX * 0.35}px)`
    }

    const still =
      !hovered.current &&
      Math.abs(s.rotX) < 0.05 &&
      Math.abs(s.rotY) < 0.05

    if (still) {
      if (cardRef.current)  cardRef.current.style.transform  = ''
      if (headerRef.current) headerRef.current.style.transform = ''
      if (bodyRef.current)  bodyRef.current.style.transform  = ''
      rafRef.current = null
    } else {
      rafRef.current = requestAnimationFrame(animate)
    }
  }, [])

  const onMove = useCallback((e) => {
    if (mobile.current || reducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (spotRef.current) {
      spotRef.current.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(${rgb.current},0.13) 0%, transparent 60%)`
    }

    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    tilt.current.tx = -((e.clientY - cy) / (rect.height / 2)) * 15
    tilt.current.ty = ((e.clientX - cx) / (rect.width / 2)) * 15

    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate)
  }, [animate, reducedMotion])

  const onEnter = useCallback(() => {
    if (mobile.current || reducedMotion) return
    hovered.current = true
  }, [reducedMotion])

  const onLeave = useCallback(() => {
    if (mobile.current || reducedMotion) return
    hovered.current = false
    tilt.current.tx = 0
    tilt.current.ty = 0
    if (spotRef.current) spotRef.current.style.background = ''
    if (!rafRef.current) rafRef.current = requestAnimationFrame(animate)
  }, [animate, reducedMotion])

  const onClick = useCallback((e) => {
    if (reducedMotion) return
    const card = cardRef.current
    if (!card) return

    const canvas = document.createElement('canvas')
    const rect = card.getBoundingClientRect()
    canvas.width  = rect.width
    canvas.height = rect.height
    canvas.style.cssText =
      'position:absolute;inset:0;pointer-events:none;z-index:999;border-radius:20px;'
    card.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    const cx  = e.clientX - rect.left
    const cy  = e.clientY - rect.top
    const col = rgb.current

    const count = 10 + Math.floor(Math.random() * 3)
    const pts   = Array.from({ length: count }, () => ({
      x: cx, y: cy,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12 - 3,
      r: Math.random() * 4 + 2,
    }))

    const start = performance.now()
    function draw(now) {
      const t = (now - start) / 600
      if (t >= 1) { canvas.remove(); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.25
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * (1 - t * 0.4), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},${1 - t})`
        ctx.fill()
      })
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)
  }, [reducedMotion])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const onResize = (e) => { mobile.current = e.matches }
    mq.addEventListener('change', onResize)
    return () => {
      mq.removeEventListener('change', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <article
      ref={cardRef}
      className="work-card"
      aria-label={`${type}: ${role} at ${company}`}
      style={{
        '--card-accent':    accent,
        '--entrance-delay': `${index * 0.15}s`,
        '--float-delay':    `${index * 0.9}s`,
      }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div ref={spotRef} className="work-spotlight" />
      <div className="work-border-glow" />

      <div className="work-initial" aria-hidden="true">{initial}</div>

      <header ref={headerRef} className="work-card-header">
        <div className="work-badge-row">
          <span className="work-period-badge">{period}</span>
        </div>
        <span className="work-type-chip">{type}</span>
      </header>

      <div ref={bodyRef} className="work-card-body">
        <h3 className="work-company-name">{company}</h3>
        <p className="work-role-text">{role}</p>
        <p className="work-location-text">{location}</p>
        <ul className="work-bullets">
          {bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default WorkCard
