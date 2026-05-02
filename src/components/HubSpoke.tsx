import { useState } from 'react';

interface HubProject {
  id: number;
  title: string;
  titleLines: string[]; // for SVG text wrapping
  category: string;
  color: string;
  highlights: string[];
  skills: string[];
  desc: string;
}

const hubProjects: HubProject[] = [
  {
    id: 1,
    title: 'Document Analysis Framework',
    titleLines: ['Document Analysis', 'Framework'],
    category: 'Systems Thinking',
    color: '#3a015c',
    desc: 'A repeatable 118-step methodology to untangle organizational complexity.',
    highlights: ['Pull the Process', '118-Step Method', 'Untangle', 'Verify Outcomes'],
    skills: ['Process Mapping', 'Automation', 'Risk Assessment', 'Documentation'],
  },
  {
    id: 2,
    title: 'Comply365 Document Conversion',
    titleLines: ['Comply365 Document', 'Conversion'],
    category: 'Enterprise Integration',
    color: '#4f0147',
    desc: 'Automation + version control for AQP/DIG doc conversion (Word → XTML).',
    highlights: ['XTML Conversion', 'Pilot Plugin', 'Version Control', 'Enterprise Scale'],
    skills: ['Comply365 / XTML', 'Power Automate', 'Doc Merging', 'M365'],
  },
  {
    id: 3,
    title: 'AQP Change Management',
    titleLines: ['AQP Change', 'Management'],
    category: 'Compliance',
    color: '#35012c',
    desc: 'Cross-system compliance integration with audit trails across departments.',
    highlights: ['Compliance Bridge', 'Audit Trails', 'Cross-Dept Flow', 'Regulatory Req.'],
    skills: ['Smartsheet', 'AQP Design', 'Change Mgmt', 'SharePoint'],
  },
  {
    id: 4,
    title: 'N Drive → SharePoint Migration',
    titleLines: ['N Drive →', 'SharePoint Migration'],
    category: 'Transformation',
    color: '#11001c',
    desc: 'Legacy migration with retention compliance and verification.',
    highlights: ['Legacy Migration', 'Legal Retention', 'Verification', 'Space Mgmt'],
    skills: ['SharePoint', 'M365 Purview', 'Digital Transform.', 'Legal Compliance'],
  },
];

// SVG layout constants
const W = 840;
const H = 460;
const CX = W / 2; // 420
const CY = H / 2; // 230
const HUB_W = 230;
const HUB_H = 142;
const HUB_X = CX - HUB_W / 2; // 305
const HUB_Y = CY - HUB_H / 2; // 159
const HUB_LEFT_X = HUB_X; // 305
const HUB_RIGHT_X = HUB_X + HUB_W; // 535
const NODE_Y = [105, 185, 275, 355];

const HIGHLIGHT_X = 115;
const SKILL_X = W - HIGHLIGHT_X; // 725
const SKILL_NODE_COLOR = '#8d4567';

