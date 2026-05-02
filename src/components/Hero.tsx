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
            'radial-gradient(circle at 20% 10%, rgba(58,1,92,0.10) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(79,1,71,0.08) 0%, transparent 55%), radial-gradient(circle at 50% 85%, rgba(17,0,28,0.04) 0%, transparent 60%)',
        }}
      />

      <div ref={titleRef} className="reveal relative z-10 text-center max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div
            className="h-px w-12"
            style={{ background: 'linear-gradient(to right, transparent, rgba(58,1,92,0.55))' }}
          />
          <span
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: 'rgba(17,0,28,0.70)' }}
          >
            Regulatory Compliance · Systems Architect · People Leader
          </span>
          <div
            className="h-px w-12"
            style={{ background: 'linear-gradient(to left, transparent, rgba(58,1,92,0.55))' }}
          />
        </div>

        {/* Name */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-3 leading-tight tracking-tight">
          Tiffany Castro
        </h1>

        {/* Tagline */}
        <p className="font-display text-2xl md:text-3xl mb-4 leading-snug text-gradient-amethyst">
          Work in Progress
        </p>

        {/* Snapshot */}
        <p
          className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-7"
          style={{ color: 'rgba(17,0,28,0.72)' }}
        >
          I untangle complex, regulated workflows into integrated, auditable systems.
        </p>

        {/* Location */}
        <p
          className="text-sm md:text-base tracking-wider mb-10"
          style={{ color: 'rgba(17,0,28,0.62)' }}
        >
          Atlanta, Georgia &nbsp;·&nbsp; Open to Relocation
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <a
            href="#projects"
            className="px-8 py-3 font-semibold text-sm tracking-widest uppercase rounded-xl transition-all duration-200 glow-amethyst"
            style={{
              background: '#3a015c',
              color: '#ffffff',
            }}
          >
            View My Work
          </a>
          <a
            href="#about"
            className="px-8 py-3 border font-medium text-sm tracking-widest uppercase rounded-xl transition-all duration-200"
            style={{
              borderColor: 'rgba(58,1,92,0.35)',
              color: '#3a015c',
              background: 'rgba(255,255,255,0.60)',
            }}
          >
            About Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors animate-bounce"
        style={{ color: 'rgba(17,0,28,0.35)' }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
