import React from 'react';
import { motion } from 'framer-motion';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

export const About: React.FC = () => {
  const headerMotion = useHeaderAnimation();

  return (
    <section id="about" className="relative py-20 border-t border-white/[0.06] bg-[#070709] snap-start scroll-mt-[75px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...headerMotion} className="flex items-center gap-4 mb-12">
          <span className="snum">01</span>
          <h2 className="stitle">About Me</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>

        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative Text */}
          <div className="lg:col-span-7 space-y-5 text-white/75 text-sm sm:text-base font-light leading-relaxed">
            <p>
              I'm pursuing <strong className="text-white font-semibold">Electronics &amp; Communication Engineering</strong> at{' '}
              <strong className="text-white font-semibold">Panimalar Engineering College</strong> (2025–2029) — but I've never
              stayed inside one box. I build IoT systems with real microcontrollers and sensors, then context-switch to
              designing web UIs that feel sharp and intentional.
            </p>
            <p>
              Somewhere at the intersection of <strong className="text-white font-semibold">hardware and software</strong>,
              between circuits and interfaces, I found my craft. I care about how physical hardware operates at the signal level
              and how web applications feel at the user level.
            </p>
            <p>
              I've completed <strong className="text-white font-semibold">Python Full Stack, Industrial PCB Design Training at Tritoconnect Technologies, and NCVET-recognised Machine Learning &amp; AI courses with CII &amp; HP</strong>.
              I also run <strong className="text-white font-semibold">Artlane Diaries</strong> — a creative brand blending personalized artwork with emotion and design.
            </p>
            <p className="font-mono-code text-xs sm:text-sm text-[#06b6d4] pt-2">
              The mindset: learn hard, build honestly, ship consistently.
            </p>
          </div>

          {/* Right Info Cards Stack */}
          <div className="lg:col-span-5 space-y-3">
            
            <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono-code text-white/40 tracking-wider uppercase">DEGREE</span>
              <span className="text-xs sm:text-sm font-semibold text-white text-right">B.E. Electronics &amp; Comm.</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono-code text-white/40 tracking-wider uppercase">COLLEGE</span>
              <span className="text-xs sm:text-sm font-semibold text-white text-right">Panimalar Eng. College</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono-code text-white/40 tracking-wider uppercase">GRADUATION</span>
              <span className="text-xs sm:text-sm font-semibold text-white text-right">Expected 2029 (2nd Year)</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono-code text-white/40 tracking-wider uppercase">INTERNSHIP</span>
              <span className="text-xs sm:text-sm font-semibold text-white text-right">PCB Design — Tritoconnect</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono-code text-white/40 tracking-wider uppercase">STARTUP</span>
              <span className="text-xs sm:text-sm font-semibold text-white text-right">Artlane Diaries — Founder</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono-code text-white/40 tracking-wider uppercase">STATUS</span>
              <span className="text-xs sm:text-sm font-mono-code font-bold text-[#10b981] flex items-center gap-1.5 text-right">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>Learning + Building</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
