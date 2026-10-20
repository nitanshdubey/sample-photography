// src/App.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: page composition.
// The seven sections appear in the exact order of the brief.
// Each section component renders its own <section id="..."> using
// the ids defined in `navLinks` (src/data/content.ts):
//   home, about, services, gallery, testimonials, founder, contact
// ---------------------------------------------------------------

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Founder from "./components/Founder";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* Lets keyboard users jump past the navigation */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Founder />
        <Contact />
      </main>

      <Footer />
    </>
  );
}