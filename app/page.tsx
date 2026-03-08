"use client";

import { useEffect, useRef, useState } from 'react';
import webGLFluidEnhanced from 'webgl-fluid-enhanced';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Instagram, Github, Twitter, Mail } from 'lucide-react';

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
  const [hasStarted, setHasStarted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Framer motion values for smooth cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out the motion for that "liquid" trailing effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(touchCheck);

    if (!touchCheck) {
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX - 24);
        cursorY.set(e.clientY - 24);
      };
      
      window.addEventListener('mousemove', moveCursor);
      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    let simulation: webGLFluidEnhanced | null = null;
    
    if (containerRef.current) {
      const isMobile = window.innerWidth < 768;
      simulation = new webGLFluidEnhanced(containerRef.current);
      simulation.setConfig({
        simResolution: isMobile ? 128 : 256,
        dyeResolution: isMobile ? 512 : 1024,
        captureResolution: isMobile ? 256 : 512,
        densityDissipation: 1,
        velocityDissipation: 0.2,
        pressure: 0.8,
        pressureIterations: isMobile ? 10 : 20,
        curl: isMobile ? 8 : 12,
        splatRadius: isMobile ? 0.35 : 0.25,
        splatForce: 6000,
        shading: true,
        colorful: true,
        colorUpdateSpeed: 10,
        colorPalette: ['#000B18', '#00173D', '#002B5E', '#004A8F', '#0070C0', '#0099DE', '#0A5C36', '#148F55', '#22C55E'],
        hover: !isMobile,
        backgroundColor: '#020617',
        transparent: true,
        bloom: !isMobile, // Disable bloom on mobile for performance
        sunrays: !isMobile, // Disable sunrays on mobile
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
    <main className={`min-h-screen w-full relative bg-slate-950 overflow-hidden m-0 p-0 ${isTouch ? '' : '!cursor-none'}`}>
      {!isTouch && (
        <style jsx global>{`
          * {
            cursor: none !important;
          }
          a, button {
            cursor: none !important;
          }
        `}</style>
      )}

      {/* Ambient moving orbs in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 50, -25, 0], y: [0, -25, 50, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-900/20 ${isTouch ? 'blur-[60px]' : 'blur-[120px]'}`}
        />
        <motion.div
          animate={{ x: [0, -50, 25, 0], y: [0, 50, -25, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/2 right-1/4 w-[35vw] h-[35vw] rounded-full bg-green-900/10 ${isTouch ? 'blur-[50px]' : 'blur-[100px]'}`}
        />
        {!isTouch && (
          <motion.div
            animate={{ x: [0, 50, -100, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/3 w-[45vw] h-[45vw] rounded-full bg-cyan-900/10 blur-[120px]"
          />
        )}
      </div>

      <div 
        ref={containerRef} 
        className={`w-screen h-screen block absolute inset-0 z-10 ${isTouch ? '' : '!cursor-none'}`} 
        onClick={() => setHasStarted(true)}
      />
      
      {/* Texture Noise Overlay - Reduced opacity for performance */}
      <div 
        className={`absolute inset-0 z-20 pointer-events-none ${isTouch ? 'opacity-[0.03]' : 'opacity-[0.06]'} mix-blend-screen`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Initial Landing State */}
      {!hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.p
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-white text-center px-4 text-[16px] md:text-[20px] tracking-[0.4em] font-medium uppercase"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {isTouch ? 'Tap to get started' : 'Click to get started'}
            </motion.p>
          </motion.div>
        </div>
      )}
      
      {/* Liquid Glass Typewriter Text */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-6">
        {hasStarted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="max-w-4xl w-full relative"
            style={{
              fontFamily: 'var(--font-instrument-serif), serif',
            }}
          >
            <div className="relative z-10 space-y-4 md:space-y-6">
              <TypewriterText 
                text="Hi," 
                delay={0.5} 
                className="text-3xl md:text-5xl text-white/90"
              />
              <TypewriterText 
                text="I'm Clark Wang." 
                delay={1.5} 
                className="text-5xl md:text-8xl font-medium text-white tracking-tight"
              />
              <TypewriterText 
                text="Documenting my life soon." 
                delay={3.5} 
                className="text-2xl md:text-4xl text-white/70 italic"
              />
            </div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 1 }}
              className="flex items-center gap-4 md:gap-6 mt-8 md:mt-12 pointer-events-auto"
            >
              <motion.a
                href="mailto:me@clark.wang"
                whileHover={isTouch ? {} : { scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <Mail size={isTouch ? 20 : 24} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/cl4rk.sh/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isTouch ? {} : { scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <Instagram size={isTouch ? 20 : 24} />
              </motion.a>
              <motion.a
                href="https://x.com/cl4rk_sh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isTouch ? {} : { scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <Twitter size={isTouch ? 20 : 24} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Liquid Glass Ball Cursor - Hidden on mobile */}
      {!isTouch && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: 48,
            height: 48,
            background: 'rgba(255, 255, 255, 0.03)',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
      )}
    </main>
  );
}
