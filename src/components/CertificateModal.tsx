import React, { useEffect } from 'react';
import { CertificateItem } from '../data/certificatesData';
import {
  X,
  ExternalLink,
  Download,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  Building,
  Tag,
  User,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d12] border border-white/15 rounded-3xl shadow-2xl shadow-purple-950/40 flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:px-8 sm:py-5 border-b border-white/10 flex items-center justify-between bg-[#13131a]/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/40 text-[#a78bfa] text-[10px] font-mono-code font-bold uppercase tracking-wider">
              {certificate.category}
            </span>
            {certificate.credentialStatus && (
              <span className="text-xs font-mono-code text-white/50 hidden sm:inline-block">
                • {certificate.credentialStatus}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-1">
          {/* Certificate Image Banner / Fallback */}
          <div className="relative rounded-2xl bg-[#070709] border border-white/10 overflow-hidden shadow-inner min-h-[220px] max-h-[420px] flex items-center justify-center">
            {certificate.image ? (
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-auto max-h-[420px] object-contain mx-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                  const fallback = (e.currentTarget as HTMLElement).nextElementSibling;
                  if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                }}
              />
            ) : null}

            {/* Fallback Display */}
            <div className={`p-8 text-center flex flex-col items-center justify-center ${certificate.image ? 'hidden' : ''}`}>
              <Award className="w-16 h-16 text-[#7c3aed]/50 mb-3" />
              <div className="text-sm font-mono-code font-bold text-white/80">{certificate.title}</div>
              <div className="text-xs font-mono-code text-[#06b6d4] mt-1">{certificate.organization}</div>
              {certificate.file && (
                <a
                  href={certificate.file}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono-code text-xs flex items-center gap-2 border border-white/15"
                >
                  <FileText className="w-4 h-4 text-[#38bdf8]" />
                  <span>Open Attached Document / PDF</span>
                </a>
              )}
            </div>
          </div>

          {/* Title & Core Details */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-2">
              {certificate.title}
            </h3>

            <div className="flex items-center gap-2 text-sm font-mono-code text-[#06b6d4] mb-4">
              <Building className="w-4 h-4 text-[#7c3aed]" />
              <span>{certificate.organization}</span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#13131a] border border-white/[0.06] text-xs font-mono-code">
              <div>
                <div className="text-white/40 text-[10px] uppercase">Issue Date</div>
                <div className="text-white font-medium flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-[#06b6d4]" />
                  <span>{certificate.date || certificate.completionDate || certificate.year || 'Documented'}</span>
                </div>
              </div>

              {certificate.duration && (
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Duration</div>
                  <div className="text-white font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-[#10b981]" />
                    <span>{certificate.duration}</span>
                  </div>
                </div>
              )}

              {certificate.role && (
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Role / Capacity</div>
                  <div className="text-white font-medium flex items-center gap-1 mt-0.5 truncate">
                    <User className="w-3 h-3 text-[#f59e0b]" />
                    <span>{certificate.role}</span>
                  </div>
                </div>
              )}

              {certificate.credentialId && (
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Credential ID</div>
                  <div className="text-white font-medium flex items-center gap-1 mt-0.5 truncate">
                    <Tag className="w-3 h-3 text-[#a78bfa]" />
                    <span className="truncate">{certificate.credentialId}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documented Achievement if applicable */}
          {certificate.achievement && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono-code font-bold text-amber-300 uppercase">
                  Documented Achievement
                </div>
                <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed">
                  {certificate.achievement}
                </p>
              </div>
            </div>
          )}

          {/* Professional Portfolio Description */}
          {certificate.description && (
            <div>
              <h4 className="text-xs font-mono-code uppercase font-bold text-white/50 tracking-wider mb-2">
                Professional Description
              </h4>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                {certificate.description}
              </p>
            </div>
          )}

          {/* Verified Skills / Topics */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div>
              <h4 className="text-xs font-mono-code uppercase font-bold text-white/50 tracking-wider mb-3">
                Documented Skills &amp; Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono-code text-white/90 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:px-8 border-t border-white/10 bg-[#13131a]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {certificate.verificationUrl && (
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono-code text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify on Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {certificate.file && (
              <a
                href={certificate.file}
                target="_blank"
                rel="noreferrer"
                download
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-mono-code text-xs font-medium flex items-center gap-2 border border-white/10 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>Download / Open Asset</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-mono-code text-xs transition-colors"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};
