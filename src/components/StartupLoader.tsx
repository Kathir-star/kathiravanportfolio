import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface StartupLoaderProps {
  onComplete?: () => void;
}

export const StartupLoader: React.FC<StartupLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'init' | 'identity' | 'ready'>('init');
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Name letters for refined staggered reveal
  const nameLetters = 'KATHIRAVAN V'.split('');

  // 14 subtle initial cosmic stars
  const initialStars = [
    { top: '15%', left: '18%', size: 2, delay: 0.1 },
    { top: '22%', left: '76%', size: 1.5, delay: 0.25 },
    { top: '35%', left: '12%', size: 2, delay: 0.15 },
    { top: '48%', left: '88%', size: 1.5, delay: 0.35 },
    { top: '65%', left: '22%', size: 2.5, delay: 0.2 },
    { top: '78%', left: '72%', size: 2, delay: 0.4 },
    { top: '28%', left: '42%', size: 1.5, delay: 0.3 },
    { top: '82%', left: '38%', size: 2, delay: 0.25 },
    { top: '12%', left: '60%', size: 2, delay: 0.18 },
    { top: '58%', left: '80%', size: 1.5, delay: 0.42 },
    { top: '72%', left: '15%', size: 2, delay: 0.32 },
    { top: '88%', left: '85%', size: 1.5, delay: 0.48 },
  ];

  useEffect(() => {
    // Check if user already saw the intro in this browsing session
    const hasSeenIntro = sessionStorage.getItem('kv_portfolio_intro_shown');

    // If reduced motion or already seen in current session, fast-track exit
    if (shouldReduceMotion || hasSeenIntro === 'true') {
      const quickTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, shouldReduceMotion ? 40 : 180);
      return () => clearTimeout(quickTimer);
    }

    // Phase 1 -> Phase 2 (Identity reveal at 400ms)
    const p1 = setTimeout(() => {
      setPhase('identity');
    }, 400);

    // Progress line animation incrementing to 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 90);

    // Phase 2 -> Phase 3 (Ready state at 1350ms)
    const p2 = setTimeout(() => {
      setPhase('ready');
      setProgress(100);
    }, 1350);

    // Completion & Dissolve (1700ms)
    const p3 = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('kv_portfolio_intro_shown', 'true');
      onComplete?.();
    }, 1700);

    // Hard safety timer: Guarantee overlay NEVER traps the user
    const safetyTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2400);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(safetyTimer);
      clearInterval(progressInterval);
    };
  }, [shouldReduceMotion, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="startup-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            transition: { duration: 0.55, ease: 'easeOut' },
          }}
          className="fixed inset-0 z-[9999] bg-[#070709] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Initializing portfolio archive"
        >
          {/* Subtle Background Cosmic Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-gradient-to-tr from-[#7c3aed]/14 via-[#06b6d4]/10 to-transparent rounded-full blur-[110px] pointer-events-none" />

          {/* Micro HUD Technical Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Phase A: Soft Emerging Background Cosmic Particles */}
          {initialStars.map((star, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.75, 0.4, 0.8], scale: [0.5, 1, 0.8, 1] }}
              transition={{
                delay: star.delay,
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              className="absolute rounded-full bg-cyan-200 pointer-events-none shadow-[0_0_6px_rgba(6,182,212,0.8)]"
            />
          ))}

          {/* Thin Scanning Laser Line */}
          <motion.div
            initial={{ y: '-100vh', opacity: 0 }}
            animate={{ y: '100vh', opacity: [0, 0.8, 0.8, 0] }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 0.2,
            }}
            className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#06b6d4]/50 to-transparent pointer-events-none shadow-[0_0_12px_#06b6d4]"
          />

          {/* Top Telemetry Bar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono-code text-white/40 tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span>SYS.BOOT // ARCHIVE V2.6</span>
            </div>
            <div className="hidden sm:block text-white/30">
              PEC // ECE &amp; FULL-STACK
            </div>
          </div>

          {/* Central HUD Card Container */}
          <div className="relative max-w-xl w-full py-10 px-8 sm:px-12 flex flex-col items-center justify-center text-center">
            {/* Fine HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-cyan-500/40" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-cyan-500/40" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-purple-500/40" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-purple-500/40" />

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] sm:text-[11px] font-mono-code text-[#06b6d4] tracking-widest uppercase mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-ping" />
              <span>
                {phase === 'init'
                  ? 'INITIALIZING ENGINEERING ARCHIVE'
                  : phase === 'identity'
                  ? 'SYSTEM ARCHIVE ONLINE'
                  : 'READY // LAUNCHING EXPERIENCE'}
              </span>
            </motion.div>

            {/* Phase B: Identity Reveal with Staggered Letter Animation */}
            <div className="flex items-center justify-center gap-0.5 sm:gap-1 my-2 select-none">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.15 + index * 0.035,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase whitespace-nowrap inline-block"
                  style={{
                    textShadow: '0 4px 20px rgba(124, 58, 237, 0.45), 0 0 30px rgba(6, 182, 212, 0.25)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
              className="text-[10px] sm:text-xs font-mono-code text-white/60 tracking-widest uppercase mt-2"
            >
              HARDWARE <span className="text-[#06b6d4]">·</span> EMBEDDED SYSTEMS <span className="text-[#7c3aed]">·</span> SOFTWARE
            </motion.p>

            {/* Phase C: Minimal Technical Progress Bar */}
            <div className="w-48 sm:w-64 h-[1.5px] bg-white/10 rounded-full mt-7 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7c3aed] via-[#06b6d4] to-[#10b981]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Micro Telemetry Details */}
            <div className="mt-3 text-[10px] font-mono-code text-white/35 flex items-center gap-3">
              <span>INITIALIZED {progress}%</span>
              <span>•</span>
              <span>PORT: 3000</span>
            </div>
          </div>

          {/* HUD Bottom Info Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono-code text-white/30 tracking-wider">
            <div>LOC // CHENNAI, IN [13.0827° N, 80.2707° E]</div>
            <div>STATUS // ACTIVE</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
