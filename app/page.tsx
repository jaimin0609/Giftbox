'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Headphones, BookHeart, Gift, X, ChevronLeft } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import confetti from 'canvas-confetti';

type ViewState = 'intro' | 'menu' | 'photos' | 'video' | 'card' | 'gift' | 'timeline' | 'cake';

interface AppData {
  photos: string[];
  youtubeId: string;
  cardMessage: string;
  giftMessage: string;
}

export default function Home() {
  const [view, setView] = useState<ViewState>('intro');
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCut, setCakeCut] = useState(false);
  const [wishMade, setWishMade] = useState(false);
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
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763713479/IMG_4273_sqwjzg.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763713478/IMG_7771_xvlzeq.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763713477/d267a174-bc85-45b8-a418-b62aba4489c6_udjqkd.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763713477/IMG_1782_vbixow.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763713476/5977028c-2089-4312-a1c9-f76437107817_carrve.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763712926/015873e0-3491-4841-be62-bd5f935e6e22_uppuos.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763712724/d2d60043-9226-4abd-8ab2-2667c55e156d_lr57y0.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763712724/4caa2ed6-1e1e-48b5-9dac-938364c11263_cb7z31.jpg',
      'https://res.cloudinary.com/djhid28ds/image/upload/v1763712724/53d83a98-c8b5-48c1-855d-a15a34b6d39d_a6j2nd.jpg',
    ],
    youtubeId: '2Vv-BfVoq4g',
    cardMessage: 'Happy Birthday, Shruti! 💙\n\nFrom our first meeting on 02/05/2022 to becoming official on 03/05/2022, every moment with you has been magical. You make my world brighter, my days sweeter, and my heart fuller.\n\nYou are my best friend, my partner, and the love of my life. Here\'s to many more beautiful memories together.\n\nI love you more than words can express. ❤️💙',
    giftMessage: '🎉 Your special surprise is waiting for you!\n\nI\'ve planned something just for YOU... Get ready for an amazing day filled with love and joy! 💝✨',
  });

  // Timeline milestone photos
  const timelinePhotos = {
    phoneCalls: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712724/53d83a98-c8b5-48c1-855d-a15a34b6d39d_a6j2nd.jpg',
    firstMeeting: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712725/1be065fb-a556-43d0-8858-01efa9c60958_dtrguk.jpg',
    wedding: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712725/7ee6158b-943d-4cad-b83a-491e3d58f1a6_obngar.jpg',
    honeymoon: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712725/IMG_6691_v24eus.jpg',
    longDistance: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712724/IMG_1366_rxfnmz.jpg',
    reunion: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712725/81eff231-4665-4dfc-91f2-c18479d244f4_iw3pid.jpg',
    birthday2024: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712728/IMG_7216_cgnm5i.jpg',
    birthday2025: 'https://res.cloudinary.com/djhid28ds/image/upload/v1763712728/IMG_1789_cpjpjs.jpg',
    birthdayToday: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop',
  };

  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [showToast, setShowToast] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [giftOpened, setGiftOpened] = useState(false);
  const [giftShaking, setGiftShaking] = useState(false);
  const [giftUnlocked, setGiftUnlocked] = useState(false);
  const [secretCode, setSecretCode] = useState(['', '', '', '']);
  const [codeError, setCodeError] = useState(false);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Firebase real-time listener (optional)
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
          setAppData({
            photos: data.photos || appData.photos,
            youtubeId: data.youtubeId || appData.youtubeId,
            cardMessage: data.cardMessage || appData.cardMessage,
            giftMessage: data.giftMessage || appData.giftMessage,
          });
        }
      },
      (error) => {
        console.log('Firebase connection not available, using default data');
      }
    );

    return () => unsubscribe();
  }, []);

  // Preload first 6 images for better perceived performance
  useEffect(() => {
    const preloadImages = appData.photos.slice(0, 6);
    preloadImages.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
      };
      // Optimize Cloudinary images
      img.src = src.includes('cloudinary')
        ? src.replace('/upload/', '/upload/f_auto,q_auto,w_800/')
        : src;
    });
  }, [appData.photos]);

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages(prev => new Set([...prev, index]));
          }
        });
      },
      { rootMargin: '200px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleNoButtonHover = () => {
    if (noButtonRef.current) {
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 80;
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      setNoButtonPos({ x: newX, y: newY });
    }
  };

  const handleNoButtonClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Secret code: 0305 (Your wedding date - May 3rd!)
  const SECRET_CODE = '0305';

  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = [...secretCode];
    newCode[index] = value;
    setSecretCode(newCode);
    setCodeError(false);

    // Auto-focus next input
    if (value && index < 3) {
      codeInputRefs.current[index + 1]?.focus();
    }

    // Check if code is complete
    if (newCode.every(digit => digit !== '')) {
      const enteredCode = newCode.join('');
      if (enteredCode === SECRET_CODE) {
        // Correct code!
        setGiftUnlocked(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fda4af', '#fb7185', '#f43f5e', '#fbbf24', '#f59e0b'],
        });
      } else {
        // Wrong code - shake and reset
        setCodeError(true);
        setTimeout(() => {
          setSecretCode(['', '', '', '']);
          codeInputRefs.current[0]?.focus();
        }, 500);
      }
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !secretCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleGiftClick = () => {
    if (!giftOpened) {
      setGiftShaking(true);
      setTimeout(() => {
        setGiftShaking(false);
        setGiftOpened(true);

        // Confetti explosion
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
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
        }, 250);
      }, 1000);
    }
  };

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setWishMade(true);
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#fb7185', '#f43f5e', '#fbbf24', '#f59e0b'],
      });
    }, 500);
  };

  const handleCutCake = () => {
    if (!candlesLit) {
      setCakeCut(true);
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 30 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.3, 0.7), y: 0.5 },
          colors: ['#fda4af', '#fb7185', '#f43f5e', '#fbbf24', '#f59e0b'],
        });
      }, 150);
    }
  };

  const menuItems = [
    { id: 'photos', icon: Camera, label: 'Our Memories', color: 'rose' },
    { id: 'timeline', icon: BookHeart, label: 'Our Journey', color: 'blue' },
    { id: 'cake', icon: Gift, label: 'Birthday Cake', color: 'yellow' },
    { id: 'video', icon: Headphones, label: 'For You', color: 'pink' },
    { id: 'card', icon: BookHeart, label: 'Love Letter', color: 'red' },
    { id: 'gift', icon: Gift, label: 'Surprise', color: 'amber' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        {/* Floating Hearts */}
        <div className="absolute animate-float-slow" style={{ top: '10%', left: '5%' }}><span className="text-4xl opacity-40">💕</span></div>
        <div className="absolute animate-float-medium" style={{ top: '20%', right: '10%' }}><span className="text-3xl opacity-30">💖</span></div>
        <div className="absolute animate-float-fast" style={{ top: '60%', left: '8%' }}><span className="text-2xl opacity-35">💗</span></div>
        <div className="absolute animate-float-slow" style={{ top: '70%', right: '5%' }}><span className="text-4xl opacity-25">💝</span></div>
        <div className="absolute animate-float-medium" style={{ top: '40%', left: '3%' }}><span className="text-3xl opacity-30">✨</span></div>
        <div className="absolute animate-float-fast" style={{ top: '30%', right: '3%' }}><span className="text-2xl opacity-35">💫</span></div>
        <div className="absolute animate-float-slow" style={{ top: '80%', left: '15%' }}><span className="text-3xl opacity-25">🌸</span></div>
        <div className="absolute animate-float-medium" style={{ top: '15%', left: '20%' }}><span className="text-2xl opacity-30">🦋</span></div>
        <div className="absolute animate-float-fast" style={{ top: '50%', right: '15%' }}><span className="text-3xl opacity-35">💐</span></div>
        <div className="absolute animate-float-slow" style={{ top: '85%', right: '20%' }}><span className="text-4xl opacity-30">🌹</span></div>

        {/* Sparkle particles */}
        <div className="absolute animate-sparkle" style={{ top: '25%', left: '30%' }}><span className="text-xl">✦</span></div>
        <div className="absolute animate-sparkle animation-delay-2000" style={{ top: '45%', right: '25%' }}><span className="text-lg">✦</span></div>
        <div className="absolute animate-sparkle animation-delay-4000" style={{ top: '65%', left: '40%' }}><span className="text-xl">✦</span></div>
        <div className="absolute animate-sparkle" style={{ top: '35%', right: '35%' }}><span className="text-lg">✦</span></div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-rose-200"
          >
            <p className="text-rose-900 font-medium">💕 I&apos;ll wait for you... forever! 💕</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {/* Intro View */}
          {view === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="text-6xl mb-6"
              >
                💖✨💖
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                className="text-7xl md:text-9xl font-serif mb-8 text-center bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Hi, Shruti! 💝
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl text-rose-700 mb-12 text-center font-light italic"
              >
                ✨ Happy Birthday baby! ✨
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-6"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-rose-800 text-center mb-8 font-light"
                >
                  I made something special for you... 🎁
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl text-rose-800 text-center mb-8 font-light"
                >
                  Are you ready to get surprised... 😊
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex gap-6 justify-center items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('menu')}
                    className="px-12 py-4 bg-linear-to-r from-rose-500 via-blue-500 to-pink-500 text-white rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    Yes! 💖
                  </motion.button>

                  <motion.button
                    ref={noButtonRef}
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={handleNoButtonHover}
                    onClick={handleNoButtonClick}
                    className="px-12 py-4 bg-white/50 backdrop-blur-sm text-rose-900 rounded-full text-xl font-semibold border-2 border-rose-300 shadow-lg"
                    style={{
                      position: noButtonPos.x !== 0 ? 'fixed' : 'relative',
                      left: noButtonPos.x !== 0 ? `${noButtonPos.x}px` : 'auto',
                      top: noButtonPos.y !== 0 ? `${noButtonPos.y}px` : 'auto',
                      transition: 'left 0.3s ease, top 0.3s ease',
                    }}
                  >
                    No 😢
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Menu View */}
          {view === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1 }}
                className="text-5xl mb-4"
              >
                💝
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif mb-4 text-center bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Made with Love for You
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mb-12"
              >
                <span className="text-3xl">🌹</span>
                <span className="text-rose-600 font-light italic">From your Hubby with endless love</span>
                <span className="text-3xl">🌹</span>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 50 },
                      visible: { opacity: 1, scale: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.08, y: -10, rotateZ: 1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setView(item.id as ViewState)}
                    className="group relative bg-white/50 backdrop-blur-lg rounded-3xl p-8 cursor-pointer border-2 border-rose-200/60 shadow-xl hover:shadow-[0_20px_60px_-10px_rgba(244,63,94,0.4)] transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-100/60 via-pink-100/60 to-purple-100/60 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* Sparkle decorations */}
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute top-3 right-3 text-xl opacity-0 group-hover:opacity-60 transition-opacity"
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="absolute bottom-3 left-3 text-lg opacity-0 group-hover:opacity-60 transition-opacity"
                    >
                      💫
                    </motion.div>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="p-6 bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:shadow-rose-300/50 transition-all duration-300"
                      >
                        <item.icon className="w-12 h-12 text-white drop-shadow-lg" />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-rose-900 group-hover:text-rose-700 transition-colors">{item.label}</h3>
                      <div className="h-1 w-12 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Photos View */}
          {view === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen px-4 py-12"
            >
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('menu')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full text-rose-900 font-semibold border border-rose-200 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Our Memories 📸
                  </h2>
                  <div className="w-24"></div>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.02,
                        delayChildren: 0,
                      },
                    },
                  }}
                >
                  {appData.photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedPhoto(index.toString())}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all bg-rose-100"
                    >
                      {/* Blur placeholder */}
                      {!loadedImages.has(index) && (
                        <div className="absolute inset-0 bg-linear-to-br from-rose-100 to-pink-100 animate-pulse" />
                      )}

                      <img
                        src={photo.includes('cloudinary')
                          ? photo.replace('/upload/', '/upload/f_auto,q_auto,w_800/')
                          : photo}
                        alt={`Memory ${index + 1}`}
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
                        className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                          }`}
                        onLoad={() => {
                          setLoadedImages(prev => new Set([...prev, index]));
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-rose-900/30 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Lightbox */}
              <AnimatePresence>
                {selectedPhoto && (() => {
                  const currentIndex = parseInt(selectedPhoto);
                  const currentPhotoUrl = appData.photos[currentIndex];
                  const hasPrev = currentIndex > 0;
                  const hasNext = currentIndex < appData.photos.length - 1;

                  const handlePrev = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (hasPrev) setSelectedPhoto((currentIndex - 1).toString());
                  };

                  const handleNext = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (hasNext) setSelectedPhoto((currentIndex + 1).toString());
                  };

                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedPhoto(null)}
                      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    >
                      {/* Close Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-8 right-8 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all z-10"
                      >
                        <X className="w-6 h-6" />
                      </motion.button>

                      {/* Previous Button */}
                      {hasPrev && (
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.1, x: -5 }}
                          onClick={handlePrev}
                          className="absolute left-8 p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all z-10"
                        >
                          <ChevronLeft className="w-8 h-8" />
                        </motion.button>
                      )}

                      {/* Next Button */}
                      {hasNext && (
                        <motion.button
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.1, x: 5 }}
                          onClick={handleNext}
                          className="absolute right-8 p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all z-10 top-1/2 -translate-y-1/2"
                        >
                          <ChevronLeft className="w-8 h-8 rotate-180" />
                        </motion.button>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium z-10">
                        {currentIndex + 1} / {appData.photos.length}
                      </div>

                      <motion.img
                        key={currentIndex}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        src={currentPhotoUrl.includes('cloudinary')
                          ? currentPhotoUrl.replace('/upload/', '/upload/f_auto,q_auto,w_1200/')
                          : currentPhotoUrl}
                        alt={`Memory ${currentIndex + 1}`}
                        loading="eager"
                        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      />
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Video View */}
          {view === 'video' && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
            >
              <div className="max-w-4xl w-full">
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('menu')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full text-rose-900 font-semibold border border-rose-200 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    For You 🎵
                  </h2>
                  <div className="w-24"></div>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative bg-white/40 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-rose-200/50 overflow-hidden"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${appData.youtubeId}?modestbranding=1&rel=0`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Timeline View - Our Journey Map */}
          {view === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen px-4 py-12"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('menu')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full text-rose-900 font-semibold border border-rose-200 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Our Love Story 💙💕
                  </h2>
                  <div className="w-24"></div>
                </div>

                {/* Journey Map Container */}
                <div className="relative max-w-5xl mx-auto">
                  {/* Decorative curved path using SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <defs>
                      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#93c5fd', stopOpacity: 0.6 }} />
                        <stop offset="30%" style={{ stopColor: '#fda4af', stopOpacity: 0.6 }} />
                        <stop offset="60%" style={{ stopColor: '#f9a8d4', stopOpacity: 0.6 }} />
                        <stop offset="100%" style={{ stopColor: '#fbbf24', stopOpacity: 0.6 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 50 50 Q 200 150, 250 300 T 250 600 Q 300 800, 250 1000 T 250 1400 Q 200 1600, 250 1800 T 250 2200 Q 300 2400, 250 2600 T 250 3000 Q 200 3200, 250 3400 T 250 3600"
                      stroke="url(#pathGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10,5"
                      className="opacity-40"
                    />
                  </svg>

                  {/* Timeline Events */}
                  <motion.div
                    className="space-y-16 relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.15,
                        },
                      },
                    }}
                  >
                    {/* 1. Phone Calls - September 2021 to May 2022 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-start"
                    >
                      <div className="flex items-start gap-6 max-w-2xl">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: -3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.phoneCalls} alt="Phone Calls" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-blue-50/90 to-sky-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-blue-300/50 relative"
                        >
                          <div className="absolute -left-3 top-8 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                          <p className="text-xs text-blue-700 font-bold mb-2 uppercase tracking-wide">🇦🇺 Australia ↔️ India 🇮🇳</p>
                          <p className="text-sm text-blue-600 font-semibold mb-2">September 2021 - May 2022</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Our Story Begins 📞💙</h3>
                          <p className="text-rose-800 leading-relaxed">Eight magical months of phone calls connecting two hearts across continents. Though miles apart, our conversations brought us closer each day. You were in India, I was in Australia, but our hearts were already finding their way to each other.</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 2. First Meeting - May 2, 2022 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-end"
                    >
                      <div className="flex items-start gap-6 max-w-2xl flex-row-reverse">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-rose-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.firstMeeting} alt="First Meeting" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-rose-50/90 to-pink-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-rose-300/50 relative"
                        >
                          <div className="absolute -right-3 top-8 w-6 h-6 bg-rose-500 rounded-full border-4 border-white shadow-lg"></div>
                          <p className="text-xs text-rose-700 font-bold mb-2 uppercase tracking-wide">✈️ Ahmedabad Airport</p>
                          <p className="text-sm text-rose-600 font-semibold mb-2">May 2, 2022</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Finally Face to Face! 💫✨</h3>
                          <p className="text-rose-800 leading-relaxed">The moment I'd been dreaming of! You, our families, all at the airport to welcome me. After 8 months of calls, I finally saw your beautiful smile in person. My heart knew - this was just the beginning of forever.</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 3. Wedding Day - May 3, 2022 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-center"
                    >
                      <div className="flex flex-col items-center gap-4 max-w-2xl">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400"
                        >
                          <img src={timelinePhotos.wedding} alt="Wedding" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-amber-50/95 via-orange-50/95 to-rose-50/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-amber-300 relative w-full"
                        >
                          <div className="absolute -top-4 left-1/2 -ml-4 w-10 h-10 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-2xl">
                            💍
                          </div>
                          <p className="text-xs text-amber-700 font-bold mb-2 uppercase tracking-wide text-center">🌟 The Most Special Day 🌟</p>
                          <p className="text-sm text-rose-600 font-semibold mb-2 text-center">May 3, 2022</p>
                          <h3 className="text-3xl md:text-4xl font-serif text-rose-900 mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>We Got Married! 💕👰🤵💕</h3>
                          <p className="text-rose-800 leading-relaxed text-center text-lg">Just one day after meeting, we became husband and wife! The best decision of my life. Standing beside you, promising forever - that moment will always be etched in my heart. You became my everything that day. ❤️</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 4. Honeymoon - Leh Ladakh */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-start"
                    >
                      <div className="flex items-start gap-6 max-w-2xl">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: -3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-sky-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.honeymoon} alt="Honeymoon" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-sky-50/90 to-blue-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-sky-300/50 relative"
                        >
                          <div className="absolute -left-3 top-8 w-6 h-6 bg-sky-500 rounded-full border-4 border-white shadow-lg"></div>
                          <p className="text-xs text-sky-700 font-bold mb-2 uppercase tracking-wide">🏔️ Leh Ladakh, India</p>
                          <p className="text-sm text-blue-600 font-semibold mb-2">May 2022</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Honeymoon in the Himalayas 🏔️💙</h3>
                          <p className="text-rose-800 leading-relaxed">Our first adventure as husband and wife! The breathtaking mountains of Leh Ladakh witnessed the beginning of our journey together. Every moment, every view, every smile - made more beautiful because you were by my side.</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 5. Long Distance Again - June 2022 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-end"
                    >
                      <div className="flex items-start gap-6 max-w-2xl flex-row-reverse">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-indigo-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.longDistance} alt="Long Distance" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-indigo-50/90 to-purple-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-indigo-300/50 relative"
                        >
                          <div className="absolute -right-3 top-8 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white shadow-lg"></div>
                          <p className="text-xs text-indigo-700 font-bold mb-2 uppercase tracking-wide">💔 Miles Apart Again</p>
                          <p className="text-sm text-indigo-600 font-semibold mb-2">June 2022 - July 2023</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Waiting for You 🌏💭</h3>
                          <p className="text-rose-800 leading-relaxed">The hardest 13 months of my life. I returned to Australia while you stayed in India. Every day felt incomplete without you. But our love grew stronger, and I counted down each day until I could hold you again. 🇦🇺💙🇮🇳</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 6. Reunion - July 31, 2023 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-center"
                    >
                      <div className="flex flex-col items-center gap-4 max-w-2xl">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-400"
                        >
                          <img src={timelinePhotos.reunion} alt="Reunion" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-emerald-50/95 via-teal-50/95 to-cyan-50/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-emerald-300 relative w-full"
                        >
                          <div className="absolute -top-4 left-1/2 -ml-4 w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-2xl">
                            ✈️
                          </div>
                          <p className="text-xs text-emerald-700 font-bold mb-2 uppercase tracking-wide text-center">🎉 Together Again! 🎉</p>
                          <p className="text-sm text-emerald-600 font-semibold mb-2 text-center">July 31, 2023</p>
                          <h3 className="text-3xl md:text-4xl font-serif text-rose-900 mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>You Came to Australia! 🇦🇺💚</h3>
                          <p className="text-rose-800 leading-relaxed text-center text-lg">The day my world became complete! You arrived in Australia with my parents, and finally, FINALLY, we could start our life together properly. No more distance, no more waiting. Just us, together, forever. 💕</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 7. First Birthday in Australia - January 4, 2024 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-start"
                    >
                      <div className="flex items-start gap-6 max-w-2xl">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: -3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-pink-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.birthday2024} alt="Birthday 2024" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-pink-50/90 to-rose-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-pink-300/50 relative"
                        >
                          <div className="absolute -left-3 top-8 w-8 h-8 bg-pink-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-lg">
                            🎂
                          </div>
                          <p className="text-xs text-pink-700 font-bold mb-2 uppercase tracking-wide">🎈 Your First Birthday With Me</p>
                          <p className="text-sm text-pink-600 font-semibold mb-2">January 4, 2024</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Birthday #1 Together! 🎉💕</h3>
                          <p className="text-rose-800 leading-relaxed">Your first birthday in Australia, and my first time celebrating YOUR special day with you by my side! I finally got to wake you up with birthday wishes, see your smile all day, and make you feel as special as you make me feel every single day. 🎊💖</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 8. Most Recent Birthday - January 4, 2025 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-end"
                    >
                      <div className="flex items-start gap-6 max-w-2xl flex-row-reverse">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-fuchsia-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.birthday2025} alt="Birthday 2025" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-fuchsia-50/90 to-pink-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-fuchsia-300/50 relative"
                        >
                          <div className="absolute -right-3 top-8 w-8 h-8 bg-fuchsia-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-lg">
                            🎂
                          </div>
                          <p className="text-xs text-fuchsia-700 font-bold mb-2 uppercase tracking-wide">🎈 Your Last Birthday</p>
                          <p className="text-sm text-fuchsia-600 font-semibold mb-2">January 4, 2025</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Birthday #2 Together! 🎊💖</h3>
                          <p className="text-rose-800 leading-relaxed">Your most recent birthday! Another beautiful year with you, another celebration of the amazing person you are. Each year with you gets better and better. Watching you grow, laugh, and shine makes every day brighter! 🎉✨</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 9. Next Birthday - January 4, 2026 */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-start"
                    >
                      <div className="flex items-start gap-6 max-w-2xl">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: -3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-violet-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.birthday2025} alt="Next Birthday" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-violet-50/90 to-purple-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-violet-300/50 relative"
                        >
                          <div className="absolute -left-3 top-8 w-8 h-8 bg-violet-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-lg">
                            🎂
                          </div>
                          <p className="text-xs text-violet-700 font-bold mb-2 uppercase tracking-wide">🎈 Coming Soon!</p>
                          <p className="text-sm text-violet-600 font-semibold mb-2">January 4, 2026</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Your Next Birthday! 🎊💜</h3>
                          <p className="text-rose-800 leading-relaxed">Just around the corner! I can't wait to celebrate you again, to see your eyes light up, to make you smile. Every birthday with you is a gift to me. I'm already planning how to make this one even more special! 🎁✨</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 11. Many More Birthdays to Come */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-end"
                    >
                      <div className="flex items-start gap-6 max-w-2xl flex-row-reverse">
                        <motion.div
                          whileHover={{ scale: 1.05, rotate: 3 }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300 flex-shrink-0"
                        >
                          <img src={timelinePhotos.birthdayToday} alt="Many Birthdays" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-amber-50/90 to-yellow-100/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-amber-300/50 relative"
                        >
                          <div className="absolute -right-3 top-8 w-8 h-8 bg-amber-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-lg">
                            🎂
                          </div>
                          <p className="text-xs text-amber-700 font-bold mb-2 uppercase tracking-wide">🎈 Every Year Together</p>
                          <p className="text-sm text-amber-600 font-semibold mb-2">2027, 2028, 2029... Forever</p>
                          <h3 className="text-2xl md:text-3xl font-serif text-rose-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>All Your Birthdays to Come 🎉💛</h3>
                          <p className="text-rose-800 leading-relaxed">Every single birthday for the rest of our lives, I'll be right here beside you. Celebrating you, loving you, making you feel like the queen you are. From now until we're old and gray, I promise to make each birthday magical! 👑✨</p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* 12. Our Forever Journey */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="relative flex items-start justify-center"
                    >
                      <div className="flex flex-col items-center gap-4 max-w-3xl">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-gradient-to-r from-blue-400 via-rose-400 to-pink-400"
                          style={{ borderImage: 'linear-gradient(to right, #60a5fa, #fb7185, #f9a8d4) 1' }}
                        >
                          <img src={timelinePhotos.reunion} alt="Forever" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="bg-gradient-to-br from-blue-50/95 via-rose-50/95 to-pink-50/95 backdrop-blur-md rounded-3xl p-10 shadow-2xl border-4 border-gradient-to-r relative w-full"
                          style={{ borderImage: 'linear-gradient(135deg, #60a5fa, #fb7185, #f9a8d4) 1' }}
                        >
                          <div className="absolute -top-5 left-1/2 -ml-5 w-12 h-12 bg-gradient-to-br from-blue-500 via-rose-500 to-pink-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-3xl">
                            💍
                          </div>
                          <p className="text-xs text-blue-700 font-bold mb-3 uppercase tracking-wide text-center">✨ Forever & Always ✨</p>
                          <h3 className="text-3xl md:text-4xl font-serif text-rose-900 mb-4 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>Our Journey Continues... 💫💕</h3>
                          <p className="text-rose-800 leading-relaxed text-center text-lg mb-4">More adventures await us. More memories to create. More birthdays to celebrate. More laughter, more dreams, more love. From phone calls across oceans to building our life together in Australia - we've come so far, my love.</p>
                          <p className="text-rose-900 font-semibold text-center text-xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>And this is just the beginning of forever.</p>
                          <div className="flex justify-center gap-3 text-3xl">
                            <span>💙</span>
                            <span>💕</span>
                            <span>💍</span>
                            <span>🏠</span>
                            <span>👨‍👩‍👧‍👦</span>
                            <span>♾️</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Final Message */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="relative flex justify-center pt-8 pb-16"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-blue-100/70 via-rose-100/70 to-pink-100/70 backdrop-blur-md rounded-full px-16 py-8 border-2 border-rose-300/40 shadow-2xl"
                      >
                        <p className="text-rose-900 font-serif text-3xl text-center font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                          To My Forever Love 💫💍💕
                        </p>
                        <p className="text-rose-700 text-center text-lg mt-2">
                          Shruti & Jaimin • Together Forever • ♾️
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Card View */}
          {view === 'card' && (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
            >
              <div className="max-w-3xl w-full">
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('menu')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full text-rose-900 font-semibold border border-rose-200 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  <h2 className="text-4xl md:text-5xl font-serif text-center flex-1 bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Love Letter 💌
                  </h2>
                  <div className="w-24"></div>
                </div>

                <motion.div
                  initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 1, type: 'spring' }}
                  className="relative bg-gradient-to-br from-white/80 via-rose-50/80 to-pink-50/80 backdrop-blur-lg rounded-3xl p-12 shadow-[0_20px_60px_-10px_rgba(244,63,94,0.3)] border-2 border-rose-200/60"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Decorative corners */}
                  <div className="absolute top-4 left-4 text-4xl">💐</div>
                  <div className="absolute top-4 right-4 text-4xl">🌹</div>
                  <div className="absolute bottom-4 left-4 text-4xl">💕</div>
                  <div className="absolute bottom-4 right-4 text-4xl">💝</div>

                  {/* Floating hearts animation */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/4 right-6 text-3xl opacity-30"
                  >
                    ❤️
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/4 left-6 text-2xl opacity-25"
                  >
                    💗
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-6"
                  >
                    <span className="text-xl text-rose-600 font-light italic">My Dearest Shruti...</span>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-rose-900 leading-relaxed font-light whitespace-pre-line relative z-10"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {appData.cardMessage}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 flex flex-col items-end gap-2"
                  >
                    <span className="text-2xl text-rose-700 font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Forever & Always ❤️
                    </span>
                    <span className="text-lg text-rose-500 font-light italic">
                      Your loving husband, Jaimin 💍
                    </span>
                  </motion.div>

                  {/* Animated heart seal */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: 'spring' }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full p-4 shadow-xl"
                  >
                    <span className="text-3xl">💌</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Gift View */}
          {/* Cake View */}
          {view === 'cake' && (
            <motion.div
              key="cake"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
            >
              <div className="max-w-3xl w-full">
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('menu')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full text-rose-900 font-semibold border border-rose-200 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Birthday Cake 🎂
                  </h2>
                  <div className="w-24"></div>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
                  {/* Instructions */}
                  {!wishMade && (
                    <motion.p
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl text-rose-800 text-center font-light"
                    >
                      {candlesLit ? "Make a wish and blow the candles! 🕯️" : "Now cut the cake! 🍰"}
                    </motion.p>
                  )}

                  {cakeCut && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', duration: 0.8 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-5xl mb-4"
                      >
                        🎂✨🎉
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl text-center font-serif bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 bg-clip-text text-transparent"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        Happy Birthday, My Love! 💝
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl text-rose-700 mt-3 font-light italic"
                      >
                        You make every day sweeter than cake! 🍰💕
                      </motion.p>
                    </motion.div>
                  )}

                  {/* Happy Kids celebrating */}
                  {cakeCut && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-6 items-end justify-center mb-8"
                    >
                      {/* Kid 1 - Boy (looks like dad) */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [-5, 5, -5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0
                        }}
                        className="text-center"
                      >
                        <div className="relative">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-6xl"
                          >
                            👦🏻
                          </motion.div>
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-2 -right-2 text-2xl"
                          >
                            ✨
                          </motion.div>
                        </div>
                        <p className="text-sm text-rose-700 mt-1 font-medium">Little Jaimin</p>
                      </motion.div>

                      {/* Kid 2 - Girl (looks like mom) */}
                      <motion.div
                        animate={{
                          y: [0, -15, 0],
                          rotate: [5, -5, 5]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: 0.3
                        }}
                        className="text-center"
                      >
                        <div className="relative">
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                            className="text-6xl"
                          >
                            👧🏻
                          </motion.div>
                          <motion.div
                            animate={{
                              rotate: [0, -360],
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-2 -right-2 text-2xl"
                          >
                            💕
                          </motion.div>
                        </div>
                        <p className="text-sm text-rose-700 mt-1 font-medium">Little Shruti</p>
                      </motion.div>

                      {/* Kid 3 - Another Boy */}
                      <motion.div
                        animate={{
                          y: [0, -12, 0],
                          rotate: [-3, 3, -3]
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: 0.6
                        }}
                        className="text-center"
                      >
                        <div className="relative">
                          <motion.div
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{ duration: 1.6, repeat: Infinity }}
                            className="text-6xl"
                          >
                            👶🏻
                          </motion.div>
                          <motion.div
                            animate={{
                              y: [0, -5, 0],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute -top-1 -right-1 text-xl"
                          >
                            🎈
                          </motion.div>
                        </div>
                        <p className="text-sm text-rose-700 mt-1 font-medium">Baby Joy</p>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Cake SVG */}
                  <div className="relative">
                    <svg width="300" height="350" viewBox="0 0 300 350" className="drop-shadow-2xl">
                      {/* Plate */}
                      <ellipse cx="150" cy="320" rx="140" ry="20" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />

                      {/* Cake Bottom Layer */}
                      <motion.g
                        animate={cakeCut ? {
                          x: [-2, 2, -2, 2, 0],
                          transition: { duration: 0.3 }
                        } : {}}
                      >
                        <rect x="50" y="220" width="200" height="100" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" rx="10" />
                        <rect x="50" y="220" width="200" height="20" fill="#fde047" rx="10" />
                        {/* Bottom decorations */}
                        <circle cx="80" cy="260" r="8" fill="#fb7185" />
                        <circle cx="120" cy="260" r="8" fill="#fb7185" />
                        <circle cx="160" cy="260" r="8" fill="#fb7185" />
                        <circle cx="200" cy="260" r="8" fill="#fb7185" />
                        <circle cx="220" cy="260" r="8" fill="#fb7185" />
                        <circle cx="100" cy="290" r="8" fill="#60a5fa" />
                        <circle cx="150" cy="290" r="8" fill="#60a5fa" />
                        <circle cx="200" cy="290" r="8" fill="#60a5fa" />
                      </motion.g>

                      {/* Cake Top Layer */}
                      <motion.g
                        animate={cakeCut ? {
                          x: [2, -2, 2, -2, 0],
                          transition: { duration: 0.3 }
                        } : {}}
                      >
                        <rect x="70" y="140" width="160" height="80" fill="#f472b6" stroke="#ec4899" strokeWidth="3" rx="10" />
                        <rect x="70" y="140" width="160" height="20" fill="#fda4af" rx="10" />
                        {/* Top decorations */}
                        <circle cx="100" cy="170" r="6" fill="#fbbf24" />
                        <circle cx="140" cy="170" r="6" fill="#fbbf24" />
                        <circle cx="180" cy="170" r="6" fill="#fbbf24" />
                        <circle cx="120" cy="195" r="6" fill="#60a5fa" />
                        <circle cx="160" cy="195" r="6" fill="#60a5fa" />
                        <circle cx="200" cy="195" r="6" fill="#60a5fa" />
                      </motion.g>

                      {/* Candles */}
                      <g>
                        {[90, 130, 170, 210].map((x, i) => (
                          <g key={i}>
                            {/* Candle body */}
                            <rect
                              x={x - 5}
                              y="110"
                              width="10"
                              height="30"
                              fill={i % 2 === 0 ? "#60a5fa" : "#fbbf24"}
                              stroke={i % 2 === 0 ? "#3b82f6" : "#f59e0b"}
                              strokeWidth="2"
                              rx="2"
                            />
                            {/* Wick */}
                            <line x1={x} y1="110" x2={x} y2="100" stroke="#4b5563" strokeWidth="2" />
                            {/* Flame */}
                            {candlesLit && (
                              <motion.g
                                animate={{
                                  y: [0, -3, 0],
                                  opacity: [1, 0.8, 1],
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                }}
                              >
                                <ellipse cx={x} cy="95" rx="6" ry="10" fill="#fbbf24" opacity="0.8" />
                                <ellipse cx={x} cy="95" rx="4" ry="7" fill="#fde047" />
                                <ellipse cx={x} cy="97" rx="2" ry="4" fill="#fef08a" />
                              </motion.g>
                            )}
                            {/* Smoke after blowing */}
                            {!candlesLit && (
                              <motion.g
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 0, y: -30 }}
                                transition={{ duration: 2 }}
                              >
                                <text x={x - 8} y="95" fontSize="16" opacity="0.5">💨</text>
                              </motion.g>
                            )}
                          </g>
                        ))}
                      </g>

                      {/* Cake cut slice */}
                      {cakeCut && (
                        <motion.g
                          initial={{ x: 0, y: 0, rotate: 0 }}
                          animate={{
                            x: 80,
                            y: -30,
                            rotate: 25,
                          }}
                          transition={{ duration: 1, type: "spring" }}
                        >
                          {/* Slice of cake */}
                          <path
                            d="M 150 220 L 180 220 L 185 160 L 155 160 Z"
                            fill="#f472b6"
                            stroke="#ec4899"
                            strokeWidth="2"
                          />
                          <path
                            d="M 150 220 L 180 220 L 175 280 L 145 280 Z"
                            fill="#fbbf24"
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                          <line x1="150" y1="200" x2="180" y2="200" stroke="#fda4af" strokeWidth="3" />
                          <line x1="148" y1="250" x2="177" y2="250" stroke="#fde047" strokeWidth="3" />
                        </motion.g>
                      )}

                      {/* Sparkles */}
                      {(wishMade || cakeCut) && (
                        <motion.g
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <text x="20" y="100" fontSize="24">✨</text>
                          <text x="260" y="120" fontSize="24">✨</text>
                          <text x="30" y="280" fontSize="24">✨</text>
                          <text x="250" y="300" fontSize="24">✨</text>
                        </motion.g>
                      )}
                    </svg>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {candlesLit && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBlowCandles}
                        className="px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
                      >
                        💨 Blow Candles
                      </motion.button>
                    )}

                    {!candlesLit && !cakeCut && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCutCake}
                        className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
                      >
                        🔪 Cut Cake
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
            >
              <div className="max-w-3xl w-full">
                <div className="flex items-center justify-between mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('menu')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full text-rose-900 font-semibold border border-rose-200 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Your Surprise 🎁
                  </h2>
                  <div className="w-24"></div>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Enter Secret Code */}
                    {!giftUnlocked && !giftOpened && (
                      <motion.div
                        key="code-entry"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center"
                      >
                        {/* Lock Icon */}
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: codeError ? [0, -10, 10, -10, 10, 0] : 0
                          }}
                          transition={{
                            scale: { duration: 2, repeat: Infinity },
                            rotate: { duration: 0.5 }
                          }}
                          className="text-7xl mb-6"
                        >
                          🔐
                        </motion.div>

                        <motion.h3
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl md:text-4xl font-serif text-rose-900 mb-4 text-center"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          Enter the Secret Code
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-lg text-rose-600 mb-8 text-center font-light"
                        >
                          💡 Hint: The day we became one forever! 💍
                        </motion.p>

                        {/* Code Input Boxes */}
                        <motion.div
                          animate={codeError ? { x: [-10, 10, -10, 10, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          className="flex gap-4 mb-6"
                        >
                          {[0, 1, 2, 3].map((index) => (
                            <motion.input
                              key={index}
                              ref={(el) => { codeInputRefs.current[index] = el; }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={secretCode[index]}
                              onChange={(e) => handleCodeInput(index, e.target.value)}
                              onKeyDown={(e) => handleCodeKeyDown(index, e)}
                              className={`w-16 h-20 text-center text-3xl font-bold rounded-2xl border-3 outline-none transition-all duration-300 ${codeError
                                  ? 'border-red-400 bg-red-50 text-red-600'
                                  : secretCode[index]
                                    ? 'border-rose-400 bg-rose-50 text-rose-700'
                                    : 'border-rose-200 bg-white/80 text-rose-900'
                                } focus:border-rose-500 focus:ring-4 focus:ring-rose-200 shadow-lg`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            />
                          ))}
                        </motion.div>

                        {codeError && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 font-medium mb-4"
                          >
                            ❌ Oops! That's not right. Try again, my love! 💕
                          </motion.p>
                        )}

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-sm text-rose-400 text-center"
                        >
                          Format: DDMM (Day & Month) 📅
                        </motion.p>
                      </motion.div>
                    )}

                    {/* Step 2: Gift Box (after code is correct) */}
                    {giftUnlocked && !giftOpened && (
                      <motion.div
                        key="gift-box"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex flex-col items-center"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', duration: 0.8 }}
                          className="text-5xl mb-4"
                        >
                          🎊 Unlocked! 🎊
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl text-rose-800 mb-8 text-center font-light"
                        >
                          Now click the gift to open it! 🎉
                        </motion.p>

                        <motion.div
                          animate={giftShaking ? {
                            rotate: [0, -5, 5, -5, 5, 0],
                            scale: [1, 1.05, 1, 1.05, 1],
                          } : {}}
                          transition={{ duration: 0.5 }}
                          onClick={handleGiftClick}
                          className="cursor-pointer relative"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Gift Box SVG */}
                          <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
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
                              animate={giftOpened ? {
                                y: -100,
                                rotate: -20,
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
                              {/* Ribbon on Lid */}
                              <rect x="95" y="60" width="10" height="30" fill="#fbbf24" />
                            </motion.g>

                            {/* Vertical Ribbon */}
                            <rect x="95" y="80" width="10" height="100" fill="#fbbf24" />

                            {/* Bow */}
                            <motion.g
                              animate={giftOpened ? {
                                y: -100,
                                rotate: -20,
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
                              <text x="20" y="40" fontSize="20">✨</text>
                              <text x="170" y="60" fontSize="20">✨</text>
                              <text x="30" y="150" fontSize="20">✨</text>
                              <text x="165" y="170" fontSize="20">✨</text>
                            </motion.g>
                          </svg>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Step 3: Gift Revealed */}
                    {giftOpened && (
                      <motion.div
                        key="gift-message"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: [0, 10, -10, 10, 0] }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-8xl mb-6"
                        >
                          🎉
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-2xl text-rose-700 mb-8 font-light"
                        >
                          Happy Birthday, My Love! Your special gift awaits...
                        </motion.p>

                        {/* Helicopter Voucher Card */}
                        <motion.div
                          initial={{ opacity: 0, y: 30, rotateX: 20 }}
                          animate={{ opacity: 1, y: 0, rotateX: 0 }}
                          transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
                          className="relative bg-gradient-to-br from-sky-50 via-white to-cyan-50 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(14,165,233,0.4)] border-2 border-sky-200/60"
                        >
                          {/* Header Banner */}
                          <div className="bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-600 px-8 py-6 relative overflow-hidden">
                            <motion.div
                              animate={{ x: [0, 100, 0] }}
                              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                              className="absolute inset-0 opacity-20"
                              style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z\' fill=\'white\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")',
                                backgroundSize: '60px 60px',
                              }}
                            />
                            <div className="relative z-10 flex items-center justify-between">
                              <div>
                                <p className="text-white/80 text-sm font-medium tracking-wider uppercase">Experience Voucher</p>
                                <h3 className="text-white text-3xl font-bold mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  🚁 Scenic Helicopter Flight
                                </h3>
                              </div>
                              <motion.div
                                animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-6xl"
                              >
                                🚁
                              </motion.div>
                            </div>
                          </div>

                          {/* Voucher Content */}
                          <div className="p-8">
                            {/* Main Experience */}
                            <div className="text-center mb-8">
                              <h4 className="text-2xl font-bold text-sky-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Perth&apos;s Beaches, Fremantle & Swan River
                              </h4>
                              <p className="text-sky-600 text-lg">
                                A thrilling flight over Perth&apos;s stunning coast! ✨
                              </p>
                            </div>

                            {/* Experience Details */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 }}
                                className="bg-gradient-to-br from-sky-100/80 to-cyan-100/80 rounded-2xl p-5 border border-sky-200/50"
                              >
                                <p className="text-sky-500 text-sm font-semibold uppercase tracking-wide mb-2">📅 Booked For</p>
                                <p className="text-sky-900 text-xl font-bold">Saturday, 4th January 2026</p>
                                <p className="text-sky-600 mt-1">9:30 AM • 2 Passengers</p>
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0 }}
                                className="bg-gradient-to-br from-cyan-100/80 to-sky-100/80 rounded-2xl p-5 border border-sky-200/50"
                              >
                                <p className="text-sky-500 text-sm font-semibold uppercase tracking-wide mb-2">⏱️ Duration</p>
                                <p className="text-sky-900 text-xl font-bold">20-Minute Flight</p>
                                <p className="text-sky-600 mt-1">+ Safety Briefing</p>
                              </motion.div>
                            </div>

                            {/* What's Included */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.1 }}
                              className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 mb-8 border border-amber-200/50"
                            >
                              <p className="text-amber-700 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="text-2xl">🌟</span> What&apos;s Included
                              </p>
                              <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 text-amber-800">
                                  <span className="text-xl">🏖️</span>
                                  <span>Cottesloe Beach aerial views</span>
                                </div>
                                <div className="flex items-center gap-3 text-amber-800">
                                  <span className="text-xl">🌊</span>
                                  <span>Fremantle Port & Swan River</span>
                                </div>
                                <div className="flex items-center gap-3 text-amber-800">
                                  <span className="text-xl">🏝️</span>
                                  <span>Leighton Beach coastline</span>
                                </div>
                                <div className="flex items-center gap-3 text-amber-800">
                                  <span className="text-xl">🅿️</span>
                                  <span>On-site parking included</span>
                                </div>
                              </div>
                            </motion.div>

                            {/* Location */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.2 }}
                              className="text-center bg-gradient-to-r from-rose-100/60 to-pink-100/60 rounded-xl p-5 border border-rose-200/40"
                            >
                              <p className="text-rose-500 text-sm font-semibold uppercase tracking-wide mb-1">📍 Departure Location</p>
                              <p className="text-rose-800 font-semibold">Jandakot Heli-Co</p>
                              <p className="text-rose-600 text-sm">8 Bell Court, Jandakot, WA 6164</p>
                            </motion.div>

                            {/* Romantic Footer Message */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.4 }}
                              className="mt-8 text-center"
                            >
                              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg">
                                <span className="text-2xl">💕</span>
                                <span className="font-semibold text-lg">For You & Me - Flying Together!</span>
                                <span className="text-2xl">💕</span>
                              </div>
                              <p className="text-rose-600 mt-4 text-lg italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Let&apos;s soar through the skies together, my love! 🌅✨
                              </p>
                            </motion.div>
                          </div>

                          {/* Decorative Elements */}
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-20 left-4 text-2xl"
                          >
                            ✨
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="absolute top-32 right-4 text-2xl"
                          >
                            ⭐
                          </motion.div>
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-20 left-6 text-xl"
                          >
                            💫
                          </motion.div>
                        </motion.div>

                        {/* Confirmation Badge */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6 }}
                          className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full border border-green-300"
                        >
                          <span className="text-xl">✅</span>
                          <span className="font-semibold">Booking Confirmed!</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
