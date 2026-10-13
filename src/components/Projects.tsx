import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';
import { ArrowUpRight, Github, Info } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

interface ProjectsProps {
  onViewCert?: (certId: string) => void;
}

// ── Custom Project-Specific Vector Marks (Non-Emoji, Geometric & Line-Art) ──
const ProjectLogo: React.FC<{ projectId: string; color: string }> = ({ projectId, color }) => {
  switch (projectId) {
    case 'healthnav-medora':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          <circle cx="12" cy="12" r="2" fill={color} />
        </svg>
      );

    case 'rydex-smart-helmet':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a8 8 0 0 1 16 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z" />
          <path d="M7 14h10" />
          <path d="M12 6v8" />
          <circle cx="12" cy="14" r="1.5" fill={color} />
        </svg>
      );

    case 'stack-sage':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );

    case 'artlane-diaries':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" fill={color} />
        </svg>
      );

    case 'panimalar-smart-bus':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M16 17v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2" />
          <circle cx="7.5" cy="13.5" r="1.5" fill={color} />
          <circle cx="16.5" cy="13.5" r="1.5" fill={color} />
          <line x1="3" y1="9" x2="21" y2="9" />
        </svg>
      );

    case 'replenova-supply-chain':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={color} strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
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

export const Projects: React.FC<ProjectsProps> = ({ onViewCert }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const headerMotion = useHeaderAnimation();

  return (
    <section id="projects" className="relative py-20 border-t border-white/[0.06] bg-[#070709] snap-start scroll-mt-[75px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...headerMotion} className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="snum">04</span>
            <h2 className="stitle">Featured Projects</h2>
            <div className="hidden sm:block w-16 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <span className="text-xs font-mono-code text-white/50">
            {PROJECTS_DATA.length} Engineered Systems
          </span>
        </motion.div>

        {/* ── Staggered Fade-in-up Grid with Floating & Hover Physics ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS_DATA.map((project, index) => {
            const floatDuration = 5 + (index % 3) * 1.5;
            const floatDistance = index % 2 === 0 ? -5 : -3;

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                animate={{
                  y: [0, floatDistance, 0],
                }}
                transition={{
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.4,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
                className="p-5 rounded-2xl bg-[#0d0d12]/90 border border-white/[0.08] hover:border-[#06b6d4]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-[0_12px_40px_-8px_rgba(6,182,212,0.25)] relative overflow-hidden backdrop-blur-md cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Subtle top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: project.accentColor }}
                />

                {/* Subtle glass reflection shimmer on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                <div>
                  {/* Card Top: Small Project Logo & Category Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="p-2 rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-110 shrink-0"
                        style={{ backgroundColor: `${project.accentColor}15` }}
                      >
                        <ProjectLogo projectId={project.id} color={project.accentColor} />
                      </div>
                      <span
                        className="px-2 py-0.5 rounded text-[9px] font-mono-code font-bold uppercase tracking-wider"
                        style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor }}
                      >
                        {project.typeTag}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono-code text-white/40">
                      #{project.badgeNumber}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors mb-1.5 leading-snug">
                    {project.title}
                  </h3>

                  {/* One concise sentence describing project */}
                  <p className="text-xs text-white/70 font-light leading-relaxed mb-4 line-clamp-2">
                    {project.shortDesc}
                  </p>

                  {/* Technology Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technology.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono-code text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technology.length > 4 && (
                      <span className="text-[10px] font-mono-code text-white/40 self-center">
                        +{project.technology.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer: Only real functional links */}
                <div
                  className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs font-mono-code"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2.5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-[#06b6d4] flex items-center gap-1 font-semibold transition-colors"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/60 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-[#06b6d4] hover:text-[#38bdf8] flex items-center gap-1 cursor-pointer font-medium text-[11px]"
                  >
                    <Info className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onViewCert={onViewCert}
      />
    </section>
  );
};
