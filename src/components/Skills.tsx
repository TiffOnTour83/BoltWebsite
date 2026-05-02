import { useEffect, useRef } from 'react';

const skillGroups = [
  {
    heading: 'Systems & Compliance',
    color: 'text-gold-300',
    dot: 'bg-gold-500',
    border: 'border-gold-700/30',
    skills: [
      'Process Mapping & Systematization',
      'Regulatory Compliance (FAA/AQP)',
      'Change Management',
      'Risk Assessment & Quality Frameworks',
      'Enterprise Architecture',
    ],
  },
  {
    heading: 'Digital Platforms',
    color: 'text-teal-300',
    dot: 'bg-teal-500',
    border: 'border-teal-700/30',
    skills: [
      'SharePoint & M365 Purview',
      'Smartsheet',
      'Comply365 / XTML',
      'Power Automate & Power Apps',
      'Database Integration',
    ],
  },
  {
    heading: 'Training & Operations',
    color: 'text-copper-300',
    dot: 'bg-copper-500',
    border: 'border-copper-600/30',
    skills: [
      'AQP Program Design',
      'DIG Documentation',
      'Compliance Documentation',
      'Instructor Calibration',
      'Quality Improvement',
    ],
  },
  {
    heading: 'Leadership & Communication',
    color: 'text-warm-200',
    dot: 'bg-warm-200',
    border: 'border-warm-300/20',
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
          <div className="h-px flex-1 max-w-[60px] bg-gold-500/50" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-medium">Skills & Expertise</span>
        </div>

        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight">
            Areas of Expertise
          </h2>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <span className="text-warm-300/80 text-sm leading-snug">{s}</span>
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
