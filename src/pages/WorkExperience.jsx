import { useRef, useEffect } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import WorkCard from './WorkCard'
import './WorkExperience.css'

const WORK = [
  {
    role: 'QA Tester',
    company: 'Next 15',
    location: 'London, UK',
    period: 'Aug 2026 – Sep 2026',
    type: 'Temporary',
    accent: '#4ab8c0',
    initial: 'N',
    bullets: [
      'Performed manual and visual QA on website updates and new pages during product launch cycles for a major global technology client.',
      'Checked content, imagery, layouts and browser behaviour across multiple international regions and screen sizes.',
      'Reported and tracked defects in Jira and communicated findings clearly with the wider QA team under tight release deadlines.',
    ],
  },
  {
    role: 'Freelance Consultant',
    company: 'Tech Returners',
    location: 'Remote',
    period: 'Feb 2025 – Mar 2025',
    type: 'Freelance',
    accent: '#5b8fff',
    initial: 'T',
    bullets: [
      'Developed a full-stack web app using React, Node.js, Express, and MongoDB.',
      'Implemented RESTful APIs and integrated Harvard & V&A museum data.',
      'Deployed on Netlify and Render with CI/CD pipelines.',
    ],
  },
  {
    role: 'Website Developer',
    company: 'Unitemps — Staffordshire University',
    location: 'Stoke-on-Trent, UK',
    period: 'Feb 2025 – Mar 2025',
    type: 'Contract',
    accent: '#a78bfa',
    initial: 'U',
    bullets: [
      'Created wireframes and UI mockups for the university web team.',
      'Attended weekly stakeholder meetings to align design with brand guidelines.',
      'Ensured visual consistency across all digital touchpoints.',
    ],
  },
  {
    role: 'Customer Service Assistant',
    company: 'Marks & Spencer',
    location: 'Stone, UK',
    period: 'Dec 2024 – Feb 2025',
    type: 'Part-time',
    accent: '#4ab8c0',
    initial: 'M',
    bullets: [
      'Collaborated with a fast-paced team to meet daily operational targets.',
      'Managed task prioritisation under time pressure.',
      'Developed communication and customer-facing skills.',
    ],
  },
]

function WorkExperience() {
  const reducedMotion = useReducedMotion()
  const sectionRef    = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          section.classList.add('section-visible')
          section.querySelectorAll('.work-card').forEach((card) => {
            card.classList.add('card-visible')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="work-section" ref={sectionRef}>
      <div className="work-grid-bg" aria-hidden="true" />

      <div className="work-heading">
        <h1 className="work-title">Work Experience</h1>
        <div className="work-title-line" aria-hidden="true" />
        <p className="work-eyebrow">My professional journey</p>
      </div>

      <div className="work-timeline">
        {WORK.map((item, i) => (
          <div
            key={i}
            className="work-entry"
            style={{ '--card-accent': item.accent }}
          >
            <div className="work-node" aria-hidden="true">
              <div className="work-node-core" />
              <div className="work-node-ring" />
              <div className="work-node-ring work-node-ring--2" />
            </div>
            <WorkCard item={item} index={i} reducedMotion={reducedMotion} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorkExperience
