import { useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './ProjectCards.css'

function ProjectCards() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          section.querySelectorAll('.project-card').forEach((card) => {
            card.classList.add('card-visible')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="projects-section" ref={sectionRef}>
      <div className="projects-grid-bg" aria-hidden="true" />

      <div className="projects-heading">
        <h1 className="projects-title">Projects</h1>
        <div className="projects-title-line" aria-hidden="true" />
        <p className="projects-eyebrow">Things I've built</p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectCards
