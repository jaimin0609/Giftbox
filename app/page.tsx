'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import confetti from 'canvas-confetti';

// ============================================
// TYPES
// ============================================
interface AppData {
  photos: string[];
  youtubeId: string;
  cardMessage: string;
  giftMessage: string;
}

// ============================================
// SCROLL INDICATOR COMPONENT
// ============================================
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-rose-300/80"
    >
      <span className="text-sm tracking-widest uppercase font-light">Scroll to continue</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// ANIMATED BACKGROUND COMPONENT
// ============================================
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251,113,133,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 40, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(253,186,116,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// ============================================
// HERO SECTION COMPONENT
// ============================================
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale, y }}
      className="relative min-h-svh flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-rose-300/40"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Decorative heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <motion.span
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block text-5xl md:text-6xl"
          >
            💝
          </motion.span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif mb-6 tracking-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="bg-linear-to-r from-rose-400 via-pink-400 to-rose-500 bg-clip-text text-transparent">
            Happy Birthday
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-8"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="bg-linear-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent">
            Shruti
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-rose-400/90 font-light tracking-wide mb-4"
        >
          A digital love letter, crafted just for you
        </motion.p>

        {/* From line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm md:text-base text-rose-300/70 font-light italic"
        >
          — From your loving husband, Jaimin 💕
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </motion.section>
  );
}

// ============================================
// PHOTO CARD COMPONENT
// ============================================
function PhotoCard({
  photo,
  index,
  onClick
}: {
  photo: string;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '100px' });
  const [isLoaded, setIsLoaded] = useState(false);

  // Cloudinary optimized URLs with blur placeholder
  const getOptimizedUrl = (url: string, width: number) => {
    if (url.includes('cloudinary')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_fill/`);
    }
    return url;
  };

  const thumbUrl = getOptimizedUrl(photo, 400);
  const blurUrl = getOptimizedUrl(photo, 20);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.03, 0.2),
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Blur placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-lg"
        style={{
          backgroundImage: `url(${blurUrl})`,
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease-out'
        }}
      />

      {/* Shimmer loading effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}

      {isInView && (
        <img
          src={thumbUrl}
          alt={`Memory ${index + 1}`}
          loading={index < 8 ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* View indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-white/0 group-hover:text-white/90 transition-all duration-300 text-sm font-medium tracking-wide">
          View
        </span>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// MEMORIES SECTION COMPONENT
// ============================================
function MemoriesSection({
  photos,
  onPhotoClick
}: {
  photos: string[];
  onPhotoClick: (index: number) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-4xl mb-4"
          >
            📸
          </motion.span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4 bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Memories
          </h2>
          <p className="text-rose-400/70 text-lg md:text-xl font-light max-w-md mx-auto">
            Every moment with you is a treasure I hold dear
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {photos.map((photo, index) => (
            <PhotoCard
              key={index}
              photo={photo}
              index={index}
              onClick={() => onPhotoClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// LIGHTBOX COMPONENT
// ============================================
function Lightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate
}: {
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, photos.length, onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      {/* Navigation */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          className="absolute left-2 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        >
          <ChevronDown className="w-6 h-6 text-white rotate-90" />
        </motion.button>
      )}

      {currentIndex < photos.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          className="absolute right-2 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        >
          <ChevronDown className="w-6 h-6 text-white -rotate-90" />
        </motion.button>
      )}

      {/* Image */}
      <motion.img
        key={currentIndex}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        src={currentPhoto.includes('cloudinary')
          ? currentPhoto.replace('/upload/', '/upload/f_auto,q_auto,w_1400/')
          : currentPhoto}
        alt={`Memory ${currentIndex + 1}`}
        className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Counter */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium">
        {currentIndex + 1} / {photos.length}
      </div>
    </motion.div>
  );
}

