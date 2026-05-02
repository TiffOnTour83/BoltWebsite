import { useEffect, useRef, useState } from 'react';
import { Puzzle, FileSearch, Settings, ShieldCheck } from 'lucide-react';
import SystemArtifact from './modals/SystemArtifact';

const pillars = [
  {
    icon: Puzzle,
    title: 'Process Systematization',
    desc: 'Untangling organizational complexity into repeatable, dependable steps.',
    iconColor: 'var(--accent)',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    desc: 'Building audit-ready workflows with clear ownership and traceability.',
    iconColor: 'var(--accent-2)',
  },
  {
    icon: Settings,
    title: 'Enterprise Integration',
    desc: 'Connecting tools and teams into one integrated operating rhythm.',
    iconColor: 'var(--interaction)',
  },
  {
    icon: FileSearch,
    title: 'Digital Transformation',
    desc: 'Modernizing legacy environments without losing compliance or context.',
    iconColor: 'var(--text)',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [artifactOpen, setArtifactOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="reveal flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px]" style={{ background: 'var(--border-strong)' }} />
          <span className="text-xs tracking-[0.3em] uppercase font-medium interactive-accent">About Me</span>
        </div>

        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6" style={{ color: 'var(--text)' }}>
            The Person Organizations Call<br />
            <span className="text-gradient-amethyst">When Systems Get Messy</span>
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I work on the systems behind pilot training and regulatory compliance—where documentation, migration, and process design have real operational consequences.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I build structure in environments where complexity is unavoidable. That includes legacy system transitions, enterprise-scale process mapping, and technical problem-solving in regulated aviation contexts.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              My focus is consistency: turning fragmented workflows into systems that can be maintained, audited, and trusted over time.
            </p>
          </div>
        </div>

        {/* Core pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="reveal card-base flex flex-col gap-3 group"
              style={{ background: 'rgba(255,250,246,0.76)' }}
            >
              <div className="mb-1" style={{ color: p.iconColor }}>
                <p.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-sm tracking-wide" style={{ color: p.iconColor }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Brand statement */}
        <div className="reveal mt-14 relative">
          <div
            className="absolute inset-0 rounded-2xl blur-sm"
            style={{
              background:
                'linear-gradient(90deg, rgba(95,33,77,0.10), rgba(141,69,103,0.08), rgba(192,122,99,0.08))',
            }}
          />
          <div
            className="relative border rounded-2xl p-8 md:p-10 backdrop-blur-sm"
            style={{
              borderColor: 'var(--border)',
              background: 'rgba(255,250,246,0.82)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="hidden sm:block w-1 h-full min-h-[80px] rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-3))' }}
              />
              <div>
                <p className="font-display text-xl md:text-2xl leading-relaxed italic mb-3" style={{ color: 'var(--text)' }}>
                  "I specialize in the problems that don't come with a playbook—connecting systems, untangling compliance, and building frameworks that actually hold up."
                </p>
                <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                  — Tiffany Castro
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Artifact — subtly discoverable */}
        <div className="reveal mt-6 flex justify-end">
          <button
            onClick={() => setArtifactOpen(true)}
            className="flex items-center gap-2 text-xs tracking-widest transition-colors duration-300 font-mono px-4 py-2 rounded-lg"
            style={{
              color: 'var(--accent)',
              border: '1px solid var(--border)',
              background: 'rgba(255,250,246,0.78)',
            }}
            title="System Artifact — for the curious"
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--accent)' }} />
            System Artifact
          </button>
        </div>
      </div>

      {artifactOpen && <SystemArtifact onClose={() => setArtifactOpen(false)} />}
    </section>
  );
}
