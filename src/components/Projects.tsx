import { useEffect, useRef, useState } from 'react';
import HubSpoke from './HubSpoke';
import LAMModal from './modals/LAMModal';
import { PAGE_LOAD_TS } from '../lib/pageLoad';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lamOpen, setLamOpen] = useState(false);
  const [lamElapsed, setLamElapsed] = useState(0);

  function openLAM() {
    setLamElapsed(Math.round((performance.now() - PAGE_LOAD_TS) / 1000 * 10) / 10);
    setLamOpen(true);
  }

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
    <>
      <section id="projects" ref={sectionRef} className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(58,1,92,0.22)' }} />
            <span className="text-[#3a015c] text-xs tracking-[0.3em] uppercase font-medium">Work & Projects</span>
          </div>

          <div className="reveal mb-12">
            <h2 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: '#11001c' }}>
              Project Portfolio
            </h2>
            <p className="text-base mt-3 max-w-xl" style={{ color: 'rgba(17,0,28,0.72)' }}>
              Select a project hub to explore its highlights and skills.
            </p>
          </div>

          {/* Hub-and-spoke visualization */}
          <div className="reveal card-base p-6">
            <div className="flex items-center justify-between gap-4 mb-5">
              <p className="text-xs tracking-widest uppercase font-medium" style={{ color: 'rgba(17,0,28,0.60)' }}>
                Project Map
              </p>
              {/* LAM entry point */}
              <button
                onClick={openLAM}
                className="flex-shrink-0 px-3 py-1 rounded border text-xs font-mono tracking-widest transition-all duration-200"
                style={{
                  borderColor: 'rgba(58,1,92,0.30)',
                  background: 'rgba(58,1,92,0.06)',
                  color: '#3a015c',
                }}
                aria-label="Open LAM"
              >
                LAM
              </button>
            </div>
            <HubSpoke />
          </div>
        </div>
      </section>

      {lamOpen && (
        <LAMModal elapsedSeconds={lamElapsed} onClose={() => setLamOpen(false)} />
      )}
    </>
  );
}
