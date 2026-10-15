import { Link, useParams } from 'react-router-dom'
import { findProjectById } from '../data/projects'
import NotFound from '../pages/NotFound'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const project = findProjectById(projectId)

  if (!project) return <NotFound />

  return (
    <article className="project-detail-page">
      <header className="project-detail-hero">
        <p className="project-detail-kicker">{project.category} · {project.subtitle}</p>
        <h1>{project.title}</h1>
        <div className="project-detail-badges" aria-label="Technologies used">
          {project.stack.map((technology) => (
            <span key={technology} className="badge">{technology}</span>
          ))}
        </div>
      </header>

      <div className="project-detail-body glass-card">
        <h2>Overview</h2>
        <p>{project.overview}</p>
        <h2>What it includes</h2>
        <ul className="project-detail-highlights">
          {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <h2>Project context</h2>
        <p>{project.collaboration}</p>

        <nav className="project-detail-links" aria-label={`${project.title} links`}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-detail-btn">
              Open live project ↗
            </a>
          )}
          {project.repositories.map(({ label, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-btn outline"
            >
              {label} ↗
            </a>
          ))}
          <Link to="/projects" className="back-link">← All projects</Link>
        </nav>
      </div>
    </article>
  )
}
