import { useEffect, useRef } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { PROJECTS } from './data/projects'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BoredWidget from './components/BoredWidget/BoredWidget'
import ProjectDetail from './components/ProjectDetail'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Education from './pages/Education'
import WorkExperience from './pages/WorkExperience'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

const SITE_NAME = 'Ahmad Ozair Yousufi'
const SITE_URL = 'https://ahmadyousufi.dev'
const DEFAULT_DESCRIPTION = 'Software Development student and QA Tester with full-stack project experience. Seeking a 2027 UK software engineering placement.'

const PAGES = {
  '/': { title: 'Software Developer & QA Tester', description: DEFAULT_DESCRIPTION },
  '/projects': { title: 'Projects', description: 'Explore React, Node.js, PostgreSQL and React Native projects by Ahmad Ozair Yousufi.' },
  '/education': { title: 'Education', description: 'Software development education, training and technical skills.' },
  '/work-experience': { title: 'Work Experience', description: 'Commercial QA testing and earlier work experience.' },
  '/contact': { title: 'Contact', description: 'Contact Ahmad Ozair Yousufi about a software engineering placement or development opportunity.' },
}

function RouteEffects() {
  const { pathname } = useLocation()
  const initialRoute = useRef(true)

  useEffect(() => {
    const project = PROJECTS.find((item) => item.path === pathname)
    const page = project
      ? { title: project.title, description: project.description }
      : PAGES[pathname] || { title: 'Page Not Found', description: DEFAULT_DESCRIPTION }
    const url = SITE_URL + pathname

    document.title = `${page.title} | ${SITE_NAME}`

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', page.description)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', url)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', url)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', document.title)
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', page.description)

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (initialRoute.current) {
      initialRoute.current = false
    } else {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RouteEffects />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="app-wrapper">
          <Navbar />
          <main id="main-content" className="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/education" element={<Education />} />
              <Route path="/work-experience" element={<WorkExperience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <BoredWidget />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
