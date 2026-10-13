import React from 'react';
import { motion } from 'framer-motion';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

interface ExperienceProps {
  onViewCert?: (certId: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onViewCert }) => {
  const headerMotion = useHeaderAnimation();

  return (
    <section id="experience" className="relative py-20 border-t border-white/[0.06] bg-[#070709] snap-start scroll-mt-[75px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...headerMotion} className="flex items-center gap-4 mb-14">
          <span className="snum">03</span>
          <h2 className="stitle">Experience &amp; Leadership</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>

        {/* Connected Vertical Timeline */}
        <div className="relative border-l-2 border-[#06b6d4]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          
          {/* ITEM 1: TRITOCONNECT INTERNSHIP */}
          <div className="relative group">
            {/* Glowing Ring Marker */}
            <div className="absolute -left-[33px] sm:-left-[49px] top-4 w-4 h-4 rounded-full bg-[#070709] border-2 border-[#7c3aed] shadow-[0_0_12px_#7c3aed] transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed]" />
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d12] border border-[#7c3aed]/40 hover:border-[#7c3aed] transition-all shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#a78bfa] transition-colors">
                    PCB Design Hardware Intern
                  </h3>
                  <div className="text-xs font-mono-code text-[#06b6d4] uppercase mt-0.5">
                    TRITOCONNECT TECHNOLOGIES &amp; PROJECT SERVICES (MSME GOVT. OF INDIA)
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-code text-white/60 shrink-0 self-start sm:self-auto">
                  April 10, 2026 – April 24, 2026
                </span>
              </div>

              <p className="text-sm text-white/70 font-light leading-relaxed my-4">
                Completed an intensive hands-on industrial internship focusing on physical circuit design and PCB prototyping. Gained practical experience in schematic capture, component placement, Design Rule Checks (DRC/ERC), and fundamental PCB manufacturing workflows.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="stag">PCB Design</span>
                <span className="stag">Schematic Creation</span>
                <span className="stag">DRC / ERC Checks</span>
                <span className="stag">Hardware Prototyping</span>
                <span className="stag">Circuit Analysis</span>
                {onViewCert && (
                  <button
                    onClick={() => onViewCert('tritoconnect-pcb-internship')}
                    className="stag text-[#06b6d4] hover:text-white hover:border-[#06b6d4] cursor-pointer"
                  >
                    View Verified Certificate →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ITEM 2: ARTLANE DIARIES FOUNDER */}
          <div className="relative group">
            {/* Glowing Ring Marker */}
            <div className="absolute -left-[33px] sm:-left-[49px] top-4 w-4 h-4 rounded-full bg-[#070709] border-2 border-[#06b6d4] shadow-[0_0_12px_#06b6d4] transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-[#06b6d4]/40 transition-all shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#a78bfa] transition-colors">
                    Founder &amp; Creative Lead
                  </h3>
                  <div className="text-xs font-mono-code text-[#06b6d4] uppercase mt-0.5">
                    ARTLANE DIARIES (CREATIVE STARTUP &amp; BRAND)
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-code text-white/60 shrink-0 self-start sm:self-auto">
                  2024 – Present
                </span>
              </div>

              <p className="text-sm text-white/70 font-light leading-relaxed my-4">
                Founded and lead Artlane Diaries — a creative venture specializing in customized artwork, digital portraits, and emotional design. Oversee overall brand identity, digital showroom UI/UX development, client communications, and artistic delivery nationwide.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="stag">Startup Founder</span>
                <span className="stag">UI/UX Design</span>
                <span className="stag">Brand Strategy</span>
                <span className="stag">Digital Art</span>
                <span className="stag">E-Commerce</span>
                <a
                  href="https://artlanediaries.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="stag text-[#f59e0b] hover:text-amber-300 hover:border-[#f59e0b]"
                >
                  Visit Showroom ↗
                </a>
              </div>
            </div>
          </div>

          {/* ITEM 3: PANIMALAR ENGINEERING COLLEGE EDUCATION */}
          <div className="relative group">
            {/* Glowing Ring Marker */}
            <div className="absolute -left-[33px] sm:-left-[49px] top-4 w-4 h-4 rounded-full bg-[#070709] border-2 border-[#06b6d4] shadow-[0_0_12px_#06b6d4] transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-[#06b6d4]/40 transition-all shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#a78bfa] transition-colors">
                    B.E. Electronics &amp; Communication Engineering
                  </h3>
                  <div className="text-xs font-mono-code text-[#06b6d4] uppercase mt-0.5">
                    PANIMALAR ENGINEERING COLLEGE, CHENNAI
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono-code text-white/60 shrink-0 self-start sm:self-auto">
                  2025 – 2029 (Current 2nd Year)
                </span>
              </div>

              <p className="text-sm text-white/70 font-light leading-relaxed my-4">
                Actively building hardware prototypes, IoT systems, signal visualization scripts, and web platforms while maintaining strong academic performance in electronics, signal processing, microcontrollers, and communication systems.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="stag">Electronics Engineering</span>
                <span className="stag">IoT Prototyping</span>
                <span className="stag">Signal Processing</span>
                <span className="stag">Embedded Systems</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
