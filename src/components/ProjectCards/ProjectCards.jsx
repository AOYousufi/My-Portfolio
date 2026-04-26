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
      'Full-stack news platform featuring article browsing, upvoting, nested comments, and user authentication with a PostgreSQL backend and Jest/Supertest test suite.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Jest'],
    github: 'https://github.com/AOYousufi/nc-news',
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
      'Responsive web app integrating Harvard & V&A museum APIs with advanced filtering, pagination, and performant data rendering across a bespoke gallery UI.',
    stack: ['React', 'Node.js', 'Express', 'REST APIs', 'CSS3'],
    github: 'https://github.com/AOYousufi/Virtual-Exhibition',
    live: 'https://mueseumexhibition.netlify.app/',
    accent: '#5b8fff',
    icon: '◉',
    category: 'Front End',
  },
  {
    id: 3,
    title: 'My Plants',
    subtitle: 'React Native Plant Care',
    description:
      'Collaborative React Native plant-care app with user login, smart watering reminders, and plant tracking powered by a scalable MongoDB API.',
    stack: ['React Native', 'Express', 'MongoDB', 'Expo'],
    github: 'https://github.com/AOYousufi/my-plants',
    live: null,
    accent: '#a78bfa',
    icon: '◎',
    category: 'Mobile',
  },
  {
    id: 4,
    title: 'Tech Returners — Launchpad',
    subtitle: 'Client Product · Industry Audience',
    description:
      'Bespoke internal software product for Tech Returners Launchpad. Gathered requirements, designed system architecture, and built a React/Node/Express application presented live to an industry audience.',
    stack: ['React', 'Node.js', 'Express', 'REST API'],
    github: null,
    live: null,
    accent: '#f472b6',
    icon: '◇',
    category: 'Client Project',
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
