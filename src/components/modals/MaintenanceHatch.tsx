import { useEffect, useRef, useState } from 'react';
import BaseModal from './BaseModal';

interface Props {
  onClose: () => void;
}

export default function MaintenanceHatch({ onClose }: Props) {
  const [alarming, setAlarming] = useState(false);
  const hasFlashed = useRef(false);

  useEffect(() => {
    if (hasFlashed.current) return;
    hasFlashed.current = true;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      setAlarming(true);
      const t = setTimeout(() => setAlarming(false), 450);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <BaseModal
      title="Maintenance Hatch"
      onClose={onClose}
      panelClassName={alarming ? 'hatch-alarm' : ''}
    >
      <div className="space-y-3 mb-8">
        <p className="text-warm-300 leading-relaxed">
          You couldn't leave it alone, could you?
        </p>
        <p className="text-warm-300 leading-relaxed">
          I respect that.
        </p>
        <p className="text-warm-300 leading-relaxed">
          I design systems for people like you who can't help but explore how things work.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg bg-teal-700/40 hover:bg-teal-600/50 border border-teal-600/40 hover:border-teal-500/60 text-teal-300 hover:text-teal-200 text-sm font-medium tracking-wide transition-all duration-200"
        >
          Close Hatch
        </button>
      </div>
    </BaseModal>
  );
}
