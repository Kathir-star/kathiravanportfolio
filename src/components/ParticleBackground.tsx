import React, { useEffect, useRef } from 'react';

interface CosmicParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  glow: boolean;
  glowRadius?: number;
  parallaxFactor: number;
  waveOffset: number;
  waveSpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

interface CosmicClickGlow {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  primaryColor: string;
  sparkles: Sparkle[];
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let centerX = width * 0.5;
    let centerY = height * 0.5;

    // Smooth interpolated mouse offset for gentle 3D parallax
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetOffsetX = (e.clientX - centerX) * 0.7;
      targetOffsetY = (e.clientY - centerY) * 0.7;
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width * 0.5;
      centerY = height * 0.5;
    };
    window.addEventListener('resize', handleResize);

    // ── THEME PALETTES (Purple, Cyan, Sky Blue, Emerald, White) ──
    const cosmicPalettes = [
      { primary: 'rgba(124, 58, 237, ', glow: '#7c3aed' }, // Purple
      { primary: 'rgba(6, 182, 212, ', glow: '#06b6d4' },   // Cyan
      { primary: 'rgba(56, 189, 248, ', glow: '#38bdf8' },  // Sky Blue
      { primary: 'rgba(16, 185, 129, ', glow: '#10b981' },  // Emerald
      { primary: 'rgba(255, 255, 255, ', glow: '#ffffff' }, // Starlight
    ];

    // ── CLICK-TRIGGERED CIRCULAR COSMIC GLOW RIPPLES ──
    const clickGlows: CosmicClickGlow[] = [];
    let glowCounter = 0;
    let lastClickTime = 0;

    const triggerClickGlowAt = (clientX: number, clientY: number) => {
      const now = performance.now();
      // Debounce threshold for rapid pointerdown+click double-firings
      if (now - lastClickTime < 30) return;
      lastClickTime = now;

      const theme =
        cosmicPalettes[Math.floor(Math.random() * (cosmicPalettes.length - 1))];

      // Generate soft micro starlight particles emanating from the exact click location
      const sparkles: Sparkle[] = [];
      const sparkCount = 6;
      for (let s = 0; s < sparkCount; s++) {
        const angle = (Math.PI * 2 * s) / sparkCount + Math.random() * 0.5;
        const speed = Math.random() * 1.4 + 0.6;
        sparkles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 1.1 + 0.7,
          alpha: 0.8,
          decay: Math.random() * 0.02 + 0.02,
          color: theme.primary,
        });
      }

      clickGlows.push({
        id: ++glowCounter,
        x: clientX,
        y: clientY,
        radius: 2,
        maxRadius: Math.min(width, height) * 0.15 + 48,
        alpha: 0.75,
        decay: 0.024,
        primaryColor: theme.primary,
        sparkles,
      });

      if (clickGlows.length > 8) {
        clickGlows.shift();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      triggerClickGlowAt(e.clientX, e.clientY);
    };

    const handleClick = (e: MouseEvent) => {
      triggerClickGlowAt(e.clientX, e.clientY);
    };

    // Passive global window event listeners so standard button & link clicks operate freely
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    // ── 3 DISTINCT COSMIC DEPTH LAYERS ──
    const particles: CosmicParticle[] = [];
    const screenArea = width * height;
    const baseCount = Math.min(Math.floor(screenArea / 14000), 95);

    // LAYER 1: Deep Dim Stars (Background)
    const layer1Count = Math.floor(baseCount * 0.55);
    for (let i = 0; i < layer1Count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = Math.random() * 0.3 + 0.12;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        radius: Math.random() * 0.6 + 0.35,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.018 + 0.006,
        twinklePhase: Math.random() * Math.PI * 2,
        color: 'rgba(255, 255, 255, ',
        glow: false,
        parallaxFactor: 0.008, // Lowest parallax response
        waveOffset: Math.random() * 100,
        waveSpeed: Math.random() * 0.004 + 0.002,
      });
    }

    // LAYER 2: Middle Floating Particles
    const layer2Count = Math.floor(baseCount * 0.32);
    for (let i = 0; i < layer2Count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = Math.random() * 0.35 + 0.28;
      const theme = cosmicPalettes[Math.floor(Math.random() * cosmicPalettes.length)];
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 0.8 + 0.8,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.024 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: theme.primary,
        glow: false,
        parallaxFactor: 0.022, // Moderate parallax response
        waveOffset: Math.random() * 100,
        waveSpeed: Math.random() * 0.008 + 0.004,
      });
    }

    // LAYER 3: Foreground Bright Nodes
    const layer3Count = Math.floor(baseCount * 0.13);
    for (let i = 0; i < layer3Count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = Math.random() * 0.4 + 0.5;
      const theme = cosmicPalettes[i % (cosmicPalettes.length - 1)];
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.1 + 1.3,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        color: theme.primary,
        glow: true,
        glowRadius: Math.random() * 6 + 4,
        parallaxFactor: 0.042, // Strongest parallax response
        waveOffset: Math.random() * 100,
        waveSpeed: Math.random() * 0.01 + 0.005,
      });
    }

    let time = 0;

    // ── RENDER LOOP (Optimized requestAnimationFrame) ──
    const render = () => {
      time += 0.015;

      // Smooth lerp mouse parallax easing
      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.045;
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.045;

      ctx.clearRect(0, 0, width, height);

      // Ambient Nebula Clouds
      const nebula1X = width * 0.25 + Math.sin(time * 0.2) * 35 + currentOffsetX * 0.008;
      const nebula1Y = height * 0.28 + Math.cos(time * 0.18) * 25 + currentOffsetY * 0.008;
      const grad1 = ctx.createRadialGradient(
        nebula1X, nebula1Y, 10,
        nebula1X, nebula1Y, Math.min(width, height) * 0.5
      );
      grad1.addColorStop(0, 'rgba(124, 58, 237, 0.05)');
      grad1.addColorStop(0.6, 'rgba(124, 58, 237, 0.012)');
      grad1.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const nebula2X = width * 0.78 + Math.cos(time * 0.22) * 40 + currentOffsetX * 0.01;
      const nebula2Y = height * 0.72 + Math.sin(time * 0.25) * 30 + currentOffsetY * 0.01;
      const grad2 = ctx.createRadialGradient(
        nebula2X, nebula2Y, 10,
        nebula2X, nebula2Y, Math.min(width, height) * 0.48
      );
      grad2.addColorStop(0, 'rgba(6, 182, 212, 0.04)');
      grad2.addColorStop(0.6, 'rgba(6, 182, 212, 0.01)');
      grad2.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render 3-Layer Particles
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Autonomous drift with sinusoidal wave floating
        p.baseX += p.vx;
        p.baseY += p.vy;
        p.waveOffset += p.waveSpeed;

        const waveX = Math.cos(p.waveOffset) * 0.25;
        const waveY = Math.sin(p.waveOffset) * 0.25;

        // Wrap around boundaries
        const buffer = 20;
        if (p.baseX < -buffer) p.baseX = width + buffer;
        if (p.baseX > width + buffer) p.baseX = -buffer;
        if (p.baseY < -buffer) p.baseY = height + buffer;
        if (p.baseY > height + buffer) p.baseY = -buffer;

        const drawX = p.baseX + waveX + currentOffsetX * p.parallaxFactor;
        const drawY = p.baseY + waveY + currentOffsetY * p.parallaxFactor;

        p.twinklePhase += p.twinkleSpeed;
        const twinkleDelta = Math.sin(p.twinklePhase) * 0.25;
        const currentAlpha = Math.min(
          1,
          Math.max(0.08, p.baseAlpha + twinkleDelta)
        );

        // Soft Radial Aura Glow for Foreground Nodes
        if (p.glow && p.glowRadius) {
          const auraGrad = ctx.createRadialGradient(
            drawX,
            drawY,
            0,
            drawX,
            drawY,
            p.glowRadius
          );
          auraGrad.addColorStop(0, `${p.color}${currentAlpha * 0.35})`);
          auraGrad.addColorStop(0.5, `${p.color}${currentAlpha * 0.1})`);
          auraGrad.addColorStop(1, `${p.color}0)`);

          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle Core
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();
      }

      // ── Render Click Cosmic Glows ──
      for (let rIdx = clickGlows.length - 1; rIdx >= 0; rIdx--) {
        const r = clickGlows[rIdx];

        r.radius += (r.maxRadius - r.radius) * 0.08 + 1.8;
        r.alpha -= r.decay;

        if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
          clickGlows.splice(rIdx, 1);
          continue;
        }

        // Soft Circular Cosmic Glow (expanding outward & fading gracefully)
        const glowGrad = ctx.createRadialGradient(
          r.x,
          r.y,
          Math.max(0, r.radius - 24),
          r.x,
          r.y,
          r.radius + 12
        );
        glowGrad.addColorStop(0, `${r.primaryColor}0)`);
        glowGrad.addColorStop(0.5, `${r.primaryColor}${r.alpha * 0.22})`);
        glowGrad.addColorStop(0.85, `${r.primaryColor}${r.alpha * 0.55})`);
        glowGrad.addColorStop(1, `${r.primaryColor}0)`);

        ctx.save();
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius + 12, 0, Math.PI * 2);
        ctx.fill();

        // Subtle Shockwave Ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.primaryColor}${r.alpha * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Micro Starlight Sparkles
        for (let sIdx = r.sparkles.length - 1; sIdx >= 0; sIdx--) {
          const sp = r.sparkles[sIdx];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.alpha -= sp.decay;

          if (sp.alpha <= 0.02) {
            r.sparkles.splice(sIdx, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${sp.color}${sp.alpha})`;
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 transform-gpu"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
};
