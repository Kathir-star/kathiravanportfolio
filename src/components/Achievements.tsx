import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Trophy, Award, Rocket, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

interface AchievementsProps {
  onViewCert: (certId: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const Achievements: React.FC<AchievementsProps> = ({ onViewCert }) => {
  const headerMotion = useHeaderAnimation();

  const achievements = [
    {
      title: '1st Place Appreciation Award — PECTEAM 2K26',
      organization: 'PANIMALAR ENGINEERING COLLEGE (AUTONOMOUS)',
      category: 'Conference Innovation Award',
      desc: 'Won 1st Place for demonstrating the live RYDEX IoT Smart Helmet prototype featuring alcohol lockout ignition and automatic accident SMS alerts.',
      icon: Trophy,
      certId: 'pecteam-smart-helmet-award',
      color: '#f59e0b',
      badge: '1st Place Winner',
    },
    {
      title: 'SDGthon 2K26 — 24-Hour Sustainability Hackathon',
      organization: 'SDG CELL & IEEE STUDENT BRANCH',
      category: 'UN SDG Challenge',
      desc: 'Recognized for engineering the RYDEX Smart Helmet system in support of UN Sustainable Development Goal #3 (Good Health & Road Safety).',
      icon: Award,
      certId: 'sdgthon-hackathon',
      color: '#06b6d4',
      badge: 'IEEE Recognized',
    },
    {
      title: 'HACK HUSTLE 2.0 National Hackathon',
      organization: "SAVEETHA ENGINEERING COLLEGE & IIC",
      category: 'National Competition',
      desc: 'Led Team Neural Nexus through a continuous 24-hour national challenge, building and presenting rapid hardware-software solutions.',
      icon: Rocket,
      certId: 'hack-hustle-hackathon',
      color: '#ec4899',
      badge: 'Team Lead',
    },
    {
      title: 'Applied Machine Learning & AI Assessment (193.5h)',
      organization: 'CONFEDERATION OF INDIAN INDUSTRY (CII) & NCVET',
      category: 'National Govt. Accreditation',
      desc: 'Cleared rigorous national assessment in Applied Machine Learning, data preprocessing pipelines, and intelligent predictive models.',
      icon: Sparkles,
      certId: 'cii-ncvet-machine-learning',
      color: '#7c3aed',
      badge: 'NCVET Standard',
    },
    {
      title: 'HackerRank Python (Basic) Skill Certification',
      organization: 'HACKERRANK CERTIFICATION AUTHORITY',
      category: 'Standardized Assessment',
      desc: 'Passed automated timed evaluation verifying core Python programming, data structures, algorithms, and modular coding.',
      icon: ShieldCheck,
      certId: 'hackerrank-python-basic',
      color: '#10b981',
      badge: 'Digitally Verified',
    },
    {
      title: 'Google AI Studio App Deployment Certification',
      organization: 'GUVI x HCLTECH x GOOGLE FOR EDUCATION',
      category: 'Cloud & AI Build Track',
      desc: 'Built and deployed functional AI applications with Google AI Studio and created multilingual speech recognition tools using vibe coding.',
      icon: Trophy,
      certId: 'guvi-google-ai-studio',
      color: '#38bdf8',
      badge: 'Google for Ed Partner',
    },
  ];

  return (
    <section id="achievements" className="relative py-20 border-t border-white/[0.06] bg-[#070709] snap-start scroll-mt-[75px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div {...headerMotion} className="flex items-center gap-4 mb-12">
          <span className="snum">06</span>
          <h2 className="stitle">
            Hackathons &amp; Honors
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>

        {/* Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {achievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="p-5 rounded-2xl bg-[#0d0d12]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-lg backdrop-blur-md hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div
                      className="p-2.5 rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#a78bfa] transition-colors mb-1 leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-[11px] font-mono-code text-white/50 mb-2.5">
                    {item.organization}
                  </div>

                  <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-code">
                  <button
                    onClick={() => onViewCert(item.certId)}
                    className="inline-flex items-center gap-1.5 font-bold text-[#06b6d4] hover:text-[#38bdf8] transition-colors cursor-pointer"
                  >
                    <span>Inspect Evidence</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-emerald-400 font-mono-code">✓ Verified</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
