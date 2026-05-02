import { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  shortTitle: string;
  category: string;
  complexity: number;
  scope: number;
  timeline: number;
  color: string;
  accent: string;
  tagColor: string;
  desc: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Document Analysis Framework — "Pull the Process"',
    shortTitle: 'Pull the Process',
    category: 'Systems Thinking',
    complexity: 78,
    scope: 90,
    timeline: 85,
    color: '#c9a04a',
    accent: 'rgba(201,160,74,0.15)',
    tagColor: 'bg-gold-800/60 text-gold-300',
    desc: 'A repeatable 118-step methodology to untangle any organizational complexity.',
  },
  {
    id: 2,
    title: 'Comply365 Document Conversion',
    shortTitle: 'Comply365 Migration',
    category: 'Enterprise Integration',
    complexity: 92,
    scope: 70,
    timeline: 60,
    color: '#3bbcbc',
    accent: 'rgba(59,188,188,0.15)',
    tagColor: 'bg-teal-800/60 text-teal-300',
    desc: 'Converting AQP/DIG docs from Word to XTML via automation and version control.',
  },
  {
    id: 3,
    title: 'AQP Change Management Integration',
    shortTitle: 'AQP Change Mgmt',
    category: 'Compliance & Orchestration',
    complexity: 85,
    scope: 82,
    timeline: 75,
    color: '#d4814f',
    accent: 'rgba(212,129,79,0.15)',
    tagColor: 'bg-copper-600/30 text-copper-300',
    desc: 'Cross-system compliance integration with audit trails across multiple departments.',
  },
  {
    id: 4,
    title: 'N Drive → SharePoint Migration',
    shortTitle: 'SharePoint Migration',
    category: 'Digital Transformation',
    complexity: 68,
    scope: 95,
    timeline: 90,
    color: '#e8cf9a',
    accent: 'rgba(232,207,154,0.12)',
    tagColor: 'bg-warm-200/10 text-warm-200',
    desc: 'Legacy 7-year system migration with legal retention compliance and document verification.',
  },
];

export default function ProjectGraph() {
  const [active, setActive] = useState<Project | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  const handleEnter = (p: Project, e: React.MouseEvent) => {
    setActive(p);
    const rect = graphRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMove = (e: React.MouseEvent) => {
    if (!active) return;
    const rect = graphRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleLeave = () => {
    setActive(null);
    setTooltip(null);
  };

  const GRAPH_W = 100;
  const GRAPH_H = 100;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-3">
        <p className="text-warm-300/60 text-xs tracking-widest uppercase">Complexity →</p>
        <p className="text-warm-300/60 text-xs tracking-widest uppercase">↑ Scope</p>
      </div>

      <div
        ref={graphRef}
        className="relative w-full rounded-xl border border-teal-800/30 bg-navy-900/60 overflow-visible cursor-crosshair"
        style={{ paddingBottom: '56%' }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[25, 50, 75].map((v) => (
            <g key={v}>
              <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(59,188,188,0.06)" strokeWidth="0.4" />
              <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(59,188,188,0.06)" strokeWidth="0.4" />
            </g>
          ))}
          <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(59,188,188,0.15)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="100" stroke="rgba(59,188,188,0.15)" strokeWidth="0.5" />

          {/* Connecting lines between points */}
          {projects.map((p, i) =>
            projects.slice(i + 1).map((q) => (
              <line
                key={`${p.id}-${q.id}`}
                x1={p.complexity}
                y1={100 - p.scope}
                x2={q.complexity}
                y2={100 - q.scope}
                stroke="rgba(201,160,74,0.08)"
                strokeWidth="0.6"
                strokeDasharray="2 3"
              />
            ))
          )}

          {/* Plot points */}
          {projects.map((p) => (
            <g key={p.id}>
              {/* Pulse ring */}
              <circle
                cx={p.complexity}
                cy={100 - p.scope}
                r="5"
                fill="none"
                stroke={p.color}
                strokeWidth="0.5"
                opacity="0.3"
              />
              {/* Main dot */}
              <circle
                cx={p.complexity}
                cy={100 - p.scope}
                r="3"
                fill={p.color}
                stroke={p.color}
                strokeWidth="1"
                opacity={active && active.id !== p.id ? 0.4 : 1}
                style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => handleEnter(p, e as unknown as React.MouseEvent)}
              />
              {/* Label */}
              <text
                x={p.complexity + 4}
                y={100 - p.scope - 2}
                fontSize="4"
                fill={p.color}
                opacity={active && active.id !== p.id ? 0.3 : 0.9}
                style={{ pointerEvents: 'none', transition: 'opacity 0.2s' }}
              >
                {p.shortTitle}
              </text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {active && tooltip && (
          <div
            className="absolute z-20 pointer-events-none rounded-lg border p-3 w-52 text-sm backdrop-blur-md"
            style={{
              left: tooltip.x + 12,
              top: tooltip.y - 60,
              background: 'rgba(10,22,40,0.95)',
              borderColor: active.color,
              boxShadow: `0 0 20px ${active.accent}`,
              transform: tooltip.x > 60 ? 'translateX(-110%)' : undefined,
            }}
          >
            <p className="font-semibold text-warm-100 mb-1 text-xs leading-snug">{active.title}</p>
            <p className="text-warm-300/70 text-xs leading-snug mb-2">{active.desc}</p>
            <div className="flex gap-2 flex-wrap">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: active.accent, color: active.color }}
              >
                {active.category}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {projects.map((p) => (
          <button
            key={p.id}
            className="flex items-center gap-2 text-xs transition-opacity"
            style={{ opacity: active && active.id !== p.id ? 0.4 : 1 }}
            onMouseEnter={() => setActive(p)}
            onMouseLeave={() => setActive(null)}
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: p.color }}
            />
            <span className="text-warm-300/80">{p.shortTitle}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
