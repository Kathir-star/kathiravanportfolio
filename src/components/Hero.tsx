import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenCredentials?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [typedText, setTypedText] = useState('');

  const phrases = [
    'ECE Student.',
    'Full Stack Developer.',
    'IoT Builder.',
    'UI/UX Designer.',
    'Creative Founder.',
  ];

  useEffect(() => {
    let pi = 0;
    let ci = 0;
    let del = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const w = phrases[pi];
      if (!del) {
        ci++;
        setTypedText(w.slice(0, ci));
        if (ci === w.length) {
          del = true;
          timeoutId = setTimeout(type, 1900);
          return;
        }
      } else {
        ci--;
        setTypedText(w.slice(0, ci));
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
          timeoutId = setTimeout(type, 350);
          return;
        }
      }
      timeoutId = setTimeout(type, del ? 55 : 90);
    };

    timeoutId = setTimeout(type, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  const portfolioLetters = 'PORTFOLIO'.split('');

  const letterVariants: Variants = {
    initial: { y: 20, opacity: 0, scale: 0.92 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.06 + i * 0.04,
        duration: 0.45,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="hero" className="relative pt-20 pb-10 overflow-hidden snap-start scroll-mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── ORIGINAL COMPACT RATIO BOX WITH BOLD ANIMATED "PORTFOLIO" ── */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl mb-8 relative bg-[#0d0d12] p-4 sm:p-6 group">
          {/* Subtle Ambient Cosmic Glows */}
          <div className="absolute -top-16 left-1/4 w-48 h-48 bg-[#7c3aed]/18 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-16 right-1/4 w-48 h-48 bg-[#06b6d4]/15 rounded-full blur-[60px] pointer-events-none" />

          {/* Micro Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Header Sub-Bar: Compact Telemetry */}
          <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-white/[0.06] text-xs font-mono-code relative z-10">
            <div className="flex items-center gap-2 text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-bold">
                SYS // ONLINE • KATHIRAVAN V
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono-code text-white/40">
              <span className="px-2 py-0.2 rounded bg-white/[0.04] border border-white/[0.06] text-[#38bdf8]">
                ECE &amp; DEV
              </span>
              <span>2025–2029</span>
            </div>
          </div>

          {/* ── BOLD ANIMATED "PORTFOLIO" (Fits original box ratio cleanly) ── */}
          <div className="relative z-10 py-2 sm:py-3 flex flex-col items-center justify-center text-center">
            {/* Top Micro Tag */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[9px] sm:text-[10px] font-mono-code font-semibold text-[#06b6d4] uppercase tracking-widest mb-2 backdrop-blur-md"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#38bdf8]" />
              <span>Interactive Engineering Archive</span>
            </motion.div>

            {/* Letter-by-Letter BOLD Animated PORTFOLIO */}
            <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 md:gap-2.5 select-none my-1">
              {portfolioLetters.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{
                    scale: 1.12,
                    y: -4,
                    color: '#38bdf8',
                    textShadow:
                      '0 0 20px rgba(6, 182, 212, 0.8), 0 0 35px rgba(124, 58, 237, 0.5)',
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 14 }}
                  className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white cursor-pointer inline-block transition-all duration-200"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 900,
                    textShadow: `
                      0 2px 8px rgba(0, 0, 0, 0.8),
                      0 4px 20px rgba(124, 58, 237, 0.3)
                    `,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Bottom Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-[10px] sm:text-xs font-mono-code font-medium text-white/50 tracking-wider uppercase mt-2"
            >
              Hardware Prototyping <span className="text-[#06b6d4] mx-1">•</span> Embedded Systems <span className="text-[#7c3aed] mx-1">•</span> Web Platforms
            </motion.p>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/20 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/20 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/20 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/20 rounded-br-sm pointer-events-none" />
        </div>

        {/* HERO INNER TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* HERO LEFT CONTENT */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0d0d12]/90 border border-[#7c3aed]/40 text-xs font-mono-code text-[#06b6d4] mb-5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="tracking-wider">SYS.ONLINE // ECE &amp; DEV // HARDWARE + SOFTWARE</span>
            </div>

            {/* Greet */}
            <div className="flex items-center gap-2 text-xs font-mono-code tracking-widest text-white/60 mb-2 uppercase">
              <img
                src="https://user-images.githubusercontent.com/18350557/176309783-0785949b-9127-417c-8b55-ab5a4333674e.gif"
                alt="wave"
                className="w-5 h-5 inline-block"
              />
              <span>HEY THERE, I'M</span>
            </div>

            {/* Main Name Heading: 100% SINGLE CONTINUOUS LINE ON DESKTOP */}
            <div className="hname-wrap mb-2">
              <h1 className="hname">
                KATHIRAVAN V
              </h1>
            </div>

            {/* Sub-heading accent */}
            <div className="hname-accent mb-3 text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">
              Developer &amp; ECE Innovator.
            </div>

            {/* Typewriter text */}
            <div className="h-7 mb-4 flex items-center font-mono-code text-sm sm:text-base text-[#06b6d4]">
              <span>{typedText}</span>
              <span className="inline-block w-2 h-4 bg-[#06b6d4] ml-1 animate-pulse" />
            </div>

            {/* Lead Bio */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-5 font-light max-w-2xl">
              <strong className="text-white font-semibold">
                ECE Undergraduate at Panimalar Engineering College
              </strong>{' '}
              building at the intersection of circuits, sensors, and code. I design clean web UIs, ship
              full-stack applications, and wire up real IoT hardware — all while running{' '}
              <strong className="text-white font-semibold">Artlane Diaries</strong>, my creative venture.
              Still learning. Always shipping.
            </p>

            {/* Badges Strip */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="hbadge">🇮🇳 Chennai, India</span>
              <span className="hbadge">⚡ ECE + Dev + Design</span>
              <span className="hbadge">🎓 PEC Class of 2029</span>
              <span className="hbadge">🤝 Open to Collab</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a href="#projects" className="btn-g">
                View Projects →
              </a>
              <a
                href="https://www.linkedin.com/in/kathiravan-v-160555395"
                target="_blank"
                rel="noreferrer"
                className="btn-o"
              >
                LinkedIn ↗
              </a>
              <a
                href="/Kathiravan_V_CV.pdf"
                download="Kathiravan_V_CV.pdf"
                className="btn-cv"
              >
                ↓ Download Resume
              </a>
            </div>

            {/* Profile Views Badge */}
            <div className="mt-0.5">
              <img
                src="https://komarev.com/ghpvc/?username=Kathir-star&style=flat-square&color=7c3aed&label=Profile+Views"
                alt="Profile Views"
                className="rounded"
              />
            </div>
          </div>

          {/* HERO RIGHT MEDIA / TERMINAL */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="term">
              <div className="tdots">
                <span className="tr"></span>
                <span className="ty"></span>
                <span className="tg"></span>
              </div>
              <div className="text-xs sm:text-sm font-mono-code space-y-1 text-white/90">
                <div>
                  <span className="k">const</span> engineer = {'{'}
                </div>
                <div className="pl-4">
                  name: <span className="s">"Kathiravan V"</span>,
                </div>
                <div className="pl-4">
                  college: <span className="s">"Panimalar Engineering College"</span>,
                </div>
                <div className="pl-4">
                  stack: <span className="v">["ECE","MERN","IoT","ESP32"]</span>,
                </div>
                <div className="pl-4">
                  mode: <span className="p">building</span> + <span className="p">shipping</span>,
                </div>
                <div className="pl-4">
                  goal: <span className="s">"build real physical &amp; web systems"</span>
                </div>
                <div>
                  {'}'}; <span className="tcur"></span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
