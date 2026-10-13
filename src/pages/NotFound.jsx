import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-heading">
      <p className="not-found-code">404 · Page not found</p>
      <h1 id="not-found-heading">This page isn't here.</h1>
      <p>The link may have changed. You can explore my projects or return to the homepage.</p>
      <div className="not-found-actions">
        <Link className="btn-primary" to="/projects">View projects</Link>
        <Link className="btn-secondary" to="/">Back home</Link>
      </div>
    </section>
  )
}
