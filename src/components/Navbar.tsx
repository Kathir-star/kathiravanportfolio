import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(scroll);
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 75;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#7c3aed] via-[#06b6d4] to-[#10b981] z-[100] transition-all duration-75 ease-out shadow-[0_0_12px_#7c3aed]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Navbar */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070709]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981] animate-pulse" />
            <span className="font-bold text-base sm:text-lg tracking-wider text-white uppercase group-hover:text-[#a78bfa] transition-colors">
              KATHIRAVAN V
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-sm text-white/70">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono-code font-medium hover:text-white ${
                    isActive ? 'text-white font-bold' : 'text-white/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Resume / CV Button */}
            <a
              href="/Kathiravan_V_CV.pdf"
              download="Kathiravan_V_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#7c3aed]/25 hover:bg-[#7c3aed]/40 text-white border border-[#7c3aed]/50 text-xs font-mono-code font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_-3px_rgba(124,58,237,0.4)]"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="/Kathiravan_V_CV.pdf"
              download="Kathiravan_V_CV.pdf"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono-code text-white bg-[#7c3aed]/30 border border-[#7c3aed]/50 rounded-lg"
            >
              <ArrowDown className="w-3 h-3" />
              <span>CV</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white/80 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 mx-4 p-4 rounded-2xl bg-[#0d0d12]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/[0.08]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-3 py-2 text-xs font-mono-code rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#7c3aed]/20 text-white border border-[#7c3aed]/40 font-bold'
                      : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <a
              href="/Kathiravan_V_CV.pdf"
              download="Kathiravan_V_CV.pdf"
              className="w-full mt-2 py-2 px-4 text-center text-xs font-mono-code font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-lg shadow-lg flex items-center justify-center gap-2"
            >
              <ArrowDown className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
};
