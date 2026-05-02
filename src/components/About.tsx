import { useEffect, useRef, useState } from 'react';
import { Puzzle, FileSearch, Settings, ShieldCheck } from 'lucide-react';
import SystemArtifact from './modals/SystemArtifact';

const pillars = [
  {
    icon: Puzzle,
    title: 'Process Systematization',
    desc: 'Taking organizational chaos and building methodology to untangle it—step by step, dependency by dependency.',
    color: 'text-gold-400',
    border: 'border-gold-700/40',
    bg: 'bg-gold-900/20',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    desc: 'Reading the requirements others skip. Building FAA-compliant frameworks with audit trails baked in from day one.',
    color: 'text-teal-400',
    border: 'border-teal-700/40',
    bg: 'bg-teal-900/20',
  },
  {
    icon: Settings,
    title: 'Enterprise Integration',
    desc: 'Connecting disparate platforms—SharePoint, Smartsheet, Comply365, HR systems—into unified, trackable workflows.',
    color: 'text-copper-400',
    border: 'border-copper-600/30',
    bg: 'bg-copper-600/10',
  },
  {
    icon: FileSearch,
    title: 'Digital Transformation',
    desc: 'Modernizing legacy systems at enterprise scale. The unglamorous, critical work that everyone postpones—done right.',
    color: 'text-gold-300',
    border: 'border-gold-700/30',
    bg: 'bg-gold-900/10',
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
          <div className="h-px flex-1 max-w-[60px] bg-gold-500/50" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">About Me</span>
        </div>

        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight mb-6">
            The Person Organizations Call<br />
            <span className="text-gradient-gold">When Systems Get Messy</span>
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-warm-300 text-lg leading-relaxed">
              FOP | AQP Senior Specialist at Delta Air Lines, Pilot Learning &amp; Development. I handle the work that makes most people's heads spin: regulatory compliance, legacy system migrations, enterprise-scale process mapping, and technical problem-solving in high-stakes training environments.
            </p>
            <p className="text-warm-300/80 leading-relaxed">
              I don't just execute projects—I create repeatable methodologies that outlast any single initiative. Complexity doesn't scare me. It interests me. While others run from the unglamorous work, I lean in. I systematize. I document. I ensure compliance. I build frameworks that make the messy manageable.
            </p>
          </div>
        </div>

        {/* Core pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <div
              key={p.title}
              className={`reveal card-base ${p.border} ${p.bg} flex flex-col gap-3 group`}
            >
              <div className={`${p.color} mb-1`}>
                <p.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className={`font-semibold text-sm tracking-wide ${p.color}`}>{p.title}</h3>
              <p className="text-warm-300/70 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Brand statement */}
        <div className="reveal mt-14 relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-900/30 to-navy-800/50 blur-sm" />
          <div className="relative border border-teal-700/30 rounded-2xl p-8 md:p-10 bg-navy-900/70 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="hidden sm:block w-1 h-full min-h-[80px] bg-gradient-to-b from-gold-500 to-teal-500 rounded-full flex-shrink-0" />
              <div>
                <p className="font-display text-xl md:text-2xl text-warm-100 leading-relaxed italic mb-3">
                  "I turn complexity into systems. While others see organizational chaos and walk away, I see an opportunity to build methodology."
                </p>
                <p className="text-warm-300/70 text-sm tracking-widest uppercase">
                  -- Tiffany Castro, FOP | AQP Sr. Specialist
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* System Artifact utility link */}
        <div className="reveal mt-6 flex justify-end">
          <button
            onClick={() => setArtifactOpen(true)}
            className="text-warm-300/25 hover:text-warm-300/60 text-xs tracking-widest transition-colors duration-300 font-mono"
          >
            System Artifact
          </button>
        </div>
      </div>

      {artifactOpen && <SystemArtifact onClose={() => setArtifactOpen(false)} />}
    </section>
  );
}
