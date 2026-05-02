import { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, Clock, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  complexity: number;
  scope: number;
  timeline: number;
  color: string;
  desc: string;
  metrics: { label: string; value: number; icon: JSX.Element }[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Document Analysis Framework',
    category: 'Systems Thinking',
    complexity: 78,
    scope: 90,
    timeline: 85,
    color: '#b27449',
    desc: 'A repeatable 118-step methodology to untangle any organizational complexity.',
    metrics: [
      { label: 'Complexity', value: 78, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 90, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 85, icon: <Clock size={14} /> },
    ],
  },
  {
    id: 2,
    title: 'Comply365 Document Conversion',
    category: 'Enterprise Integration',
    complexity: 92,
    scope: 70,
    timeline: 60,
    color: '#8d4567',
    desc: 'Converting AQP/DIG docs from Word to XTML via automation and version control.',
    metrics: [
      { label: 'Complexity', value: 92, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 70, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 60, icon: <Clock size={14} /> },
    ],
  },
  {
    id: 3,
    title: 'AQP Change Management Integration',
    category: 'Compliance & Orchestration',
    complexity: 85,
    scope: 82,
    timeline: 75,
    color: '#c07a63',
    desc: 'Cross-system compliance integration with audit trails across multiple departments.',
    metrics: [
      { label: 'Complexity', value: 85, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 82, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 75, icon: <Clock size={14} /> },
    ],
  },
  {
    id: 4,
    title: 'N Drive → SharePoint Migration',
    category: 'Digital Transformation',
    complexity: 68,
    scope: 95,
    timeline: 90,
    color: '#5f214d',
    desc: 'Legacy 7-year system migration with legal retention compliance and document verification.',
    metrics: [
      { label: 'Complexity', value: 68, icon: <BarChart3 size={14} /> },
      { label: 'Scope', value: 95, icon: <Zap size={14} /> },
      { label: 'Timeline', value: 90, icon: <Clock size={14} /> },
    ],
  },
];

export default function ProjectGraph() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex];

  const next = () => setActiveIndex((i) => (i + 1) % projects.length);
  const prev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div className="w-full">
      <div className="relative mb-6 overflow-hidden">
        <div
          className="absolute inset-0 rounded-2xl blur-2xl opacity-20"
          style={{ background: project.color }}
        />

        <div
          className="relative card-base border rounded-2xl p-8 md:p-10 transition-all duration-500"
          style={{
            borderColor: `${project.color}40`,
            background: `linear-gradient(135deg, rgba(${parseInt(project.color.slice(1, 3), 16)},${parseInt(project.color.slice(3, 5), 16)},${parseInt(project.color.slice(5, 7), 16)},0.12) 0%, rgba(255,250,246,0.96) 100%)`,
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-baseline gap-2">
              <span
                className="font-display text-5xl font-bold leading-none"
                style={{ color: project.color }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                /04
              </span>
            </div>
            <span
              className="tag text-[11px]"
              style={{
                background: `${project.color}14`,
                borderColor: `${project.color}30`,
                color: project.color,
              }}
            >
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold mb-2 leading-tight" style={{ color: project.color }}>
            {project.title}
          </h3>

          <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            {project.desc}
          </p>

          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: project.color }} className="opacity-70">
                    {m.icon}
                  </span>
                  <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--text-muted)' }}>
                    {m.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(95,33,77,0.12)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${m.value}%`,
                        background: `linear-gradient(90deg, ${project.color}80, ${project.color}cc)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold min-w-[28px] text-right" style={{ color: project.color }}>
                    {m.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={prev}
          className="flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
            background: 'rgba(255,250,246,0.72)',
          }}
          aria-label="Previous project"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center justify-center gap-2 flex-1">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8' : 'w-2 hover:opacity-70'
              }`}
              style={{
                background: i === activeIndex ? p.color : `${p.color}40`,
                opacity: i === activeIndex ? 1 : 0.5,
              }}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
            background: 'rgba(255,250,246,0.72)',
          }}
          aria-label="Next project"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex gap-2 mt-6 flex-wrap">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(i)}
            className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 border"
            style={{
              borderColor: i === activeIndex ? `${p.color}40` : 'var(--border)',
              background: i === activeIndex ? `${p.color}16` : 'rgba(255,250,246,0.6)',
              color: i === activeIndex ? p.color : 'var(--text-secondary)',
            }}
          >
            {p.title.split('—')[0].trim()}
          </button>
        ))}
      </div>
    </div>
  );
}
