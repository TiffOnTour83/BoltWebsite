import { useState } from 'react';
import MaintenanceHatch from './modals/MaintenanceHatch';

export default function Footer() {
  const [hatchOpen, setHatchOpen] = useState(false);

  return (
    <>
      <footer className="relative z-10 border-t py-8 px-6" style={{ borderColor: 'rgba(17,0,28,0.10)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg" style={{ color: '#3a015c' }}>
              TC
            </span>
            <span className="text-xs" style={{ color: 'rgba(17,0,28,0.35)' }}>
              ·
            </span>
            <span className="text-xs tracking-wide" style={{ color: 'rgba(17,0,28,0.62)' }}>
              Atlanta, Georgia
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(58,1,92,0.55)' }} />
            <span className="text-xs tracking-wide" style={{ color: 'rgba(17,0,28,0.55)' }}>
              Systems integration · compliance · training systems
            </span>
          </div>

          <p className="text-xs" style={{ color: 'rgba(17,0,28,0.45)' }}>
            &copy; {new Date().getFullYear()} Tiffany Castro
          </p>
        </div>

        {/* Maintenance Hatch — larger hit area */}
        <div className="max-w-6xl mx-auto mt-4 flex justify-center">
          <button
            onClick={() => setHatchOpen(true)}
            className="text-xs tracking-widest transition-colors duration-300 font-mono px-6 py-3 rounded-lg"
            style={{
              color: 'rgba(58,1,92,0.70)',
              background: 'rgba(58,1,92,0.06)',
              border: '1px solid rgba(58,1,92,0.18)',
            }}
            aria-label="Open Maintenance Hatch"
          >
            ⌘ Maintenance Hatch
          </button>
        </div>
      </footer>

      {hatchOpen && <MaintenanceHatch onClose={() => setHatchOpen(false)} />}
    </>
  );
}
