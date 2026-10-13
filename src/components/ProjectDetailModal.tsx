import React, { useEffect } from 'react';
import { ProjectItem } from '../data/projectsData';
import { X, Github, ArrowUpRight, Award, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onViewCert?: (certId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onViewCert,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0d0d12]/95 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:px-6 sm:py-4 border-b border-white/10 flex items-center justify-between bg-[#13131a]/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }}
            >
              CASE STUDY {project.badgeNumber} • {project.typeTag}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              {project.shortDesc}
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <span className="text-[10px] font-mono-code font-bold text-red-400 uppercase tracking-wider block mb-1">
                PROBLEM STATEMENT
              </span>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-mono-code font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                ENGINEERED SOLUTION
              </span>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <div className="text-xs font-mono-code uppercase font-bold text-white/50 tracking-wider mb-2">
              Key Capabilities &amp; Features
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution & Outcome */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs space-y-2">
            <div>
              <span className="text-white/40 font-mono-code uppercase text-[10px] block">
                My Contribution:
              </span>
              <span className="text-white/90 font-light">{project.myContribution}</span>
            </div>
            <div>
              <span className="text-white/40 font-mono-code uppercase text-[10px] block">
                Engineering Result:
              </span>
              <span className="text-[#06b6d4] font-medium">{project.result}</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-[10px] font-mono-code uppercase font-bold text-white/40 mb-2">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technology.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono-code text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:px-6 border-t border-white/10 bg-[#13131a]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-white text-black font-mono-code text-xs font-bold flex items-center gap-1.5 hover:bg-white/90 transition-all cursor-pointer shadow-md"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-mono-code text-xs flex items-center gap-1.5 border border-white/10 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {project.relatedCertId && onViewCert && (
              <button
                onClick={() => {
                  onClose();
                  onViewCert(project.relatedCertId!);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#7c3aed]/15 hover:bg-[#7c3aed]/25 text-[#a78bfa] font-mono-code text-xs font-semibold flex items-center gap-1.5 border border-[#7c3aed]/30 transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>View Certificate</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-mono-code text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
