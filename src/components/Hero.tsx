import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add('visible');
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Luxury background wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 10%, rgba(95,33,77,0.14) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(141,69,103,0.12) 0%, transparent 55%), radial-gradient(circle at 50% 85%, rgba(192,122,99,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content panel (adds contrast over the constellation map) */}
      <div
        className="relative z-10 w-full max-w-4xl mx-auto"
        style={{
          background: 'rgba(255,250,246,0.78)',
          border: '1px solid var(--border)',
          borderRadius: 28,
          padding: '2.25rem 1.75rem',
          boxShadow: '0 24px 80px rgba(95,33,77,0.12)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div ref={titleRef} className="reveal text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="h-px w-12"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(95,33,77,0.45))',
              }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              Regulatory Compliance · Systems Architect · People Leader
            </span>
            <div
              className="h-px w-12"
              style={{
                background:
                  'linear-gradient(to left, transparent, rgba(95,33,77,0.45))',
              }}
            />
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-3 leading-tight tracking-tight">
            Tiffany Castro
          </h1>

          {/* Tagline */}
          <p
            className="font-display text-2xl md:text-3xl mb-4 leading-snug"
            style={{ color: 'var(--accent-2)' }}
          >
            “Work in Progress”
          </p>

          {/* Snapshot */}
          <p
            className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-7"
            style={{ color: 'var(--text-secondary)' }}
          >
            I untangle complex, regulated workflows into integrated, auditable systems.
          </p>

          {/* Location */}
          <p
            className="text-sm md:text-base tracking-wider mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            Atlanta, Georgia &nbsp;·&nbsp; Open to Relocation
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <a
              href="#projects"
              className="px-8 py-3 font-semibold text-sm tracking-widest uppercase rounded-xl transition-all duration-200 btn-primary glow-amethyst"
            >
              View My Work
            </a>
            <a
              href="#about"
              className="px-8 py-3 border font-medium text-sm tracking-widest uppercase rounded-xl transition-all duration-200 btn-secondary"
              style={{
                background: 'rgba(255,250,246,0.60)',
              }}
            >
              About Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors animate-bounce"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
