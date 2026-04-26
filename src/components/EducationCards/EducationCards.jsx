import { useEffect, useRef } from 'react'
import EducationCard from './EducationCard'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './EducationCards.css'

const EDUCATION = [
  {
    id: 1,
    institution: 'Staffordshire University',
    degree: 'Software Development BSc (Hons)',
    period: 'Sep 2024 – Jun 2028',
    duration: '4 years',
    status: 'current',
    progress: 25,
    description:
      'Comprehensive degree covering full-stack development, data structures, algorithms, web & mobile, software architecture, and database systems. Building strong foundations through practical labs and Agile group projects.',
    skills: ['Full Stack', 'Algorithms', 'Data Structures', 'Agile', 'Architecture'],
    accent: '#4ab8c0',
    initial: 'S',
    type: 'BSc Degree',
  },
  {
    id: 2,
    institution: 'Northcoders',
    degree: 'Junior Software Developer Bootcamp',
    period: 'Jun 2024 – Aug 2024',
    duration: '3 months',
    status: 'completed',
    progress: 100,
    description:
      'Intensive full-time bootcamp specialising in full-stack JavaScript. Built React, React Native, Node.js, Express, and PostgreSQL projects. Practiced TDD with Jest & Supertest, Agile sprints, pair programming, and Git workflows.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TDD', 'Pair Programming'],
    accent: '#5b8fff',
    initial: 'N',
    type: 'Bootcamp',
  },
  {
    id: 3,
    institution: 'Rana University',
    degree: 'Software Engineering',
    period: 'Jan 2022 – Jun 2023',
    duration: '18 months',
    status: 'partial',
    progress: 60,
    description:
      'Completed modules in algorithm design, object-oriented programming, and system analysis. Programme interrupted by relocation — provided a solid technical foundation for ongoing development.',
    skills: ['OOP', 'Algorithms', 'System Analysis'],
    accent: '#a78bfa',
    initial: 'R',
    type: 'Engineering',
  },
  {
    id: 4,
    institution: 'Faqir Frozi High School',
    degree: 'Secondary Education (GCSE equivalent)',
    period: '2017 – 2020',
    duration: '3 years',
    status: 'completed',
    progress: 100,
    description:
      'Strong academic results across Mathematics, Science, and English. Developed critical thinking, problem-solving skills, and teamwork through coursework and extracurricular activities.',
    skills: ['Mathematics', 'Science', 'Critical Thinking'],
    accent: '#f472b6',
    initial: 'F',
    type: 'Secondary',
  },
]

const CERTIFICATIONS = [
  {
    id: 5,
    institution: 'Rana University Afg',
    degree: 'IT Help Desk Support Training',
    period: 'Jun 2020',
    duration: null,
    status: 'completed',
    progress: 100,
    description:
      'Professional certification in IT help desk operations, hardware troubleshooting, and technical support workflows.',
    skills: ['IT Support', 'Hardware', 'Troubleshooting'],
    accent: '#4ab8c0',
    initial: 'R',
    type: 'Certificate',
  },
]

function TimelineSection({ entries, reducedMotion, baseIndex = 0 }) {
  return (
    <div className="edu-timeline">
      {entries.map((entry, i) => (
        <div
          key={entry.id}
          className="edu-entry"
          style={{ '--card-accent': entry.accent }}
        >
          {/* Pulsing node on the spine */}
          <div className="edu-node" aria-hidden="true">
            <div className="edu-node-core" />
            <div className="edu-node-ring" />
            <div className="edu-node-ring edu-node-ring--2" />
          </div>

          <EducationCard
            entry={entry}
            index={baseIndex + i}
            reducedMotion={reducedMotion}
          />
        </div>
      ))}
    </div>
  )
}

function EducationCards() {
  const reducedMotion = useReducedMotion()
  const sectionRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          section.classList.add('section-visible')
          section.querySelectorAll('.edu-card').forEach((card) => {
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
    <section className="education-section" ref={sectionRef}>
      <div className="projects-grid-bg" aria-hidden="true" />

      <div className="edu-heading">
        <h2 className="edu-title">Education</h2>
        <div className="edu-title-line" aria-hidden="true" />
        <p className="edu-eyebrow">My academic journey</p>
      </div>

      <TimelineSection
        entries={EDUCATION}
        reducedMotion={reducedMotion}
        baseIndex={0}
      />

      <h3 className="edu-section-divider">Certifications</h3>

      <TimelineSection
        entries={CERTIFICATIONS}
        reducedMotion={reducedMotion}
        baseIndex={EDUCATION.length}
      />
    </section>
  )
}

export default EducationCards
