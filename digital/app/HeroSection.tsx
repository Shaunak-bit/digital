"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
    const headlineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const statCardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const tl = gsap.timeline();

        if (headlineRef.current) {
            tl.fromTo(headlineRef.current,
                { opacity: 0, y: 40, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
            );
        }

        if (textRef.current) {
            tl.fromTo(textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                "-=0.8"
            );
        }

        if (statCardsRef.current.length > 0) {
            tl.fromTo(statCardsRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
                "-=0.6"
            );
        }
    }, []);

    return (
        <div className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center px-4 py-32">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-indigo-200 tracking-wide uppercase">Next Generation Motion</span>
                </div>

                <div ref={headlineRef} className="text-center mb-8">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white">
                        Drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Digital</span>
                    </h1>
                </div>

                <p ref={textRef} className="max-w-2xl text-center text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-20">
                    Experience seamless, scroll-driven kinetic animations that bring your interface to life. Precision engineered for 60fps performance and stunning visual fidelity.
                </p>

                {/* Statistics Grid */}
                <div ref={statsRef} className="w-full max-w-5xl">
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

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
                <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase">Scroll to explore</p>
                <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
            </div>
        </div>
    );
}