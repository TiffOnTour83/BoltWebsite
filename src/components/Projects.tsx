import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ProjectGraph from './ProjectGraph';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Document Analysis Framework',
    subtitle: '"Pull the Process"',
    category: 'Systems Thinking & Process Optimization',
    tagColor: 'bg-gold-800/50 text-gold-300 border border-gold-700/30',
    accentColor: 'border-gold-500/50',
    headingColor: 'text-gold-300',
    body: `You didn't just tackle one messy system—you created a repeatable 118-step methodology to untangle any organizational complexity. This framework extracts current state, analyzes findings, sequences remediation, implements with dependencies, and verifies outcomes.`,
    insight: `You don't just solve problems. You create frameworks that solve entire categories of problems.`,
  },
  {
    id: 2,
    number: '02',
    title: 'Comply365 Document Conversion',
    subtitle: 'Enterprise-Scale Technical Execution',
    category: 'Enterprise Systems Integration',
    tagColor: 'bg-teal-800/50 text-teal-300 border border-teal-700/30',
    accentColor: 'border-teal-500/50',
    headingColor: 'text-teal-300',
    body: `AQP and DIG documentation needed conversion from two-column Word documents to XTML format in Comply365. The process is "extremely time-consuming." Most organizations would outsource it or delay indefinitely. You're solving it: Microsoft Pilot plugin automation, document merging strategies, version control workflows, and sustainable conversion at scale.`,
    insight: `You tackle the hard technical problems that others avoid because they're unglamorous and complex.`,
  },
  {
    id: 3,
    number: '03',
    title: 'AQP Change Management Integration',
    subtitle: 'Cross-System Compliance Orchestration',
    category: 'Regulatory Compliance',
    tagColor: 'bg-copper-600/20 text-copper-300 border border-copper-600/30',
    accentColor: 'border-copper-500/50',
    headingColor: 'text-copper-300',
    body: `Connecting Chelsea's change management sheets with AQP intake forms, Training & Standards processes, and multiple departments into one trackable system. This isn't just workflow automation—it's ensuring compliance, defining regulatory requirements, creating audit trails, and managing dependencies across systems.`,
    insight: `You handle regulatory complexity and build compliance into the foundation, not as an afterthought.`,
  },
  {
    id: 4,
    number: '04',
    title: 'N Drive → SharePoint Migration',
    subtitle: '+ Legal Retention Compliance',
    category: 'Digital Transformation',
    tagColor: 'bg-warm-200/5 text-warm-200 border border-warm-300/20',
    accentColor: 'border-warm-200/30',
    headingColor: 'text-warm-100',
    body: `Legacy 7-year-old systems. Legal retention questions. Compliance documentation. Space management. Document verification. This is the work everyone postpones. You're reading the retention requirements, mapping legal obligations, and migrating enterprise documentation while ensuring compliance and accessibility.`,
    insight: `You handle the work that's necessary but nobody wants, with the same rigor as high-visibility projects.`,
  },
];

function ProjectCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`reveal card-base ${p.accentColor} group cursor-pointer transition-all duration-300 hover:shadow-lg`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <span className="text-4xl font-display text-navy-700 font-bold leading-none select-none">
          {p.number}
        </span>
        <span className={`tag ${p.tagColor} text-[11px]`}>{p.category}</span>
      </div>

      <h3 className={`text-lg font-semibold ${p.headingColor} mb-1`}>{p.title}</h3>
      <p className="text-warm-300/60 text-sm mb-4 italic">{p.subtitle}</p>

      <p className="text-warm-300/80 text-sm leading-relaxed mb-4">{p.body}</p>

      {expanded && (
        <div className={`border-t ${p.accentColor} pt-4 mt-2`}>
          <div className="flex items-start gap-2">
            <ArrowUpRight size={14} className={`${p.headingColor} flex-shrink-0 mt-0.5`} />
            <p className={`text-sm font-medium ${p.headingColor} italic`}>{p.insight}</p>
          </div>
        </div>
      )}

      <button
        className={`mt-2 text-xs ${p.headingColor} opacity-60 hover:opacity-100 tracking-widest uppercase transition-opacity`}
      >
        {expanded ? 'Show less' : 'What this shows →'}
      </button>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px] bg-teal-500/50" />
          <span className="text-teal-400 text-xs tracking-[0.3em] uppercase font-medium">Work & Projects</span>
        </div>

        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-warm-100 leading-tight">
            The Hard Work<br />
            <span className="text-gradient-teal">Others Avoid</span>
          </h2>
        </div>

        {/* Graph */}
        <div className="reveal mb-14 card-base border-teal-700/30 p-6">
          <p className="text-warm-300/60 text-xs tracking-widest uppercase mb-1 font-medium">
            Project Map — Complexity vs. Scope
          </p>
          <p className="text-warm-300/50 text-xs mb-5">Hover over any point to explore project details</p>
          <ProjectGraph />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
