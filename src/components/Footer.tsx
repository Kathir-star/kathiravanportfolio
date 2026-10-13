import React from 'react';
import { ArrowUp, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/[0.06] bg-[#070709] text-white/50 text-xs font-mono-code snap-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-white font-bold tracking-wider">KATHIRAVAN V</span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="text-white/40">B.E. ECE • Panimalar Engineering College '29</span>
        </div>

        <div className="flex items-center gap-2 text-white/40">
          <ShieldCheck className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>All credentials verified against source documents</span>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-[#13131a] hover:bg-[#1a1a24] border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-[11px]">Top</span>
        </button>
      </div>
    </footer>
  );
};
