import ParticleCanvas from './components/ParticleCanvas';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0c1a2e]">
      <ParticleCanvas />
      <Nav />

      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider flip />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider flip />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
