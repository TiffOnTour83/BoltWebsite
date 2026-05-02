import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-black/10 shadow-sm'
          : 'bg-white/55 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-lg tracking-wider transition-colors"
          style={{ color: '#3a015c' }}
        >
          TC
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2 border text-sm tracking-widest uppercase font-medium rounded-xl transition-all duration-200"
            style={{
              borderColor: 'rgba(58,1,92,0.35)',
              color: '#3a015c',
              background: 'rgba(255,255,255,0.65)',
            }}
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden transition-colors"
          style={{ color: 'rgba(17,0,28,0.72)' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-block mt-2 px-5 py-2 border text-sm tracking-widest uppercase font-medium rounded-xl text-center transition-all"
            style={{
              borderColor: 'rgba(58,1,92,0.35)',
              color: '#3a015c',
              background: 'rgba(255,255,255,0.65)',
            }}
            onClick={() => setMenuOpen(false)}
          >
            Let's Connect
          </a>
        </div>
      )}
    </nav>
  );
}
