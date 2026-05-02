import { useEffect, useRef } from 'react';
import { Mail, Linkedin, MessageSquare } from 'lucide-react';

const availableFor = [
  'Speaking on systems optimization',
  'Consulting on digital transformation & compliance',
  'Mentoring on process improvement',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-4">
          <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(58,1,92,0.22)' }} />
          <span className="text-[#3a015c] text-xs tracking-[0.3em] uppercase font-medium">Get In Touch</span>
        </div>

        <div className="reveal mb-10">
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-4" style={{ color: '#11001c' }}>
            Let's Build Something<br />
            <span className="text-gradient-amethyst">Systematic</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'rgba(17,0,28,0.72)' }}>
            Whether you need a framework built, a messy system untangled, or a perspective on compliance and digital transformation—let's connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact card */}
          <div className="reveal card-base space-y-5">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-1" style={{ color: 'rgba(17,0,28,0.55)' }}>
                Status
              </p>
              <p className="font-medium" style={{ color: '#11001c' }}>Open to Work</p>
              <p className="text-sm" style={{ color: 'rgba(17,0,28,0.70)' }}>
                Systems integration, compliance, and training systems
              </p>
            </div>

            <a href="mailto:tiffanycastro83@yahoo.com" className="flex items-center gap-3 group">
              <div
                className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors"
                style={{
                  background: 'rgba(58,1,92,0.06)',
                  borderColor: 'rgba(58,1,92,0.18)',
                }}
              >
                <Mail size={16} style={{ color: '#3a015c' }} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: 'rgba(17,0,28,0.55)' }}>
                  Email
                </p>
                <p className="text-sm transition-colors" style={{ color: '#3a015c' }}>
                  tiffanycastro83@yahoo.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/tiffany-castro-00679a1a1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div
                className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors"
                style={{
                  background: 'rgba(79,1,71,0.06)',
                  borderColor: 'rgba(79,1,71,0.18)',
                }}
              >
                <Linkedin size={16} style={{ color: '#4f0147' }} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: 'rgba(17,0,28,0.55)' }}>
                  LinkedIn
                </p>
                <p className="text-sm transition-colors" style={{ color: '#4f0147' }}>
                  Connect on LinkedIn
                </p>
              </div>
            </a>
          </div>

          {/* Available for */}
          <div className="reveal card-base">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare size={16} style={{ color: '#3a015c' }} />
              <p className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: '#3a015c' }}>
                Available For
              </p>
            </div>
            <div className="space-y-3">
              {availableFor.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#3a015c' }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(17,0,28,0.72)' }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5" style={{ borderTop: '1px solid rgba(17,0,28,0.10)' }}>
              <a
                href="mailto:tiffanycastro83@yahoo.com"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm tracking-widest uppercase rounded-xl transition-all duration-200 glow-amethyst"
                style={{ background: '#3a015c', color: '#ffffff' }}
              >
                <Mail size={15} />
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
