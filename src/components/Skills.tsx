import React from 'react';
import { motion } from 'framer-motion';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';

export const Skills: React.FC = () => {
  const headerMotion = useHeaderAnimation();

  return (
    <section id="skills" className="relative py-20 border-t border-white/[0.06] bg-[#070709] snap-start scroll-mt-[75px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div {...headerMotion} className="flex items-center gap-4 mb-12">
          <span className="snum">02</span>
          <h2 className="stitle">Technical Skills</h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
        </motion.div>

        {/* 6 Skills Cards in a 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Programming */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1">
            <div>
              <div className="text-2xl mb-2">💻</div>
              <div className="text-xs font-mono-code font-bold tracking-wider text-white/50 mb-5 uppercase">
                PROGRAMMING
              </div>
            </div>
            <div className="pt-2">
              <img
                src="https://skillicons.dev/icons?i=python,c,cpp,js,ts,html,css&theme=dark"
                alt="Programming icons"
                className="max-w-full h-auto pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 2: Frameworks & Web */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1">
            <div>
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-xs font-mono-code font-bold tracking-wider text-white/50 mb-5 uppercase">
                FRAMEWORKS &amp; WEB
              </div>
            </div>
            <div className="pt-2">
              <img
                src="https://skillicons.dev/icons?i=react,nodejs,express,tailwind,vite,bootstrap&theme=dark"
                alt="Frameworks icons"
                className="max-w-full h-auto pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 3: ECE / Hardware / IoT */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1">
            <div>
              <div className="text-2xl mb-2">🔌</div>
              <div className="text-xs font-mono-code font-bold tracking-wider text-white/50 mb-4 uppercase">
                ECE / HARDWARE / IOT
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="stag cursor-pointer">ESP32</span>
              <span className="stag cursor-pointer">Arduino</span>
              <span className="stag cursor-pointer">PCB Design</span>
              <span className="stag cursor-pointer">MQ3 Sensor</span>
              <span className="stag cursor-pointer">MPU6050</span>
              <span className="stag cursor-pointer">IR Sensor</span>
              <span className="stag cursor-pointer">ESP-NOW</span>
              <span className="stag cursor-pointer">GNU Octave</span>
              <span className="stag cursor-pointer">Embedded C</span>
            </div>
          </div>

          {/* Card 4: Databases & Cloud */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1">
            <div>
              <div className="text-2xl mb-2">🗄️</div>
              <div className="text-xs font-mono-code font-bold tracking-wider text-white/50 mb-5 uppercase">
                DATABASES &amp; CLOUD
              </div>
            </div>
            <div className="pt-2">
              <img
                src="https://skillicons.dev/icons?i=supabase,mongodb,mysql,firebase,vercel&theme=dark"
                alt="Databases icons"
                className="max-w-full h-auto pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 5: Design & Creative */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1">
            <div>
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-xs font-mono-code font-bold tracking-wider text-white/50 mb-4 uppercase">
                DESIGN &amp; CREATIVE
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="stag cursor-pointer">UI/UX Design</span>
              <span className="stag cursor-pointer">Figma</span>
              <span className="stag cursor-pointer">Graphic Design</span>
              <span className="stag cursor-pointer">Digital Art</span>
              <span className="stag cursor-pointer">Brand Strategy</span>
              <span className="stag cursor-pointer">Prototyping</span>
            </div>
          </div>

          {/* Card 6: Tools & Workflows */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1">
            <div>
              <div className="text-2xl mb-2">🧰</div>
              <div className="text-xs font-mono-code font-bold tracking-wider text-white/50 mb-5 uppercase">
                TOOLS &amp; WORKFLOWS
              </div>
            </div>
            <div className="pt-2">
              <img
                src="https://skillicons.dev/icons?i=git,github,vscode,postman,figma&theme=dark"
                alt="Tools icons"
                className="max-w-full h-auto pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
