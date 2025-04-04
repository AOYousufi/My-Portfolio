import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import VirtualExhibition from "./pages/VirtualExhibition";
import NCNews from "./pages/NCNews";
import MyPlants from "./pages/MyPlants";
import Education from "./pages/Education";
import WorkExperience from "./pages/WorkExperience";
import "./App.css";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/projects/virtual-exhibition"
          element={<VirtualExhibition />}
        />
        <Route path="/projects/nc-news" element={<NCNews />} />
        <Route path="/projects/my-plants" element={<MyPlants />} />
        <Route path="/education" element={<Education />} />
        <Route path="/work-experience" element={<WorkExperience />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
