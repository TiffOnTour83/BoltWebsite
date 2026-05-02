import { useEffect, useRef, useState } from 'react';
import { Puzzle, FileSearch, Settings, ShieldCheck } from 'lucide-react';
import SystemArtifact from './modals/SystemArtifact';

const pillars = [
  {
    icon: Puzzle,
    title: 'Process Systematization',
    desc: 'Untangling organizational complexity into repeatable, dependable steps.',
    color: 'text-[#3a015c]',
    border: 'border-black/10',
    bg: 'bg-white/70',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    desc: 'Building audit-ready workflows with clear ownership and traceability.',
    color: 'text-[#4f0147]',
    border: 'border-black/10',
    bg: 'bg-white/70',
  },
  {
    icon: Settings,
    title: 'Enterprise Integration',
    desc: 'Connecting tools and teams into one integrated operating rhythm.',
    color: 'text-[#35012c]',
    border: 'border-black/10',
    bg: 'bg-white/70',
  },
  {
    icon: FileSearch,
    title: 'Digital Transformation',
    desc: 'Modernizing legacy environments without losing compliance or context.',
    color: 'text-[#11001c]',
    border: 'border-black/10',
    bg: 'bg-white/70',
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
          <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(58,1,92,0.22)' }} />
          <span className="text-[#3a015c] text-xs tracking-[0.3em] uppercase font-medium">About Me</span>
        </div>

        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6" style={{ color: '#11001c' }}>
            The Person Organizations Call<br />
            <span className="text-gradient-amethyst">When Systems Get Messy</span>
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(17,0,28,0.78)' }}>
              I work on the systems behind pilot training and regulatory compliance—where documentation, migration, and process design have real operational consequences.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(17,0,28,0.72)' }}>
              I build structure in environments where complexity is unavoidable. That includes legacy system transitions, enterprise-scale process mapping, and technical problem-solving in regulated aviation contexts.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(17,0,28,0.72)' }}>
              My focus is consistency: turning fragmented workflows into systems that can be maintained, audited, and trusted over time.
            </p>
          </div>
        </div>

        {/* Core pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <div key={p.title} className={`reveal card-base ${p.border} ${p.bg} flex flex-col gap-3 group`}>
              <div className={`${p.color} mb-1`}>
                <p.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className={`font-semibold text-sm tracking-wide ${p.color}`}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,0,28,0.70)' }}>
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
                'linear-gradient(90deg, rgba(58,1,92,0.10), rgba(79,1,71,0.08), rgba(53,1,44,0.08))',
            }}
          />
          <div
            className="relative border rounded-2xl p-8 md:p-10 backdrop-blur-sm"
            style={{
              borderColor: 'rgba(17,0,28,0.10)',
              background: 'rgba(255,255,255,0.82)',
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="hidden sm:block w-1 h-full min-h-[80px] rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(to bottom, #3a015c, #4f0147)' }}
              />
              <div>
                <p className="font-display text-xl md:text-2xl leading-relaxed italic mb-3" style={{ color: '#11001c' }}>
                  "I specialize in the problems that don't come with a playbook—connecting systems, untangling compliance, and building frameworks that actually hold up."
                </p>
                <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(17,0,28,0.60)' }}>
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
              color: 'rgba(58,1,92,0.70)',
              border: '1px solid rgba(58,1,92,0.20)',
              background: 'rgba(255,255,255,0.65)',
            }}
            title="System Artifact — for the curious"
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'rgba(58,1,92,0.70)' }} />
            System Artifact
          </button>
        </div>
      </div>

      {artifactOpen && <SystemArtifact onClose={() => setArtifactOpen(false)} />}
    </section>
  );
}
