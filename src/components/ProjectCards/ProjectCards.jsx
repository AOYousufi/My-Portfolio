import { useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './ProjectCards.css'

const PROJECTS = [
  {
    id: 1,
    title: 'NC-News',
    subtitle: 'Full-Stack News Platform',
    description:
      'Full-stack news platform with article browsing, voting, comments, filtering, sorting and pagination backed by PostgreSQL and a Jest/Supertest test suite.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Jest'],
    github: 'https://github.com/AOYousufi/NC-News-BE',
    live: 'https://nc-news-sultan.netlify.app/',
    accent: '#4ab8c0',
    icon: '◈',
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'Virtual Exhibition',
    subtitle: 'Museum API Integration',
    description:
      'Collaborative web app integrating Harvard & V&A museum APIs with filtering, pagination and curated exhibition features across a React interface.',
    stack: ['React', 'Node.js', 'Express', 'REST APIs', 'CSS3'],
    github: 'https://github.com/AOYousufi/Virtual-Exhibition',
    live: 'https://mueseumexhibition.netlify.app/',
    accent: '#5b8fff',
    icon: '◉',
    category: 'Full Stack',
  },
  {
    id: 3,
    title: 'My Plants',
    subtitle: 'React Native Plant Care',
    description:
      'Collaborative React Native plant-care app with user login, smart watering reminders, and plant tracking powered by a scalable MongoDB API.',
    stack: ['React Native', 'Express', 'MongoDB', 'Expo'],
    github: 'https://github.com/AOYousufi/my-plants-FE',
    live: null,
    accent: '#a78bfa',
    icon: '◎',
    category: 'Mobile',
  },
]

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
        <h2 className="projects-title">Projects</h2>
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
