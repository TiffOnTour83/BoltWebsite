import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  /** CSS color like: rgba(58,1,92, */
  color: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getRootVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '').trim();
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  if (full.length !== 6) return null;
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbaPrefixFromToken(varName: string, fallbackHex: string) {
  const token = getRootVar(varName, fallbackHex);
  const rgb = hexToRgb(token) || hexToRgb(fallbackHex) || { r: 58, g: 1, b: 92 };
  return `rgba(${rgb.r},${rgb.g},${rgb.b},`;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pull colors from theme tokens (single source of truth)
    const c1 = rgbaPrefixFromToken('--accent', '#3a015c');
    const c2 = rgbaPrefixFromToken('--accent-2', '#4f0147');
    const c3 = rgbaPrefixFromToken('--accent-3', '#35012c');
    const colors = [c1, c2, c3];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 9500), 120);

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      size: Math.random() * 2.15 + 0.65,
      opacity: Math.random() * 0.55 + 0.22,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = (now: number) => {
      const t = (now - startRef.current) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particlesRef.current;

      // Pulse between "more connected" and "more sparse" every ~18s
      const pulse = (Math.sin((Math.PI * 2 * t) / 18) + 1) / 2; // 0..1
      const connectDist = 135 + pulse * 120; // 135..255

      // Draw connections (fade based on distance + pulse)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            // Stronger lines when pulse is high
            const base = 1 - dist / connectDist;
            const alpha = clamp(base * (0.16 + pulse * 0.22), 0, 0.42);

            ctx.beginPath();
            ctx.strokeStyle = `${c1}${alpha})`;
            ctx.lineWidth = 1.35;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} aria-hidden="true" />;
}
