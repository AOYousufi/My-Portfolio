import { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import Projects from './pages/Projects'
import VirtualExhibition from './pages/VirtualExhibition'
import NCNews from './pages/NCNews'
import MyPlants from './pages/MyPlants'
import Education from './pages/Education'
import WorkExperience from './pages/WorkExperience'
import Contact from './pages/Contact'
import './App.css'

// Renders all routes and shows PageLoader on every navigation after the first
function InnerApp() {
  const location = useLocation()
  const [showPageLoader, setShowPageLoader] = useState(false)
  const prevPath = useRef(null)

  useEffect(() => {
    // Skip on initial mount — only trigger for actual navigations
    if (prevPath.current === null) {
      prevPath.current = location.pathname
      return
    }
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname
      setShowPageLoader(true)
    }
  }, [location.pathname])

  return (
    <>
      {showPageLoader && (
        <PageLoader
          key={location.pathname}
          onComplete={() => setShowPageLoader(false)}
        />
      )}
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <section id="home">
              <Home />
            </section>
          }
        />
        <Route
          path="/projects"
          element={
            <section id="projects">
              <Projects />
            </section>
          }
        />
        <Route
          path="/projects/virtual-exhibition"
          element={
            <section id="virtual-exhibition">
              <VirtualExhibition />
            </section>
          }
        />
        <Route
          path="/projects/nc-news"
          element={
            <section id="nc-news">
              <NCNews />
            </section>
          }
        />
        <Route
          path="/projects/my-plants"
          element={
            <section id="my-plants">
              <MyPlants />
            </section>
          }
        />
        <Route
          path="/education"
          element={
            <section id="education">
              <Education />
            </section>
          }
        />
        <Route
          path="/work-experience"
          element={
            <section id="work-experience">
              <WorkExperience />
            </section>
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem('ay-intro-seen')
  )

  const handleLoadComplete = () => {
    sessionStorage.setItem('ay-intro-seen', 'true')
    setLoading(false)
  }

  return (
    <Router>
      {loading ? (
        // Nothing else renders while the intro plays — GSAP animations start
        // fresh on the home page the moment the overlay is gone
        <LoadingScreen onComplete={handleLoadComplete} />
      ) : (
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <InnerApp />
          </main>
          <Footer />
        </div>
      )}
    </Router>
  )
}

export default App
