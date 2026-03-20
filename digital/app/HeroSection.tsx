"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatisticCard {
    value: string;
    label: string;
    trend: string;
}

const statistics: StatisticCard[] = [
    { value: '58%', label: 'Platform Adoption Rate', trend: '+14%' },
    { value: '2.4x', label: 'Faster Processing', trend: '+8%' },
    { value: '99.9%', label: 'Uptime Reliability', trend: 'Stable' },
    { value: '40%', label: 'Efficiency Increase', trend: '+22%' },
];

export default function HeroSection() {
    const heroContainerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const statCardsRef = useRef<HTMLDivElement[]>([]);
    const carRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial load animations timeline
            const tl = gsap.timeline();

            // Letter-spaced headline - staggered reveal
            if (headlineRef.current) {
                tl.fromTo('.headline-letter',
                    { opacity: 0, y: 40, filter: 'blur(10px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.05 }
                );
            }

            // Description text
            if (textRef.current) {
                tl.fromTo(textRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                    "-=0.6"
                );
            }

            // Statistics cards - one by one
            if (statCardsRef.current.length > 0) {
                tl.fromTo(statCardsRef.current,
                    { opacity: 0, y: 20, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
                    "-=0.4"
                );
            }

            // Scroll-based car animation (CORE REQUIREMENT)
            if (carRef.current && heroContainerRef.current) {
                gsap.fromTo(carRef.current,
                    { x: 0 },
                    {
                        x: () => {
                            if (typeof window !== 'undefined') {
                                return window.innerWidth - 500;
                            }
                            return 1000;
                        },
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: heroContainerRef.current,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 1.5,
                            invalidateOnRefresh: true,
                            markers: false, // Set to true for debugging
                        }
                    }
                );
            }
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={heroContainerRef} className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center px-4 py-32">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-indigo-200 tracking-wide uppercase">Next Generation Motion</span>
                </div>

                {/* LETTER-SPACED HEADLINE (REQUIREMENT #1) */}
                <div className="text-center mb-8">
                    <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white flex flex-wrap justify-center gap-3 md:gap-6 mb-4">
                        {'WELCOME ITZFIZZ'.split('').map((letter, index) => (
                            <span
                                key={index}
                                className="headline-letter inline-block opacity-0"
                            >
                                {letter === ' ' ? '\u00A0\u00A0' : letter}
                            </span>
                        ))}
                    </h1>
                </div>

                <p ref={textRef} className="max-w-2xl text-center text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-16">
                    Experience seamless, scroll-driven kinetic animations that bring your interface to life. Precision engineered for 60fps performance and stunning visual fidelity.
                </p>

                {/* Statistics Grid */}
                <div ref={statsRef} className="w-full max-w-5xl mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statistics.map((stat, index) => (
                            <div
                                key={index}
                                ref={(el) => { if (el) statCardsRef.current[index] = el; }}
                                className="group relative bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-8 hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-500"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-4xl font-semibold text-white tracking-tight">{stat.value}</div>
                                        <div className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{stat.trend}</div>
                                    </div>
                                    <div className="text-sm text-zinc-400 font-medium">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SCROLL-BASED CAR ANIMATION (REQUIREMENT #2 - CORE FEATURE) */}
            <div className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#050505] border-t border-white/5">
                    <div
                        ref={carRef}
                        className="absolute bottom-12 left-4 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                        style={{ willChange: 'transform' }}
                    >
                        {/* Realistic Car SVG */}
                        <svg width="420" height="200" viewBox="0 0 420 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="bodyMain" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#e5e7eb" />
                                    <stop offset="50%" stopColor="#f9fafb" />
                                    <stop offset="100%" stopColor="#d1d5db" />
                                </linearGradient>
                                <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
                                    <stop offset="50%" stopColor="#0f172a" stopOpacity="0.98" />
                                    <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                                </linearGradient>
                                <radialGradient id="tireGrad">
                                    <stop offset="0%" stopColor="#1f2937" />
                                    <stop offset="70%" stopColor="#111827" />
                                    <stop offset="100%" stopColor="#030712" />
                                </radialGradient>
                                <radialGradient id="rimGrad">
                                    <stop offset="0%" stopColor="#cbd5e1" />
                                    <stop offset="50%" stopColor="#94a3b8" />
                                    <stop offset="100%" stopColor="#64748b" />
                                </radialGradient>
                                <radialGradient id="headlightGlow">
                                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                                </radialGradient>
                                <radialGradient id="taillightGlow">
                                    <stop offset="0%" stopColor="#f87171" stopOpacity="1" />
                                    <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                                </radialGradient>
                            </defs>

                            {/* Car Shadow */}
                            <ellipse cx="210" cy="100" rx="140" ry="70" fill="#000000" opacity="0.3" filter="blur(8px)" />

                            {/* Wheels */}
                            <g>
                                <ellipse cx="110" cy="50" rx="28" ry="22" fill="url(#tireGrad)" />
                                <ellipse cx="110" cy="50" rx="15" ry="12" fill="url(#rimGrad)" />
                                <line x1="110" y1="38" x2="110" y2="62" stroke="#94a3b8" strokeWidth="2" />
                                <line x1="95" y1="50" x2="125" y2="50" stroke="#94a3b8" strokeWidth="2" />
                            </g>
                            <g>
                                <ellipse cx="110" cy="150" rx="28" ry="22" fill="url(#tireGrad)" />
                                <ellipse cx="110" cy="150" rx="15" ry="12" fill="url(#rimGrad)" />
                                <line x1="110" y1="138" x2="110" y2="162" stroke="#94a3b8" strokeWidth="2" />
                                <line x1="95" y1="150" x2="125" y2="150" stroke="#94a3b8" strokeWidth="2" />
                            </g>
                            <g>
                                <ellipse cx="310" cy="50" rx="28" ry="22" fill="url(#tireGrad)" />
                                <ellipse cx="310" cy="50" rx="15" ry="12" fill="url(#rimGrad)" />
                                <line x1="310" y1="38" x2="310" y2="62" stroke="#94a3b8" strokeWidth="2" />
                                <line x1="295" y1="50" x2="325" y2="50" stroke="#94a3b8" strokeWidth="2" />
                            </g>
                            <g>
                                <ellipse cx="310" cy="150" rx="28" ry="22" fill="url(#tireGrad)" />
                                <ellipse cx="310" cy="150" rx="15" ry="12" fill="url(#rimGrad)" />
                                <line x1="310" y1="138" x2="310" y2="162" stroke="#94a3b8" strokeWidth="2" />
                                <line x1="295" y1="150" x2="325" y2="150" stroke="#94a3b8" strokeWidth="2" />
                            </g>

                            {/* Body */}
                            <path d="M 70 80 Q 60 100 70 120 L 90 140 L 110 145 L 310 145 L 330 140 L 350 120 Q 360 100 350 80 L 330 60 L 310 55 L 110 55 L 90 60 Z" fill="url(#bodyMain)" stroke="#9ca3af" strokeWidth="1" />

                            {/* Windows */}
                            <path d="M 145 75 L 160 68 L 260 68 L 275 75 L 270 85 L 150 85 Z" fill="url(#glassGrad)" stroke="#334155" strokeWidth="1" />
                            <path d="M 150 90 L 155 87 L 190 87 L 195 90 L 195 110 L 190 113 L 155 113 L 150 110 Z" fill="url(#glassGrad)" stroke="#334155" strokeWidth="1" />
                            <path d="M 225 90 L 230 87 L 265 87 L 270 90 L 270 110 L 265 113 L 230 113 L 225 110 Z" fill="url(#glassGrad)" stroke="#334155" strokeWidth="1" />

                            {/* Headlights */}
                            <ellipse cx="75" cy="85" rx="12" ry="8" fill="url(#headlightGlow)" opacity="0.8" />
                            <ellipse cx="75" cy="85" rx="8" ry="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1" />
                            <ellipse cx="75" cy="115" rx="12" ry="8" fill="url(#headlightGlow)" opacity="0.8" />
                            <ellipse cx="75" cy="115" rx="8" ry="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1" />

                            {/* Taillights */}
                            <ellipse cx="345" cy="85" rx="12" ry="8" fill="url(#taillightGlow)" opacity="0.7" />
                            <ellipse cx="345" cy="85" rx="8" ry="6" fill="#fecaca" stroke="#ef4444" strokeWidth="1" />
                            <ellipse cx="345" cy="115" rx="12" ry="8" fill="url(#taillightGlow)" opacity="0.7" />
                            <ellipse cx="345" cy="115" rx="8" ry="6" fill="#fecaca" stroke="#ef4444" strokeWidth="1" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-20">
                <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Scroll to explore</p>
                <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
            </div>
        </div>
    );
}