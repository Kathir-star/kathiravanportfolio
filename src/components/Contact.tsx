import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  Download,
  Send,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const Contact: React.FC = () => {
  const headerMotion = useHeaderAnimation();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const email = 'kathir.ven07@gmail.com';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Open default mail client with prefilled body
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-white/[0.06] bg-[#070709] snap-start scroll-mt-[75px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div {...headerMotion} className="flex items-center gap-4 mb-14">
          <span className="snum">07</span>
          <h2 className="stitle">
            Get In Touch
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Let's engineer something meaningful.
            </h3>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Whether you are interested in hardware collaborations, embedded IoT prototyping, research internships, or full-stack software development — my inbox is always open.
            </p>

            {/* Direct Copy Cards */}
            <div className="space-y-3 pt-2">
              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-[#0d0d12] border border-white/[0.08] flex items-center justify-between gap-3 group hover:border-[#7c3aed]/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-[#7c3aed]/15 text-[#a78bfa] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono-code text-white/40 uppercase">Email</div>
                    <div className="text-xs sm:text-sm font-mono-code font-bold text-white truncate">
                      {email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(email)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono-code text-white/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-white/10"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#0d0d12] border border-white/[0.08] flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#10b981]/15 text-[#10b981] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono-code text-white/40 uppercase">Location</div>
                  <div className="text-xs sm:text-sm font-mono-code font-bold text-white">
                    Chennai, Tamil Nadu, India
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Resume Links */}
            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="https://github.com/Kathir-star"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#13131a] hover:bg-[#1a1a24] text-white text-xs font-mono-code flex items-center gap-2 border border-white/10 transition-colors"
              >
                <Github className="w-4 h-4 text-white/70" />
                <span>github.com/Kathir-star</span>
                <ArrowUpRight className="w-3 h-3 text-white/40" />
              </a>

              <a
                href="https://linkedin.com/in/kathiravan-v"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#13131a] hover:bg-[#1a1a24] text-white text-xs font-mono-code flex items-center gap-2 border border-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#06b6d4]" />
                <span>linkedin.com/in/kathiravan-v</span>
                <ArrowUpRight className="w-3 h-3 text-white/40" />
              </a>

              <a
                href="/Kathiravan_V_CV.pdf"
                download="Kathiravan_V_CV.pdf"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed]/20 to-[#06b6d4]/20 hover:from-[#7c3aed]/30 hover:to-[#06b6d4]/30 text-white text-xs font-mono-code flex items-center gap-2 border border-[#7c3aed]/40 transition-colors"
              >
                <Download className="w-4 h-4 text-purple-300" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d12] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#06b6d4]" />
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-white">
                    Send Direct Dispatch
                  </span>
                </div>
                <span className="text-[11px] font-mono-code text-white/40">
                  Response within 24h
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-code text-white/50 uppercase mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#13131a] border border-white/10 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] text-xs font-mono-code text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-code text-white/50 uppercase mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#13131a] border border-white/10 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] text-xs font-mono-code text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code text-white/50 uppercase mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="IoT Project Collaboration / Internship Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#13131a] border border-white/10 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] text-xs font-mono-code text-white placeholder-white/20 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-code text-white/50 uppercase mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Kathiravan, I saw your RYDEX smart helmet and embedded systems work..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#13131a] border border-white/10 focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] text-xs font-mono-code text-white placeholder-white/20 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-mono-code font-bold text-xs uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-900/30"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSent ? 'Opening Mail Client...' : 'Dispatch Message'}</span>
                </button>

                {isSent && (
                  <p className="text-center text-xs font-mono-code text-emerald-400 mt-2">
                    ✓ Mail client initiated with prefilled dispatch details!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
