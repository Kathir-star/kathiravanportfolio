import React, { useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { CERTIFICATES_DATA, CertificateItem } from '../data/certificatesData';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';
import {
  Search,
  Award,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sparkles,
  Calendar,
  Layers,
  ShieldCheck,
  Cpu,
  Briefcase,
  FileText
} from 'lucide-react';

interface CredentialsShowcaseProps {
  onSelectCertificate: (cert: CertificateItem) => void;
  onNavigateToProject?: (projectTitle: string) => void;
}

// ── Framer Motion Staggered Variants ──
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const CredentialsShowcase: React.FC<CredentialsShowcaseProps> = ({
  onSelectCertificate,
}) => {
  const headerMotion = useHeaderAnimation();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'ALL', label: 'All' },
    { id: 'ACHIEVEMENTS', label: 'Achievements' },
    { id: 'INTERNSHIPS', label: 'Internships' },
    { id: 'HACKATHONS', label: 'Hackathons' },
    { id: 'TECHNICAL', label: 'Certifications' },
    { id: 'COURSES', label: 'Courses' },
    { id: 'WORKSHOPS', label: 'Workshops' },
    { id: 'AWARDS', label: 'Awards' },
    { id: 'LEADERSHIP', label: 'Leadership' },
  ];

  // Filter and search
  const filteredCertificates = useMemo(() => {
    return CERTIFICATES_DATA.filter((item) => {
      const matchCategory =
        activeCategory === 'ALL' || item.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.skills.some((s) => s.toLowerCase().includes(q)) ||
        (item.credentialId && item.credentialId.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'ACHIEVEMENTS':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'INTERNSHIPS':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'HACKATHONS':
        return 'bg-pink-500/15 text-pink-400 border-pink-500/30';
      case 'TECHNICAL':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'WORKSHOPS':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'AWARDS':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'LEADERSHIP':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default:
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    }
  };

  return (
    <section id="credentials" className="relative py-20 border-t border-white/[0.06] bg-[#070709] snap-start scroll-mt-[75px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div {...headerMotion} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono-code text-sm text-[#7c3aed] font-bold">05</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Verified Credentials &amp; Certifications
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/60 font-light">
              Authentic credentials verified from official issuing organizations and institutions.
            </p>
          </div>

          {/* Quick Count Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#13131a] border border-white/10 font-mono-code text-xs text-white/80 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
            <span>{CERTIFICATES_DATA.length} Verified Documents</span>
          </div>
        </motion.div>

        {/* Search & Category Filter Strip */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#0d0d12] border border-white/[0.08] mb-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, skill, org, ID..."
              className="w-full pl-9 pr-4 py-1.5 bg-[#13131a] border border-white/10 rounded-xl text-xs font-mono-code text-white placeholder:text-white/40 focus:outline-none focus:border-[#7c3aed]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-mono-code text-white/50 hover:text-white"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => {
              const count =
                cat.id === 'ALL'
                  ? CERTIFICATES_DATA.length
                  : CERTIFICATES_DATA.filter((c) => c.category === cat.id).length;

              if (count === 0 && cat.id !== 'ALL') return null;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-bold shadow-sm'
                      : 'bg-[#13131a] text-white/60 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1 py-0.2 rounded text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4-COLUMN RESPONSIVE COMPACT GRID WITH FRAMER MOTION ── */}
        {filteredCertificates.length > 0 ? (
          <motion.div
            key={activeCategory + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredCertificates.map((cert) => {
              return (
                <motion.article
                  key={cert.id}
                  variants={cardVariants}
                  onClick={() => onSelectCertificate(cert)}
                  className="rounded-xl bg-[#0d0d12] border border-white/[0.08] hover:border-[#7c3aed]/40 transition-all duration-200 flex flex-col justify-between group overflow-hidden shadow-md cursor-pointer"
                >
                  <div>
                    {/* Thumbnail Image Header with Graceful Fallback */}
                    <div className="relative h-36 bg-[#070709] border-b border-white/[0.06] overflow-hidden flex items-center justify-center">
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                            const fallback = (e.currentTarget as HTMLElement).nextElementSibling;
                            if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                          }}
                        />
                      ) : null}

                      {/* Fallback Display if image is missing or errors */}
                      <div className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#13131a] to-[#070709] text-white/40 ${cert.image ? 'hidden' : ''}`}>
                        <Award className="w-8 h-8 text-[#7c3aed]/60 mb-1" />
                        <span className="text-[10px] font-mono-code text-white/60 tracking-wider uppercase text-center line-clamp-1">
                          {cert.organization}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent pointer-events-none" />

                      {/* Category Tag */}
                      <div className="absolute top-2 left-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-mono-code font-bold uppercase tracking-wider border backdrop-blur-md ${getCategoryBadge(
                            cert.category
                          )}`}
                        >
                          {cert.category}
                        </span>
                      </div>

                      {/* View Hover Prompt */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-2.5 py-1 rounded-md bg-white text-black text-[11px] font-mono-code font-bold flex items-center gap-1 shadow-lg">
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5">
                      <div className="flex items-center justify-between text-[10px] font-mono-code text-white/40 mb-1">
                        <span>{cert.date || cert.year}</span>
                        {cert.credentialStatus && (
                          <span className="text-emerald-400 truncate max-w-[120px]">
                            {cert.credentialStatus}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-bold text-white group-hover:text-[#a78bfa] transition-colors leading-snug line-clamp-2 mb-1">
                        {cert.title}
                      </h3>

                      <div className="text-[11px] font-mono-code text-white/50 line-clamp-1 mb-2">
                        {cert.organization}
                      </div>

                      <p className="text-[11px] text-white/70 font-light line-clamp-2 leading-relaxed mb-3">
                        {cert.description}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[9px] font-mono-code text-white/60"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="text-[9px] font-mono-code text-white/40 self-center">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-3.5 py-2.5 bg-[#13131a]/60 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono-code">
                    <span className="text-[#06b6d4] group-hover:text-[#38bdf8] flex items-center gap-1 font-semibold">
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </span>
                    {cert.verificationUrl ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    ) : cert.file ? (
                      <span className="text-white/40 flex items-center gap-1 text-[10px]">
                        <FileText className="w-3 h-3 text-[#38bdf8]" />
                        <span>Document</span>
                      </span>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12 px-4 rounded-xl bg-[#0d0d12] border border-white/[0.06]">
            <p className="text-xs font-mono-code text-white/50 mb-2">
              No credentials found matching your filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#7c3aed] text-white text-xs font-mono-code cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
