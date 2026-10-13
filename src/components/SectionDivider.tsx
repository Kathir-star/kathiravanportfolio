import React from 'react';

interface SectionDividerProps {
  accent?: 'purple' | 'cyan' | 'emerald' | 'default';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  accent = 'default',
  className = '',
}) => {
  const getGlowColor = () => {
    switch (accent) {
      case 'purple':
        return 'from-[#7c3aed]/40 via-[#a78bfa]/60 to-[#7c3aed]/40 shadow-[#7c3aed]/30';
      case 'cyan':
        return 'from-[#06b6d4]/40 via-[#38bdf8]/60 to-[#06b6d4]/40 shadow-[#06b6d4]/30';
      case 'emerald':
        return 'from-[#10b981]/40 via-[#34d399]/60 to-[#10b981]/40 shadow-[#10b981]/30';
      default:
        return 'from-[#7c3aed]/35 via-[#06b6d4]/45 to-[#7c3aed]/35 shadow-[#06b6d4]/20';
    }
  };

  const getDiamondColor = () => {
    switch (accent) {
      case 'purple':
        return 'border-[#7c3aed]/60 bg-[#7c3aed]/20 shadow-[#7c3aed]/50 text-[#a78bfa]';
      case 'cyan':
        return 'border-[#06b6d4]/60 bg-[#06b6d4]/20 shadow-[#06b6d4]/50 text-[#38bdf8]';
      case 'emerald':
        return 'border-[#10b981]/60 bg-[#10b981]/20 shadow-[#10b981]/50 text-[#34d399]';
      default:
        return 'border-[#06b6d4]/50 bg-[#06b6d4]/15 shadow-[#06b6d4]/40 text-[#38bdf8]';
    }
  };

  return (
    <div
      className={`relative w-full py-4 flex items-center justify-center overflow-hidden pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Left Fading Light Rail */}
      <div className="flex-1 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-white/[0.18]" />

      {/* Center Minimal Glass Node Capsule */}
      <div className="relative mx-4 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0d12]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]">
        {/* Soft Ambient Inner Glow */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${getGlowColor()} opacity-20 blur-[6px]`}
        />

        {/* Left Nano Dot */}
        <div className="w-1 h-1 rounded-full bg-white/25" />

        {/* Center Illuminated Geometric Prism Diamond */}
        <div
          className={`w-2 h-2 rotate-45 rounded-[1px] border shadow-[0_0_8px] transition-all duration-300 ${getDiamondColor()}`}
        />

        {/* Right Nano Dot */}
        <div className="w-1 h-1 rounded-full bg-white/25" />
      </div>

      {/* Right Fading Light Rail */}
      <div className="flex-1 max-w-xl h-[1px] bg-gradient-to-l from-transparent via-white/[0.08] to-white/[0.18]" />
    </div>
  );
};
