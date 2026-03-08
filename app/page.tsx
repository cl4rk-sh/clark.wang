"use client";

import { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid-enhanced';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Instagram, Github, Twitter } from 'lucide-react';

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200
      }
    },
    hidden: {
      opacity: 0,
      y: 10,
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out the motion for that "liquid" trailing effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 24); // 24 is half the width (48px)
      cursorY.set(e.clientY - 24); // 24 is half the height (48px)
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    let simulation: webGLFluidEnhanced | null = null;
    
    if (containerRef.current) {
      simulation = new webGLFluidEnhanced(containerRef.current);
      simulation.setConfig({
        simResolution: 256,
        dyeResolution: 1024,
        captureResolution: 512,
        densityDissipation: 1,
        velocityDissipation: 0.2,
        pressure: 0.8,
        pressureIterations: 20,
        curl: 12, // Increased for chaotic, noisier liquid behavior
        splatRadius: 0.25,
        splatForce: 6000,
        shading: true,
        colorful: true,
        colorUpdateSpeed: 10,
        colorPalette: ['#000B18', '#00173D', '#002B5E', '#004A8F', '#0070C0', '#0099DE', '#0A5C36', '#148F55', '#22C55E'],
        hover: true,
        backgroundColor: '#020617', // slate-950 dark glassy look
        transparent: true,
        bloom: true,
        bloomIterations: 8,
        bloomResolution: 256,
        bloomIntensity: 0.3, // Reduced from 0.6
        bloomThreshold: 0.6, // Increased from 0.4
        bloomSoftKnee: 0.7,
        sunrays: true,
        sunraysResolution: 196,
        sunraysWeight: 0.2, // Reduced from 0.5
      });
      simulation.start();
    }
    
    return () => {
      if (simulation) {
        simulation.stop();
      }
    };
  }, []);

  return (
    <main className="min-h-screen w-full relative bg-slate-950 overflow-hidden m-0 p-0 !cursor-none">
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        a, button {
          cursor: none !important;
        }
      `}</style>

      {/* Ambient moving orbs in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, -50, 0], y: [0, -50, 100, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-900/30 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -100, 50, 0], y: [0, 100, -50, 0], scale: [1, 0.8, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 w-[35vw] h-[35vw] rounded-full bg-green-900/20 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 50, -100, 0], y: [0, -100, 50, 0], scale: [1, 1.5, 0.9, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-[45vw] h-[45vw] rounded-full bg-cyan-900/20 blur-[120px]"
        />
      </div>

      <div 
        ref={containerRef} 
        className="w-screen h-screen block absolute inset-0 z-10 !cursor-none" 
      />
      
      {/* Texture Noise Overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Liquid Glass Typewriter Text */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl w-full relative"
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
          }}
        >
          <div className="relative z-10 space-y-6">
            <TypewriterText 
              text="Hi," 
              delay={0.5} 
              className="text-4xl md:text-5xl text-white/90"
            />
            <TypewriterText 
              text="I'm Clark Wang." 
              delay={1.5} 
              className="text-6xl md:text-8xl font-medium text-white tracking-tight"
            />
            <TypewriterText 
              text="Documenting my life soon." 
              delay={3.5} 
              className="text-3xl md:text-4xl text-white/70 italic"
            />
          </div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 1 }}
            className="flex items-center gap-6 mt-12 pointer-events-auto"
          >
            <motion.a
              href="https://www.instagram.com/cl4rk.sh/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg"
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/cl4rk-sh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://x.com/cl4rk_sh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg"
            >
              <Twitter size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Liquid Glass Ball Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 48,
          height: 48,
          // Simplified glass ring/soft dot instead of heavy 3D
          background: 'rgba(255, 255, 255, 0.03)',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />
    </main>
  );
}
