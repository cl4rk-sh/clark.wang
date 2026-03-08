"use client";

import { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid-enhanced';
import { motion, useMotionValue, useSpring } from 'framer-motion';

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
        curl: 5,
        splatRadius: 0.25,
        splatForce: 6000,
        shading: true,
        colorful: true,
        colorUpdateSpeed: 10,
        colorPalette: ['#000B18', '#00173D', '#002B5E', '#004A8F', '#0070C0', '#0099DE'],
        hover: true,
        backgroundColor: '#020617', // slate-950 dark glassy look
        transparent: false,
        bloom: true,
        bloomIterations: 8,
        bloomResolution: 256,
        bloomIntensity: 0.6,
        bloomThreshold: 0.4,
        bloomSoftKnee: 0.7,
        sunrays: true,
        sunraysResolution: 196,
        sunraysWeight: 0.5,
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
      <div 
        ref={containerRef} 
        className="w-screen h-screen block absolute inset-0 !cursor-none" 
      />
      
      {/* Liquid Glass Ball Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 48,
          height: 48,
          // Custom glassmorphism / liquid ball styling
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.05) 70%, transparent 100%)',
          boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.4), inset -5px -5px 15px rgba(0, 0, 0, 0.3), 0 5px 20px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      />
    </main>
  );
}