// ============================================
// VIDEO SECTION COMPONENT
// ============================================
function VideoSection({ youtubeId }: { youtubeId: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 px-4 flex items-center"
    >
      {/* Dark overlay when section is active */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-transparent pointer-events-none"
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-4xl mb-4"
          >
            🎵
          </motion.span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4 bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            A Song For You
          </h2>
          <p className="text-rose-400/70 text-lg md:text-xl font-light max-w-md mx-auto">
            This melody reminds me of us
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-linear-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-2xl opacity-60" />

          {/* Video wrapper with embedded YouTube player */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-2xl border border-rose-200/20 overflow-hidden">
            <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-4 text-rose-400/60 text-sm"
          >
            Click play and use the fullscreen button for the best experience 🎬
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// LOVE LETTER SECTION COMPONENT
// ============================================
function LoveLetterSection({ message }: { message: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Split message into lines
  const lines = message.split('\n').filter(line => line.trim());

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 px-4 flex items-center"
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-4xl mb-4"
          >
            💌
          </motion.span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4 bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            My Love Letter
          </h2>
        </motion.div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-linear-to-br from-rose-500/10 via-pink-500/10 to-rose-500/10 rounded-3xl blur-2xl" />

          {/* Letter */}
          <div className="relative bg-white/5 backdrop-blur-md border border-rose-200/20 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 text-2xl opacity-40">💕</div>
            <div className="absolute top-4 right-4 text-2xl opacity-40">🌹</div>
            <div className="absolute bottom-4 left-4 text-2xl opacity-40">✨</div>
            <div className="absolute bottom-4 right-4 text-2xl opacity-40">💝</div>

            {/* Salutation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-rose-400/80 text-lg md:text-xl italic mb-8 font-light"
            >
              My Dearest Shruti...
            </motion.p>

            {/* Message lines */}
            <div className="space-y-4">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="text-lg md:text-xl lg:text-2xl text-rose-100/90 leading-relaxed font-light"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12 text-right"
            >
              <p className="text-xl md:text-2xl text-rose-300 font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
                Forever & Always ❤️
              </p>
              <p className="text-rose-400/70 text-base md:text-lg mt-2 italic font-light">
                Your loving husband, Jaimin 💍
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// GIFT BOX SVG COMPONENT
// ============================================
function GiftBoxSVG({
  isShaking,
  isOpened,
  isGlowing
}: {
  isShaking: boolean;
  isOpened: boolean;
  isGlowing: boolean;
}) {
  return (
    <div className="relative">
      {/* Glow effect */}
      {isGlowing && !isOpened && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 -m-8 bg-rose-500/30 rounded-full blur-3xl"
        />
      )}

      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="drop-shadow-2xl"
        animate={isShaking ? {
          rotate: [0, -5, 5, -5, 5, 0],
          scale: [1, 1.05, 1, 1.05, 1],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Box Base */}
        <motion.rect
          x="40"
          y="80"
          width="120"
          height="100"
          fill="#f43f5e"
          stroke="#be123c"
          strokeWidth="3"
          rx="5"
        />

        {/* Box Lid */}
        <motion.g
          animate={isOpened ? {
            y: -100,
            rotate: -25,
            opacity: 0,
          } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <rect
            x="35"
            y="60"
            width="130"
            height="30"
            fill="#fb7185"
            stroke="#be123c"
            strokeWidth="3"
            rx="5"
          />
          <rect x="95" y="60" width="10" height="30" fill="#fbbf24" />
        </motion.g>

        {/* Vertical Ribbon */}
        <rect x="95" y="80" width="10" height="100" fill="#fbbf24" />

        {/* Bow */}
        <motion.g
          animate={isOpened ? {
            y: -100,
            rotate: -25,
            opacity: 0,
          } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <ellipse cx="80" cy="50" rx="20" ry="15" fill="#fbbf24" />
          <ellipse cx="120" cy="50" rx="20" ry="15" fill="#fbbf24" />
          <circle cx="100" cy="50" r="8" fill="#f59e0b" />
        </motion.g>

        {/* Sparkles */}
        <motion.g
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        >
          <text x="15" y="40" fontSize="18">✨</text>
          <text x="170" y="60" fontSize="18">✨</text>
          <text x="25" y="150" fontSize="18">✨</text>
          <text x="165" y="170" fontSize="18">✨</text>
        </motion.g>
      </motion.svg>
    </div>
  );
}

// ============================================
// GIFT SECTION COMPONENT
// ============================================
function GiftSection({ giftMessage }: { giftMessage: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [clickCount, setClickCount] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [bgTransition, setBgTransition] = useState(false);

  // Start glowing when in view
  useEffect(() => {
    if (isInView && !isOpened) {
      const timer = setTimeout(() => setIsGlowing(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, isOpened]);

  const handleGiftClick = useCallback(() => {
    if (isOpened) return;

    if (clickCount === 0) {
      // First click - shake
      setIsShaking(true);
      setClickCount(1);
      setTimeout(() => setIsShaking(false), 500);
    } else if (clickCount === 1) {
      // Second click - open
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setIsOpened(true);
        setBgTransition(true);

        // Confetti explosion
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            clearInterval(interval);
            return;
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#fda4af', '#fb7185', '#f43f5e', '#fbbf24', '#f59e0b'],
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#fda4af', '#fb7185', '#f43f5e', '#fbbf24', '#f59e0b'],
          });
        }, 200);

        // Show message after confetti starts
        setTimeout(() => setShowMessage(true), 800);
      }, 600);
    }
  }, [clickCount, isOpened]);

  const getPromptText = () => {
    if (isOpened) return '';
    if (clickCount === 0) return 'Tap the gift to see your surprise! 🎁';
    if (clickCount === 1) return 'One more tap to open! ✨';
    return '';
  };

  return (
    <section
      ref={ref}
      className={`relative min-h-screen py-24 md:py-32 px-4 flex items-center transition-colors duration-1000 ${bgTransition ? 'bg-linear-to-b from-transparent via-rose-500/10 to-transparent' : ''
        }`}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-4xl mb-4"
          >
            🎁
          </motion.span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-4 bg-linear-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Your Surprise
          </h2>
          <motion.p
            animate={{ opacity: isOpened ? 0 : 1 }}
            className="text-rose-400/70 text-lg md:text-xl font-light max-w-md mx-auto"
          >
            {getPromptText()}
          </motion.p>
        </motion.div>

        {/* Gift box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <AnimatePresence mode="wait">
            {!showMessage ? (
              <motion.div
                key="gift"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={!isOpened ? { scale: 1.05 } : {}}
                whileTap={!isOpened ? { scale: 0.95 } : {}}
                onClick={handleGiftClick}
                className={`cursor-pointer ${isOpened ? 'pointer-events-none' : ''}`}
              >
                <GiftBoxSVG
                  isShaking={isShaking}
                  isOpened={isOpened}
                  isGlowing={isGlowing}
                />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="w-full max-w-lg"
              >
                {/* Adventure Card - Like the screenshot */}
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute -inset-4 bg-linear-to-br from-rose-400/30 via-pink-400/20 to-orange-300/20 rounded-3xl blur-2xl" />

                  {/* Main Card */}
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                    {/* Header Banner */}
                    <div className="bg-linear-to-r from-rose-400 via-pink-400 to-rose-500 px-6 py-4 text-center relative overflow-hidden">
                      {/* Decorative stars */}
                      <motion.span
                        className="absolute top-2 right-4 text-2xl"
                        animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >⭐</motion.span>
                      <motion.span
                        className="absolute top-6 right-12 text-lg opacity-70"
                        animate={{ rotate: [0, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                      >✨</motion.span>

                      <p className="text-white/90 text-xs font-medium tracking-widest uppercase mb-1">Birthday Surprise</p>
                      <h3 className="text-white text-xl md:text-2xl font-bold flex items-center justify-center gap-2">
                        <span>🎁</span> A Special Adventure Awaits! <span>🎁</span>
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 md:p-8 space-y-6">
                      {/* Excited emoji */}
                      <motion.div
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.3 }}
                      >
                        <span className="text-5xl">🤩</span>
                      </motion.div>

                      {/* Title */}
                      <div className="text-center">
                        <h4 className="text-gray-800 text-xl md:text-2xl font-bold mb-1">It's a Surprise!</h4>
                        <p className="text-gray-500 text-sm">Something unforgettable is waiting for you... 🥰</p>
                      </div>

                      {/* Date & Who's Going Cards */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div
                          className="bg-rose-50 rounded-xl p-4 text-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <p className="text-rose-400 text-xs font-semibold mb-1 flex items-center justify-center gap-1">
                            <span>📅</span> SAVE THE DATE
                          </p>
                          <p className="text-gray-800 font-bold text-sm md:text-base">Saturday, 4th January 2026</p>
                          <p className="text-rose-500 text-xs mt-1">⏰ Be ready by 8:30 AM</p>
                        </motion.div>
                        <motion.div
                          className="bg-pink-50 rounded-xl p-4 text-center"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <p className="text-pink-400 text-xs font-semibold mb-1 flex items-center justify-center gap-1">
                            <span>👫</span> WHO'S GOING?
                          </p>
                          <p className="text-gray-800 font-bold text-sm md:text-base">Just You & Me</p>
                          <p className="text-pink-500 text-xs mt-1">A date for two! 💑</p>
                        </motion.div>
                      </div>

                      {/* Little Hints */}
                      <motion.div
                        className="bg-amber-50 rounded-xl p-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-amber-600 text-xs font-semibold mb-3 flex items-center gap-1">
                          <span>💡</span> Little Hints
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <span>👗</span> Wear comfortable clothes
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📷</span> Bring your camera!
                          </div>
                          <div className="flex items-center gap-2">
                            <span>☀️</span> Perfect for a sunny day
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🤩</span> You'll LOVE it!
                          </div>
                        </div>
                      </motion.div>

                      {/* Location Secret */}
                      <motion.div
                        className="bg-linear-to-r from-rose-100 to-pink-100 rounded-xl p-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <p className="text-rose-500 text-xs font-semibold mb-1 flex items-center justify-center gap-1">
                          <span>📍</span> LOCATION
                        </p>
                        <p className="text-gray-800 font-bold">Secret! 🤫</p>
                        <p className="text-rose-400 text-xs mt-1">I'll take you there myself 💕</p>
                      </motion.div>

                      {/* CTA Button */}
                      <motion.button
                        className="w-full bg-linear-to-r from-rose-400 to-pink-500 text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <span>💕</span> An Adventure Awaits Us! <span>💕</span>
                      </motion.button>

                      {/* Footer text */}
                      <motion.p
                        className="text-center text-gray-400 text-xs italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        Get ready for the surprise, my love! 🌟 ✨
                      </motion.p>
                    </div>
                  </div>

                  {/* Booking Confirmed Badge */}
                  <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span>✅</span> Booking Confirmed!
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER SECTION COMPONENT
// ============================================
function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-5xl md:text-6xl mb-6"
        >
          💕
        </motion.div>

        <h3
          className="text-2xl md:text-4xl font-serif text-rose-300 mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Made with endless love
        </h3>

        <p className="text-rose-400/60 font-light">
          For my beautiful wife, Shruti
        </p>

        <p className="text-rose-400/40 text-sm mt-8 font-light">
          Shruti & Jaimin • Forever Together • ♾️
        </p>
      </motion.div>
    </section>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function Home() {
  const [appData, setAppData] = useState<AppData>({
    photos: [
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714165/IMG_1782_rgky13.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714148/IMG_2040_xknmlp.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714148/2a9d5d71-0dfd-4ada-9191-d2875b379901_mb6eqf.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714147/0d10884a-e62b-4cef-b4b5-f1047f13d67d_ftdl0t.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714147/4d5b8811-2ff3-40f0-b8d9-f7d577296b1b_xpbrjx.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714146/IMG_7279_buasgy.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714144/f9177054-ea59-410f-b0f9-cb745efa7fb5_hd11q9.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714143/4b9371a5-bc6b-4f44-b124-a852c822ddac_np0iej.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714143/IMG_7996_cattsg.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714142/IMG_2381_xkbpa8.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714142/IMG_8131_kat5wg.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714140/IMG_8890_ndi7vv.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714139/IMG_3220_dfpzxg.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714138/IMG_8834_bqinuw.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714136/6c550aa9-caf2-4c42-8d1e-7ce2d2a53275_o0wszv.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714135/IMG_1238_nhlvxx.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714136/60327820-9f11-422f-88e6-89adce69d37c_uizbox.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714135/DD1FEBCA-12A5-4EAD-B911-D0D520BFCBD6_dx8yan.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714133/IMG_2018_t3f2mu.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714131/IMG_3224_ub2ftq.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714130/IMG_1789_cfbnx4.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714129/9d9dec49-185f-496a-8661-497d2e3c4cf1_qfv98h.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763714129/IMG_2282_upadhp.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763713479/IMG_6691_dsnng0.jpg',
    ],
    youtubeId: '2Vv-BfVoq4g',
    cardMessage: 'Happy Birthday, Shruti! 💙\n\nFrom our first meeting on 02/05/2022 to becoming official on 03/05/2022, every moment with you has been magical. You make my world brighter, my days sweeter, and my heart fuller.\n\nYou are my best friend, my partner, and the love of my life. Here\'s to many more beautiful memories together.\n\nI love you more than words can express. ❤️💙',
    giftMessage: '🎉 Your special surprise is waiting for you!\n\nI\'ve planned something just for YOU... Get ready for an amazing day filled with love and joy! 💝✨',
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Firebase real-time listener
  useEffect(() => {
    if (!db) {
      console.log('Firebase not configured, using default data');
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'config', 'birthday'),
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAppData((prev) => ({
            photos: data.photos || prev.photos,
            youtubeId: data.youtubeId || prev.youtubeId,
            cardMessage: data.cardMessage || prev.cardMessage,
            giftMessage: data.giftMessage || prev.giftMessage,
          }));
        }
      },
      (error) => {
        console.log('Firebase connection not available, using default data');
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="relative bg-[#0c0a09] text-white overflow-x-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Scroll-based sections */}
      <HeroSection />

      <MemoriesSection
        photos={appData.photos}
        onPhotoClick={(index) => setLightboxIndex(index)}
      />

      <VideoSection youtubeId={appData.youtubeId} />

      <LoveLetterSection message={appData.cardMessage} />

      <GiftSection giftMessage={appData.giftMessage} />

      <FooterSection />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={appData.photos}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={(index) => setLightboxIndex(index)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
