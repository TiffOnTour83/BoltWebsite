import { useEffect, useRef } from 'react';

const skillGroups = [
  {
    heading: 'Systems & Compliance Expertise',
    color: 'text-gold-300',
    dot: 'bg-gold-500',
    bar: 'from-gold-700 to-gold-400',
    skills: [
      { name: 'Process Mapping & Systematization', level: 97 },
      { name: 'Regulatory Compliance (FAA)', level: 94 },
      { name: 'Change Management', level: 90 },
      { name: 'Risk Assessment & Quality Frameworks', level: 88 },
      { name: 'Enterprise Architecture', level: 85 },
    ],
  },
  {
    heading: 'Digital Platforms',
    color: 'text-teal-300',
    dot: 'bg-teal-500',
    bar: 'from-teal-700 to-teal-400',
    skills: [
      { name: 'SharePoint & M365 Purview', level: 93 },
      { name: 'Smartsheet', level: 92 },
      { name: 'Comply365 / XTML', level: 89 },
      { name: 'Power Automate & Power Apps', level: 82 },
      { name: 'Database Integration', level: 80 },
    ],
  },
  {
    heading: 'Training & Operations',
    color: 'text-copper-300',
    dot: 'bg-copper-500',
    bar: 'from-copper-600 to-copper-400',
    skills: [
      { name: 'AQP Program Design', level: 96 },
      { name: 'DIG Documentation', level: 91 },
      { name: 'Compliance Documentation', level: 94 },
      { name: 'Instructor Calibration', level: 87 },
      { name: 'Quality Improvement', level: 90 },
    ],
  },
  {
    heading: 'Professional Competencies',
    color: 'text-warm-200',
    dot: 'bg-warm-200',
    bar: 'from-warm-300/40 to-warm-100',
    skills: [
      { name: 'Strategic Thinking', level: 95 },
      { name: 'Cross-Functional Leadership', level: 91 },
      { name: 'Technical Writing', level: 93 },
      { name: 'Stakeholder Management', level: 88 },
      { name: 'Project Management', level: 90 },
    ],
  },
];

const tags = [
  'Process mapping', 'Systems thinking', 'FAA compliance', 'Change management',
  'Risk assessment', 'Enterprise architecture', 'SharePoint', 'Smartsheet',
  'Comply365', 'Microsoft 365', 'Power Automate', 'Power Apps', 'XTML',
  'M365 Purview', 'AQP program design', 'DIG documentation', 'Quality frameworks',
  'Technical writing', 'Cross-functional leadership', 'Stakeholder management',
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
            if (!barsAnimated.current) {
              barsAnimated.current = true;
              setTimeout(() => {
                document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
                  (bar as HTMLElement).style.width = (bar as HTMLElement).dataset.width || '0%';
                });
              }, 400);
            }
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
            Built for the Work<br />
            <span className="text-gradient-gold">Others Walk Away From</span>
          </h2>
        </div>

        {/* Skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {skillGroups.map((group) => (
            <div key={group.heading} className="reveal card-base border-navy-600/40">
              <div className="flex items-center gap-2 mb-5">
                <span className={`w-2 h-2 rounded-full ${group.dot}`} />
                <h3 className={`text-sm font-semibold tracking-wide ${group.color}`}>{group.heading}</h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-warm-300/80 text-xs">{s.name}</span>
                      <span className={`text-xs font-medium ${group.color}`}>{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-700/60 rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${group.bar} transition-all duration-1000 ease-out`}
                        style={{ width: '0%' }}
                        data-width={`${s.level}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div className="reveal">
          <p className="text-warm-300/50 text-xs tracking-widest uppercase mb-4 font-medium">Full Skills Index</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="tag bg-navy-800 border border-teal-800/40 text-warm-300/80 hover:border-gold-500/40 hover:text-gold-300 transition-all duration-200 text-xs py-1.5 px-3"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
