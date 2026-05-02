import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const skillGroups = [
  {
    heading: 'Systems & Integration',
    color: 'text-[#3a015c]',
    dot: 'bg-[#3a015c]',
    border: 'border-black/10',
    skills: [
      'SharePoint & M365 Purview',
      'Smartsheet',
      'Comply365 / XTML',
      'Power Automate & Power Apps',
      'Database Integration',
    ],
  },
  {
    heading: 'Compliance & Governance',
    color: 'text-[#4f0147]',
    dot: 'bg-[#4f0147]',
    border: 'border-black/10',
    skills: [
      'AQP Program Design',
      'DIG Documentation',
      'Compliance Documentation',
      'Change Control & Audit Trails',
      'Quality Improvement',
    ],
  },
  {
    heading: 'Leadership & Communication',
    color: 'text-[#35012c]',
    dot: 'bg-[#35012c]',
    border: 'border-black/10',
    skills: [
      'Strategic Thinking',
      'Cross-Functional Leadership',
      'Technical Writing',
      'Stakeholder Management',
      'Project Management',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
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
    <section id="skills" ref={sectionRef} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(58,1,92,0.22)' }} />
          <span className="text-[#3a015c] text-xs tracking-[0.3em] uppercase font-medium">Skills & Expertise</span>
        </div>

        <div className="reveal mb-10">
          <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: '#11001c' }}>
            What I Do
          </h2>
          <p className="mt-4 text-base leading-relaxed max-w-2xl" style={{ color: 'rgba(17,0,28,0.72)' }}>
            Let’s build something systematic—whether you need a framework built, a messy system untangled, or perspective on compliance and digital transformation. Let’s connect.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 border" style={{ borderColor: 'rgba(58,1,92,0.20)', background: 'rgba(255,255,255,0.7)' }}>
            <Sparkles size={16} color="#3a015c" />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'rgba(17,0,28,0.70)' }}>
              Open to Work
            </span>
          </div>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.heading} className={`reveal card-base ${group.border}`}>
              <div className="flex items-center gap-2 mb-5">
                <span className={`w-2 h-2 rounded-full ${group.dot}`} />
                <h3 className={`text-sm font-semibold tracking-wide ${group.color}`}>{group.heading}</h3>
              </div>
              <ul className="space-y-2.5">
                {group.skills.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${group.dot} opacity-60`} />
                    <span className="text-sm leading-snug" style={{ color: 'rgba(17,0,28,0.72)' }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
