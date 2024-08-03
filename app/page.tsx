"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { Snowfall } from 'react-snowfall';
import MainCard from '@/components/MainCard';
import { H1, Paragraph } from '@/components/ui/Text';
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 250);

    // Initialize audio
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(`${window.location.origin}/doomsday.mp3`);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnter = () => {
    setEntered(true);
    // Play audio when entering the site
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <main className="min-h-screen w-full relative bg-slate-950">
      <div className="fixed w-full h-full bg-slate-950 bg-cover bg-center flex items-center justify-center p-4" style={{
        backgroundImage: "url('/background.svg')",
      }}>
        <Snowfall color="rgba(224, 242, 254, 0.8)" snowflakeCount={300} />
        <AnimatePresence>
          {!entered && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center w-full h-full bg-slate-950"
            >
              {loading ? (
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              ) : (
                <motion.div 
                  className="max-w-[30rem] justify-center items-center flex flex-col"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Image src="/image.png" alt="Clark Wang" width={120} height={120} className="rounded-xl aspect-square !w-28 !h-28 min-w-[112px] mb-4" />
                  <H1 className="text-white text-center">Welcome to my website</H1>
                  <Paragraph className="text-white !font-extralight text-center">This is where I keep updated information about myself and where I am in life.</Paragraph>
                  <Button 
                    onClick={handleEnter} 
                    variant="flat" 
                    color="secondary" 
                    className="text-white bg-blue-600 border-white shadow-lg shadow-white/20 mt-4" 
                    size="lg"
                  >
                    Click to Enter
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {entered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4"
          >
            <div>
              <MainCard />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}