function truncate(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function calcHubEdge(nodeY: number, isLeft: boolean) {
  const edgeX = isLeft ? HUB_LEFT_X : HUB_RIGHT_X;
  const t = (nodeY - NODE_Y[0]) / (NODE_Y[NODE_Y.length - 1] - NODE_Y[0]);
  const edgeY = HUB_Y + 20 + t * (HUB_H - 40);
  return { x: edgeX, y: edgeY };
}

function SpokeLines({ project }: { project: HubProject }) {
  const color = project.color;
  return (
    <>
      {project.highlights.map((_, i) => {
        const nodeX = HIGHLIGHT_X;
        const nodeY = NODE_Y[i];
        const edge = calcHubEdge(nodeY, true);
        return (
          <line
            key={`h${i}`}
            x1={edge.x}
            y1={edge.y}
            x2={nodeX}
            y2={nodeY}
            stroke={color}
            strokeWidth="1.7"
            strokeOpacity="0.25"
            strokeDasharray="4 3"
          />
        );
      })}
      {project.skills.map((_, i) => {
        const nodeX = SKILL_X;
        const nodeY = NODE_Y[i];
        const edge = calcHubEdge(nodeY, false);
        return (
          <line
            key={`s${i}`}
            x1={edge.x}
            y1={edge.y}
            x2={nodeX}
            y2={nodeY}
            stroke={SKILL_NODE_COLOR}
            strokeWidth="1.7"
            strokeOpacity="0.20"
            strokeDasharray="4 3"
          />
        );
      })}
    </>
  );
}

function HubRect({ project }: { project: HubProject }) {
  const col = project.color;
  const r = parseInt(col.slice(1, 3), 16);
  const g = parseInt(col.slice(3, 5), 16);
  const b = parseInt(col.slice(5, 7), 16);
  const gradId = `hub-grad-${project.id}`;
  const glowId = `hub-glow-${project.id}`;

  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`rgba(${r},${g},${b},0.12)`} />
          <stop offset="100%" stopColor="rgba(255,250,246,0.92)" />
        </linearGradient>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow shadow */}
      <rect
        x={HUB_X - 6}
        y={HUB_Y - 6}
        width={HUB_W + 12}
        height={HUB_H + 12}
        rx="22"
        fill={`rgba(${r},${g},${b},0.08)`}
        filter={`url(#${glowId})`}
      />

      {/* Main hub rectangle */}
      <rect
        x={HUB_X}
        y={HUB_Y}
        width={HUB_W}
        height={HUB_H}
        rx="18"
        fill={`url(#${gradId})`}
        stroke={col}
        strokeWidth="1.6"
        strokeOpacity="0.50"
      />

      {/* Category label */}
      <text
        x={CX}
        y={HUB_Y + 24}
        textAnchor="middle"
        fontSize="9"
        fill={col}
        fontFamily="Inter, system-ui, sans-serif"
        letterSpacing="0.12em"
        opacity="0.88"
        style={{ textTransform: 'uppercase' }}
      >
        {project.category}
      </text>

      {/* Title lines */}
      {project.titleLines.map((line, i) => (
        <text
          key={i}
          x={CX}
          y={HUB_Y + 52 + i * 22}
          textAnchor="middle"
          fontSize="16"
          fontWeight="650"
          fill="var(--text)"
          fontFamily="'Playfair Display', Georgia, serif"
        >
          {line}
        </text>
      ))}

      {/* Description (short + truncated) */}
      <text
        x={CX}
        y={HUB_Y + HUB_H - 20}
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {truncate(project.desc, 56)}
      </text>
    </>
  );
}

function NodeDot({ x, y, color }: { x: number; y: number; color: string }) {
  return <circle cx={x} cy={y} r="5" fill={color} fillOpacity="0.9" />;
}

export default function HubSpoke() {
  const [activeId, setActiveId] = useState(1);
  const project = hubProjects.find((p) => p.id === activeId) ?? hubProjects[0];

  return (
    <div className="w-full">
      {/* Project selector tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {hubProjects.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className="px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 border"
            style={
              p.id === activeId
                ? {
                    borderColor: 'var(--border-strong)',
                    background: 'rgba(95,33,77,0.10)',
                    color: 'var(--text)',
                    fontWeight: 650,
                  }
                : {
                    borderColor: 'var(--border)',
                    background: 'rgba(255,250,246,0.7)',
                    color: 'var(--text-secondary)',
                  }
            }
          >
            {truncate(p.title.split('→')[0].trim(), 18)}
          </button>
        ))}
      </div>

      {/* SVG visualization */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 320, maxWidth: '100%' }}
          aria-label={`Hub-and-spoke diagram for ${project.title}`}
          role="img"
        >
          {/* Spoke lines */}
          <SpokeLines project={project} />

          {/* Left highlight nodes */}
          {project.highlights.map((label, i) => (
            <g key={`hl${i}`}>
              <NodeDot x={HIGHLIGHT_X} y={NODE_Y[i]} color={project.color} />
              <text
                x={HIGHLIGHT_X - 12}
                y={NODE_Y[i] + 4}
                textAnchor="end"
                fontSize="11"
                fontFamily="Inter, system-ui, sans-serif"
                fill={project.color}
                fontWeight="600"
              >
                {truncate(label, 18)}
              </text>
            </g>
          ))}

          {/* Right skill nodes */}
          {project.skills.map((label, i) => (
            <g key={`sk${i}`}>
              <NodeDot x={SKILL_X} y={NODE_Y[i]} color={SKILL_NODE_COLOR} />
              <text
                x={SKILL_X + 12}
                y={NODE_Y[i] + 4}
                textAnchor="start"
                fontSize="11"
                fontFamily="Inter, system-ui, sans-serif"
                fill={SKILL_NODE_COLOR}
                fontWeight="600"
              >
                {truncate(label, 18)}
              </text>
            </g>
          ))}

          {/* Hub */}
          <HubRect project={project} />
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-3 pl-1">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
            style={{ background: project.color }}
          />
          <span className="text-xs tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Highlights
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ background: SKILL_NODE_COLOR }} />
          <span className="text-xs tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Skills
          </span>
        </div>
      </div>
    </div>
  );
}
