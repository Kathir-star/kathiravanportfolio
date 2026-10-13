/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { CredentialsShowcase } from './components/CredentialsShowcase';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { CertificateModal } from './components/CertificateModal';
import { StartupLoader } from './components/StartupLoader';
import { CERTIFICATES_DATA, CertificateItem } from './data/certificatesData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // Active section observer on scroll
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'skills',
      'experience',
      'projects',
      'credentials',
      'achievements',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCertificateById = (certId: string) => {
    const found = CERTIFICATES_DATA.find((c) => c.id === certId);
    if (found) {
      setSelectedCertificate(found);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 75;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#7c3aed]/40 selection:text-white relative">
      {/* Premium Cinematic Startup Loading Experience */}
      <StartupLoader />

      {/* Living Layered Cosmic Environment Canvas */}
      <ParticleBackground />
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content */}
      <main id="main-container" className="relative z-10 snap-y snap-proximity md:snap-mandatory scroll-pt-[75px]">
        {/* 00: Hero Section with single-line KATHIRAVAN V, dual workbench banner, and live terminal */}
        <Hero
          onOpenCredentials={() => scrollToSection('credentials')}
        />

        {/* Decorative Minimal Glass Divider */}
        <SectionDivider accent="purple" />

        {/* 01: About Section */}
        <About />

        {/* Decorative Minimal Glass Divider */}
        <SectionDivider accent="cyan" />

        {/* 02: Technical Skills */}
        <Skills />

        {/* Decorative Minimal Glass Divider */}
        <SectionDivider accent="emerald" />

        {/* 03: Experience & Leadership */}
        <Experience onViewCert={handleOpenCertificateById} />

        {/* Decorative Minimal Glass Divider */}
        <SectionDivider accent="purple" />

        {/* 04: Featured Projects (Compact with custom geometric logos) */}
        <Projects onViewCert={handleOpenCertificateById} />

        {/* Decorative Minimal Glass Divider */}
        <SectionDivider accent="cyan" />

        {/* 05: Verified Credentials & Certifications (Compact 4-column showcase) */}
        <CredentialsShowcase
          onSelectCertificate={(cert) => setSelectedCertificate(cert)}
          onNavigateToProject={() => scrollToSection('projects')}
        />

        {/* Decorative Minimal Glass Divider */}
        <SectionDivider accent="emerald" />

        {/* 06: Hackathons & Honors */}
        <Achievements onViewCert={handleOpenCertificateById} />

        {/* Decorative Minimal Glass Divider */}
        <SectionDivider accent="purple" />

        {/* 07: Contact & Inquiries */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Certificate Detail Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
