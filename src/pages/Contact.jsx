import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "ozairyousufi1400@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-container contact-container"
      aria-labelledby="contact-title"
    >
      <header className="section-header">
        <h1 id="contact-title">Contact Me</h1>
      </header>

      <div className="contact-grid">
        <article className="card contact-card">
          <p className="contact-lead">
            I’m open to new opportunities—projects, collaborations, or
            questions.
          </p>

          <div className="contact-row" role="group" aria-label="Email actions">
            <a
              className="btn btn-primary"
              href={`mailto:${email}`}
              aria-label="Send me an email"
            >
              Email me
            </a>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={handleCopy}
              aria-live="polite"
            >
              {copied ? "Copied ✔" : "Copy email"}
            </button>
          </div>

          <div className="contact-meta">
            <span className="contact-label">Email</span>
            <a className="contact-link" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </article>

        <article className="card contact-card tips-card">
          <h2 className="tips-title">What to include</h2>
          <ul className="tips-list">
            <li>Project summary & goals</li>
            <li>Timeline & budget range</li>
            <li>Tech stack preferences</li>
            <li>Links to any assets</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Contact;
