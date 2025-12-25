'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from "next/image";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentTime, setCurrentTime] = useState({ stockholm: '', berlin: '' });
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const rotatingTexts = [
        { title: "STRATAGLASS", subtitle: "R-12", description: "INVESTIGATING DUALITY AND FUSION ACROSS GLASS STRUCTURES FORMED BY FORCE. ENERGY AND CONTRAST. EACH LAYER CAPTURES A MOMENT OF FRACTURE AND UNITY." },
        { title: "CHROMASHIFT", subtitle: "R-08", description: "EXPLORING COLOR THEORY THROUGH PRISMATIC LIGHT FORMATIONS. DEPTH AND REFRACTION CREATE VISUAL HARMONY." },
        { title: "LUMINALUX", subtitle: "R-15", description: "CAPTURING ETHEREAL LIGHT PATTERNS IN CRYSTALLINE FORM. EACH BEAM TELLS A STORY OF CONVERGENCE." },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            if (audio.duration) {
                const newProgress = (audio.currentTime / audio.duration) * 100;
                setProgress(newProgress);
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const stockholmTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Europe/Stockholm',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const berlinTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Europe/Berlin',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setCurrentTime({ stockholm: stockholmTime, berlin: berlinTime });
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        audio.currentTime = percentage * audio.duration;
    };

    return (
        <>
            <audio ref={audioRef} className="hidden">
                <source src="/music.mp3" type="audio/mpeg" />
                Your browser doesn't support audio
            </audio>
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

                {/* Animated Background Gradient - Teal/Blue/Green atmosphere like reference */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            'radial-gradient(ellipse at 50% 30%, #1a6a5c 0%, #0d4a6a 25%, #0a3a5c 40%, #051520 70%, #000000 100%)',
                            'radial-gradient(ellipse at 55% 25%, #2a7a6c 0%, #0d5a7a 25%, #0a4a6c 40%, #051520 70%, #000000 100%)',
                            'radial-gradient(ellipse at 45% 35%, #1a5a4c 0%, #0d4a5a 25%, #0a3a4c 40%, #051520 70%, #000000 100%)',
                            'radial-gradient(ellipse at 50% 30%, #1a6a5c 0%, #0d4a6a 25%, #0a3a5c 40%, #051520 70%, #000000 100%)',
                        ],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />

                {/* Yellow/Orange accent gradient */}
                <motion.div
                    className="absolute inset-0 opacity-60"
                    animate={{
                        background: [
                            'radial-gradient(ellipse at 60% 20%, rgba(180, 140, 60, 0.3) 0%, transparent 40%)',
                            'radial-gradient(ellipse at 65% 15%, rgba(200, 160, 80, 0.35) 0%, transparent 40%)',
                            'radial-gradient(ellipse at 55% 25%, rgba(160, 120, 40, 0.3) 0%, transparent 40%)',
                            'radial-gradient(ellipse at 60% 20%, rgba(180, 140, 60, 0.3) 0%, transparent 40%)',
                        ],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />

                {/* Subtle grain overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Mouse follow light */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 212, 255, 0.05) 0%, transparent 10%)`,
                    }}
                />

                {/* Top Navigation Bar with line */}
                <div className="absolute top-0 left-0 right-0 z-30">
                    <div className="flex justify-between items-start p-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Textural</span>
                            <span className="text-sm tracking-[0.2em] text-gray-300 uppercase font-light">Language</span>
                        </div>

                        {/* Center icon */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                                <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1" />
                                <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" />
                                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1" />
                                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </motion.div>

                        <div className="flex flex-col items-end">
                            <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">Digital</span>
                            <span className="text-sm tracking-[0.2em] text-gray-300 uppercase font-light">Tactile System</span>
                        </div>
                    </div>
                    {/* Horizontal line below nav */}
                    <div className="w-full h-[1px] bg-gray-800" />
                </div>

                {/* LEFT SIDE - Stockholm Location */}
                <div className="absolute left-6 top-32 z-30">
                    <motion.div
                        className="flex flex-col gap-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <span className="text-[10px] tracking-[0.2em] text-gray-500">( STOCKHOLM, SE )</span>
                        <span className="text-xs text-gray-400 font-mono ml-8">{currentTime.stockholm}</span>
                    </motion.div>

                    {/* Decorative cross */}
                    <motion.div
                        className="mt-6"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gray-600">
                            <line x1="20" y1="5" x2="20" y2="35" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="9" y1="9" x2="31" y2="31" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="31" y1="9" x2="9" y2="31" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                    </motion.div>
                </div>

                {/* RIGHT SIDE - Berlin + Animated Text */}
                <div className="absolute right-6 top-32 z-30">
                    {/* Berlin time */}
                    <motion.div
                        className="flex justify-between items-start gap-16 mb-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        <span className="text-[10px] tracking-[0.2em] text-gray-500">BERLIN, DE</span>
                        <span className="text-xs text-gray-400 font-mono">{currentTime.berlin}</span>
                    </motion.div>
                    <motion.hr className=" h-[1px] bg-gray-800 mx-auto" initial={{width: "0%"}} animate={{width: "100%"}} transition={{duration: 1.2}}/>

                    {/* Animated rotating text content */}
                    <div className="relative h-32 w-64 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={textIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-xl md:text-2xl tracking-wider text-gray-200 font-light">
                    {rotatingTexts[textIndex].title}
                  </span>
                                    <span className="text-gray-400 font-mono text-lg">{rotatingTexts[textIndex].subtitle}</span>
                                </div>
                                <p className="text-[9px] text-gray-500 max-w-[240px] leading-relaxed tracking-wide uppercase">
                                    {rotatingTexts[textIndex].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Decorative cross - bottom right */}
                    <motion.div
                        className="mt-4 flex justify-end"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gray-700">
                            <line x1="20" y1="8" x2="20" y2="32" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="12" y1="12" x2="28" y2="28" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="28" y1="12" x2="12" y2="28" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                    </motion.div>
                </div>

                {/* Main Content - The "R" */}
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, type: 'spring', stiffness: 50 }}
                        className="relative"
                    >
                        <Image
                            src={"/R-logo.png"}
                            alt={"Rock Logo"}
                            className="opacity-90 drop-shadow-[0_0_30px_rgba(100,200,255,0.3)] hover:drop-shadow-[0_0_50px_rgba(100,200,255,0.5)] transition-all duration-500"
                            width={500}
                            height={500}
                        />
                    </motion.div>
                </div>

                {/* BOTTOM LEFT - Alpha.Layered Section */}
                <motion.div
                    className="absolute left-6 bottom-28 z-30"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-3">
                        ALPHA.LAYERED
                    </h2>
                    <div className="flex items-center gap-8 text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-4">
                        <span>NEW SC. 2026</span>
                        <span>BUILT ON DUAL STATES</span>
                    </div>
                    <div className="flex flex-col gap-1 text-[9px] text-gray-500 uppercase tracking-wide">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">•</span>
                            <span>Stone-glass fused in organic boundary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">•</span>
                            <span>Energy split into layers by impact memory</span>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Bar - Player/Progress style */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 z-30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.8 }}
                >
                    {/* Play button and progress bar */}
                    <div className="flex items-center gap-6">
                        <motion.button
                            onClick={togglePlay}
                            className="w-14 h-14 rounded-full border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors group bg-black/30 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isPlaying ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400 group-hover:text-white transition-colors">
                                    <rect x="4" y="3" width="4" height="14" fill="currentColor" />
                                    <rect x="12" y="3" width="4" height="14" fill="currentColor" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400 group-hover:text-white transition-colors ml-1">
                                    <path d="M4 3L17 10L4 17V3Z" fill="currentColor" />
                                </svg>
                            )}
                        </motion.button>

                        {/* Progress bar */}
                        <div
                            className="flex-1 relative cursor-pointer group py-2"
                            onClick={handleProgressClick}
                        >
                            <div className="h-[3px] bg-gray-800/50 rounded-full overflow-hidden group-hover:h-[5px] transition-all">
                                <div
                                    className="h-full rounded-full transition-all duration-100"
                                    style={{
                                        background: 'linear-gradient(90deg, #7f1d1d, #be185d, #ec4899)',
                                        width: `${progress}%`
                                    }}
                                />
                            </div>
                            {/* Progress indicator dot */}
                            <div
                                className="absolute top-1/2 w-3 h-3 rounded-full bg-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    left: `${progress}%`,
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: '0 0 10px #ec4899'
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}