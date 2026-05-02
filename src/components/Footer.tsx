import { useState } from 'react';
import MaintenanceHatch from './modals/MaintenanceHatch';

export default function Footer() {
  const [hatchOpen, setHatchOpen] = useState(false);

  return (
    <>
      <footer className="relative z-10 border-t border-teal-800/20 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-gold-300 text-lg">TC</span>
            <span className="text-warm-300/40 text-xs">·</span>
            <span className="text-warm-300/50 text-xs tracking-wide">FOP | AQP Sr. Specialist</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse-slow" />
            <span className="text-warm-300/40 text-xs tracking-wide">Delta Air Lines · Pilot Learning &amp; Development</span>
          </div>
          <p className="text-warm-300/30 text-xs">
            &copy; {new Date().getFullYear()} Tiffany Castro
          </p>
        </div>

        {/* Maintenance Hatch micro-link */}
        <div className="max-w-6xl mx-auto mt-4 flex justify-center">
          <button
            onClick={() => setHatchOpen(true)}
            className="text-warm-300/20 hover:text-warm-300/50 text-[11px] tracking-widest transition-colors duration-300 font-mono"
          >
            Maintenance Hatch
          </button>
        </div>
      </footer>

      {hatchOpen && <MaintenanceHatch onClose={() => setHatchOpen(false)} />}
    </>
  );
}
