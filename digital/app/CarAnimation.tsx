"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CarAnimation() {
    const carContainerRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const darkBandRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!carRef.current || !darkBandRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: darkBandRef.current,
                start: 'top center',
                end: 'bottom center',
                scrub: 1.2,
                invalidateOnRefresh: true, // Recalculate function-based values on resize
            },
        });

        // Calculate travel distance based on window width for symmetry
        const calculateDistance = () => {
            if (typeof window !== 'undefined') {
                // Return window width minus car width (420px) and padding (32px left/right symmetry)
                return window.innerWidth - 452;
            }
            return 1200; // fallback value
        };

        tl.to(
            carRef.current,
            {
                x: calculateDistance, // Use function reference so it updates dynamically
                ease: 'none', // Linear scrub is visually smoother
            },
            0
        );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={carContainerRef} className="relative w-full bg-[#050505]">
            {/* Dark band containing the car */}
            <div
                ref={darkBandRef}
                className="relative w-full h-[400px] bg-[#0a0a0a] border-y border-white/5 flex items-center overflow-hidden"
            >
                {/* Glow effects */}
                <div className="absolute left-1/4 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute right-1/4 bottom-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Accent bar on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-indigo-500/20 to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-indigo-500/50" />

                {/* Car container with scroll animation */}
                <div
                    ref={carRef}
                    className="absolute left-4 flex items-center drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    style={{ willChange: 'transform' }}
                >
                    {/* Realistic Sports Car SVG - Top View */}
                    <svg
                        width="420"
                        height="200"
                        viewBox="0 0 420 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            {/* Body Gradients */}
                            <linearGradient id="bodyMain" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#e5e7eb" />
                                <stop offset="50%" stopColor="#f9fafb" />
                                <stop offset="100%" stopColor="#d1d5db" />
                            </linearGradient>

                            <linearGradient id="bodyHighlight" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>

                            <linearGradient id="bodyShadow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                            </linearGradient>

                            {/* Glass Gradient */}
                            <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
                                <stop offset="50%" stopColor="#0f172a" stopOpacity="0.98" />
                                <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                            </linearGradient>

                            {/* Tire Gradient */}
                            <radialGradient id="tireGrad">
                                <stop offset="0%" stopColor="#1f2937" />
                                <stop offset="70%" stopColor="#111827" />
                                <stop offset="100%" stopColor="#030712" />
                            </radialGradient>

                            {/* Rim Gradient */}
                            <radialGradient id="rimGrad">
                                <stop offset="0%" stopColor="#cbd5e1" />
                                <stop offset="50%" stopColor="#94a3b8" />
                                <stop offset="100%" stopColor="#64748b" />
                            </radialGradient>

                            {/* Headlight Glow */}
                            <radialGradient id="headlightGlow">
                                <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                            </radialGradient>

                            {/* Taillight Glow */}
                            <radialGradient id="taillightGlow">
                                <stop offset="0%" stopColor="#f87171" stopOpacity="1" />
                                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                            </radialGradient>

                            {/* Shadow filter */}
                            <filter id="dropShadow">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                                <feOffset dx="0" dy="2" result="offsetblur" />
                                <feComponentTransfer>
                                    <feFuncA type="linear" slope="0.5" />
                                </feComponentTransfer>
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Car Shadow */}
                        <ellipse cx="210" cy="100" rx="140" ry="70" fill="#000000" opacity="0.3" filter="blur(8px)" />

                        {/* ===== WHEELS ===== */}

                        {/* Front Left Wheel */}
                        <g>
                            {/* Tire */}
                            <ellipse cx="110" cy="50" rx="28" ry="22" fill="url(#tireGrad)" />
                            {/* Tire tread pattern */}
                            <ellipse cx="110" cy="50" rx="24" ry="18" fill="none" stroke="#0a0a0a" strokeWidth="2" />
                            <ellipse cx="110" cy="50" rx="20" ry="15" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
                            {/* Rim */}
                            <ellipse cx="110" cy="50" rx="15" ry="12" fill="url(#rimGrad)" />
                            {/* Rim spokes */}
                            <line x1="110" y1="38" x2="110" y2="62" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="95" y1="50" x2="125" y2="50" stroke="#94a3b8" strokeWidth="2" />
                            <circle cx="110" cy="50" r="5" fill="#475569" />
                        </g>

                        {/* Front Right Wheel */}
                        <g>
                            <ellipse cx="110" cy="150" rx="28" ry="22" fill="url(#tireGrad)" />
                            <ellipse cx="110" cy="150" rx="24" ry="18" fill="none" stroke="#0a0a0a" strokeWidth="2" />
                            <ellipse cx="110" cy="150" rx="20" ry="15" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
                            <ellipse cx="110" cy="150" rx="15" ry="12" fill="url(#rimGrad)" />
                            <line x1="110" y1="138" x2="110" y2="162" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="95" y1="150" x2="125" y2="150" stroke="#94a3b8" strokeWidth="2" />
                            <circle cx="110" cy="150" r="5" fill="#475569" />
                        </g>

                        {/* Rear Left Wheel */}
                        <g>
                            <ellipse cx="310" cy="50" rx="28" ry="22" fill="url(#tireGrad)" />
                            <ellipse cx="310" cy="50" rx="24" ry="18" fill="none" stroke="#0a0a0a" strokeWidth="2" />
                            <ellipse cx="310" cy="50" rx="20" ry="15" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
                            <ellipse cx="310" cy="50" rx="15" ry="12" fill="url(#rimGrad)" />
                            <line x1="310" y1="38" x2="310" y2="62" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="295" y1="50" x2="325" y2="50" stroke="#94a3b8" strokeWidth="2" />
                            <circle cx="310" cy="50" r="5" fill="#475569" />
                        </g>

                        {/* Rear Right Wheel */}
                        <g>
                            <ellipse cx="310" cy="150" rx="28" ry="22" fill="url(#tireGrad)" />
                            <ellipse cx="310" cy="150" rx="24" ry="18" fill="none" stroke="#0a0a0a" strokeWidth="2" />
                            <ellipse cx="310" cy="150" rx="20" ry="15" fill="none" stroke="#0a0a0a" strokeWidth="1" opacity="0.5" />
                            <ellipse cx="310" cy="150" rx="15" ry="12" fill="url(#rimGrad)" />
                            <line x1="310" y1="138" x2="310" y2="162" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="295" y1="150" x2="325" y2="150" stroke="#94a3b8" strokeWidth="2" />
                            <circle cx="310" cy="150" r="5" fill="#475569" />
                        </g>

                        {/* ===== CAR BODY ===== */}

                        {/* Main Body Shape */}
                        <path
                            d="M 70 80 Q 60 100 70 120 L 90 140 L 110 145 L 310 145 L 330 140 L 350 120 Q 360 100 350 80 L 330 60 L 310 55 L 110 55 L 90 60 Z"
                            fill="url(#bodyMain)"
                            stroke="#9ca3af"
                            strokeWidth="1"
                            filter="url(#dropShadow)"
                        />

                        {/* Body Highlight - Top Center */}
                        <path
                            d="M 120 70 Q 210 65 300 70 L 310 80 Q 210 75 110 80 Z"
                            fill="url(#bodyHighlight)"
                            opacity="0.6"
                        />

                        {/* Body Shadow - Bottom */}
                        <path
                            d="M 90 130 L 110 140 L 310 140 L 330 130 L 330 125 L 90 125 Z"
                            fill="url(#bodyShadow)"
                        />

                        {/* Hood/Front Section */}
                        <path
                            d="M 80 85 Q 70 100 80 115 L 100 125 L 130 128 L 130 72 L 100 75 Z"
                            fill="#d1d5db"
                            stroke="#9ca3af"
                            strokeWidth="0.5"
                        />

                        {/* Hood Detail Line */}
                        <path
                            d="M 130 75 L 130 125"
                            stroke="#9ca3af"
                            strokeWidth="1"
                            opacity="0.5"
                        />

                        {/* ===== WINDOWS ===== */}

                        {/* Windshield */}
                        <path
                            d="M 145 75 L 160 68 L 260 68 L 275 75 L 270 85 L 150 85 Z"
                            fill="url(#glassGrad)"
                            stroke="#334155"
                            strokeWidth="1"
                        />

                        {/* Windshield reflection */}
                        <path
                            d="M 165 70 L 255 70 L 265 78 L 155 78 Z"
                            fill="#64748b"
                            opacity="0.3"
                        />

                        {/* Driver Side Window */}
                        <path
                            d="M 150 90 L 155 87 L 190 87 L 195 90 L 195 110 L 190 113 L 155 113 L 150 110 Z"
                            fill="url(#glassGrad)"
                            stroke="#334155"
                            strokeWidth="1"
                        />

                        {/* Passenger Side Window */}
                        <path
                            d="M 225 90 L 230 87 L 265 87 L 270 90 L 270 110 L 265 113 L 230 113 L 225 110 Z"
                            fill="url(#glassGrad)"
                            stroke="#334155"
                            strokeWidth="1"
                        />

                        {/* Rear Window */}
                        <path
                            d="M 145 125 L 150 115 L 270 115 L 275 125 L 270 132 L 260 135 L 160 135 L 150 132 Z"
                            fill="url(#glassGrad)"
                            stroke="#334155"
                            strokeWidth="1"
                        />

                        {/* ===== DOORS & BODY PANELS ===== */}

                        {/* Door panel lines */}
                        <line x1="200" y1="72" x2="200" y2="128" stroke="#9ca3af" strokeWidth="1" opacity="0.4" />
                        <line x1="220" y1="72" x2="220" y2="128" stroke="#9ca3af" strokeWidth="1" opacity="0.4" />

                        {/* Side Mirrors */}
                        <ellipse cx="140" cy="65" rx="8" ry="6" fill="#d1d5db" stroke="#9ca3af" strokeWidth="0.5" />
                        <ellipse cx="140" cy="135" rx="8" ry="6" fill="#d1d5db" stroke="#9ca3af" strokeWidth="0.5" />
                        <rect x="138" y="63" width="4" height="4" rx="1" fill="#1e293b" opacity="0.7" />
                        <rect x="138" y="133" width="4" height="4" rx="1" fill="#1e293b" opacity="0.7" />

                        {/* ===== LIGHTS ===== */}

                        {/* Headlights */}
                        <g>
                            {/* Left Headlight */}
                            <ellipse cx="75" cy="85" rx="12" ry="8" fill="url(#headlightGlow)" opacity="0.8" />
                            <ellipse cx="75" cy="85" rx="8" ry="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1" />
                            <ellipse cx="73" cy="83" rx="3" ry="2" fill="#ffffff" opacity="0.9" />

                            {/* Right Headlight */}
                            <ellipse cx="75" cy="115" rx="12" ry="8" fill="url(#headlightGlow)" opacity="0.8" />
                            <ellipse cx="75" cy="115" rx="8" ry="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1" />
                            <ellipse cx="73" cy="113" rx="3" ry="2" fill="#ffffff" opacity="0.9" />
                        </g>

                        {/* Taillights */}
                        <g>
                            {/* Left Taillight */}
                            <ellipse cx="345" cy="85" rx="12" ry="8" fill="url(#taillightGlow)" opacity="0.7" />
                            <ellipse cx="345" cy="85" rx="8" ry="6" fill="#fecaca" stroke="#ef4444" strokeWidth="1" />
                            <rect x="342" y="83" width="6" height="4" fill="#dc2626" opacity="0.8" />

                            {/* Right Taillight */}
                            <ellipse cx="345" cy="115" rx="12" ry="8" fill="url(#taillightGlow)" opacity="0.7" />
                            <ellipse cx="345" cy="115" rx="8" ry="6" fill="#fecaca" stroke="#ef4444" strokeWidth="1" />
                            <rect x="342" y="113" width="6" height="4" fill="#dc2626" opacity="0.8" />
                        </g>

                        {/* ===== DETAILS ===== */}

                        {/* Roof Detail Line */}
                        <line x1="145" y1="100" x2="275" y2="100" stroke="#e5e7eb" strokeWidth="1.5" opacity="0.4" />

                        {/* Door Handles */}
                        <rect x="195" y="65" width="10" height="3" rx="1.5" fill="#64748b" />
                        <rect x="215" y="65" width="10" height="3" rx="1.5" fill="#64748b" />
                        <rect x="195" y="132" width="10" height="3" rx="1.5" fill="#64748b" />
                        <rect x="215" y="132" width="10" height="3" rx="1.5" fill="#64748b" />

                        {/* Exhaust pipes */}
                        <ellipse cx="340" cy="90" rx="4" ry="3" fill="#1f2937" stroke="#374151" strokeWidth="0.5" />
                        <ellipse cx="340" cy="110" rx="4" ry="3" fill="#1f2937" stroke="#374151" strokeWidth="0.5" />

                        {/* Antenna */}
                        <line x1="280" y1="100" x2="285" y2="95" stroke="#6b7280" strokeWidth="1" />
                        <circle cx="285" cy="95" r="1.5" fill="#9ca3af" />
                    </svg>
                </div>
            </div>

            {/* Content section below */}
            <div className="w-full bg-[#050505] py-32 px-4 flex items-center justify-center relative z-10">
                <div className="text-center max-w-3xl">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-8">
                        Precision <span className="text-zinc-500">Motion</span>
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-12">
                        The animation responds directly to your scroll position, creating a smooth and
                        interactive experience. The motion is tied to progress, not time, granting you
                        unprecedented control over the interface flow.
                    </p>
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 mt-4">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        <p className="text-sm text-zinc-300 font-medium tracking-wide">
                            Scroll gently to experience the fluid motion tracking
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}