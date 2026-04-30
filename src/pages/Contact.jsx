import { useState, useRef, useEffect, useCallback } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import './Contact.css'

const EMAIL = 'ozairyousufi1400@gmail.com'

const INFO_RGB  = '0,212,255'
const FORM_RGB  = '79,142,255'

function Contact() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')

  const sectionRef  = useRef(null)
  const infoSpotRef = useRef(null)
  const formSpotRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          section.classList.add('section-visible')
          section.querySelectorAll('.contact-panel').forEach((panel) => {
            panel.classList.add('card-visible')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const makeSpotMove = useCallback((spotRef, rgb) => (e) => {
    if (reducedMotion) return
    const panel = e.currentTarget
    const rect = panel.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    if (spotRef.current) {
      spotRef.current.style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(${rgb},0.13) 0%, transparent 60%)`
    }
  }, [reducedMotion])

  const makeSpotLeave = useCallback((spotRef) => () => {
    if (spotRef.current) spotRef.current.style.background = ''
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
    const body    = encodeURIComponent(
      `Hi Ahmad,\n\n${message}\n\nBest regards,\n${name}\n${email}`
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact-section" ref={sectionRef}>
      <div className="contact-grid-bg" aria-hidden="true" />

      <div className="contact-heading">
        <h1 className="contact-title">Get In Touch</h1>
        <div className="contact-title-line" aria-hidden="true" />
        <p className="contact-eyebrow">Let&apos;s build something together</p>
      </div>

      <div className="contact-grid">
        <div
          className="contact-panel contact-info"
          style={{ '--card-accent': '#00d4ff', '--entrance-delay': '0s' }}
          onMouseMove={makeSpotMove(infoSpotRef, INFO_RGB)}
          onMouseLeave={makeSpotLeave(infoSpotRef)}
        >
          <div ref={infoSpotRef} className="contact-spotlight" />
          <div className="contact-border-glow" />

          <h2 className="contact-info-heading">Direct Email</h2>
          <a href={`mailto:${EMAIL}`} className="contact-email-link">
            {EMAIL}
          </a>

          <div className="contact-divider" />

          <h3 className="contact-tips-heading">What to include</h3>
          <ul className="contact-tips">
            <li>Project summary &amp; goals</li>
            <li>Timeline &amp; budget range</li>
            <li>Tech stack preferences</li>
            <li>Any relevant links or assets</li>
          </ul>

          <div className="contact-divider" />

          <div className="contact-social-row">
            <a
              href="https://github.com/AOYousufi"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/ahmad-ozair-yousufi-08b469326"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <form
          className="contact-panel contact-form"
          style={{ '--card-accent': '#4f8eff', '--entrance-delay': '0.15s' }}
          onMouseMove={makeSpotMove(formSpotRef, FORM_RGB)}
          onMouseLeave={makeSpotLeave(formSpotRef)}
          onSubmit={handleSubmit}
          noValidate
        >
          <div ref={formSpotRef} className="contact-spotlight" />
          <div className="contact-border-glow" />

          <h2 className="contact-info-heading">Send a Message</h2>

          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">Name</label>
            <input
              id="contact-name"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">Email</label>
            <input
              id="contact-email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              className="form-input form-textarea"
              placeholder="Tell me about your project or opportunity…"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary contact-submit">
            Open in Email Client →
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
