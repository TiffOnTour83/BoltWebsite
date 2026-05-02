import { useEffect, useRef, useState, useMemo } from 'react';
import BaseModal from './BaseModal';

interface Props {
  onClose: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle';
}

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useMemo<Particle[]>(() => {
    const colors = ['#c9a04a', '#3bbcbc', '#f7f3ee', '#d9b86a', '#d4814f', '#e8cf9a'];
    return Array.from({ length: 60 }, (_, id) => ({
      id,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 9 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.45 ? 'rect' : 'circle',
    }));
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const canvasEl = canvas;
    const context = ctx;

    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    const pts = particles.map((p) => ({ ...p }));
    const MAX_FRAMES = 90;
    let frame = 0;
    let raf: number;

    function animate() {
      context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      const opacity = Math.max(0, 1 - frame / MAX_FRAMES);

      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28;
        p.rotation += p.rotationSpeed;

        context.save();
        context.globalAlpha = opacity;
        context.translate(p.x, p.y);
        context.rotate((p.rotation * Math.PI) / 180);
        context.fillStyle = p.color;

        if (p.shape === 'circle') {
          context.beginPath();
          context.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }

        context.restore();
      });

      frame++;
      if (frame < MAX_FRAMES) {
        raf = requestAnimationFrame(animate);
      } else {
        context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      }
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      aria-hidden="true"
    />
  );
}

export default function MaintenanceHatch({ onClose }: Props) {
  const [alarming, setAlarming] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const hasFlashed = useRef(false);

  useEffect(() => {
    if (hasFlashed.current) return;
    hasFlashed.current = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      setAlarming(true);
      setShowConfetti(true);
      const alarmTimer = setTimeout(() => setAlarming(false), 1600);
      const confettiTimer = setTimeout(() => setShowConfetti(false), 1800);
      return () => {
        clearTimeout(alarmTimer);
        clearTimeout(confettiTimer);
      };
    }
  }, []);

  return (
    <>
      {showConfetti && <ConfettiCanvas />}
      <BaseModal
        title="Maintenance Hatch"
        onClose={onClose}
        panelClassName={alarming ? 'hatch-alarm' : ''}
      >
        <div className="space-y-3 mb-8">
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            You couldn't leave it alone, could you?
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I respect that.
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I design systems for people like you who can't help but explore how things work.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 btn-primary"
          >
            Close Hatch
          </button>
        </div>
      </BaseModal>
    </>
  );
}
