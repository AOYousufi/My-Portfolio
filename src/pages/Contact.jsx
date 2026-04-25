import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../utils/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./Contact.css";

const EMAIL = "ozairyousufi1400@gmail.com";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Ahmad,\n\n${message}\n\nBest regards,\n${name}\n${email}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.from(".contact-page-title", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".contact-section", start: "top 88%", once: true },
      });

      gsap.from(".contact-info, .contact-form", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.65,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".contact-grid", start: "top 88%", once: true },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="contact-section" ref={containerRef}>
      <h1 className="contact-page-title section-title">Get In Touch</h1>
      <p className="contact-subtitle">
        Open to opportunities, collaborations, and interesting conversations.
      </p>

      <div className="contact-grid">
        {/* ─── Info card ─────────────────────────────────────────────── */}
        <div className="contact-info glass-card">
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

        {/* ─── Form card ─────────────────────────────────────────────── */}
        <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
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
  );
}

export default Contact;
