"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
    icon: string;
    title: string;
    description: string;
    gradient: string;
}

const features: Feature[] = [
    {
        icon: '⚡',
        title: 'Smooth Performance',
        description: 'Optimized animations using transform properties for 60fps motion without jank.',
        gradient: 'from-blue-400 to-indigo-400',
    },
    {
        icon: '🎯',
        title: 'Scroll-Driven',
        description: 'Animation tied directly to scroll progress, giving users complete control.',
        gradient: 'from-emerald-400 to-teal-400',
    },
    {
        icon: '✨',
        title: 'Premium Feel',
        description: 'Carefully crafted easing and timing create a luxurious, polished experience.',
        gradient: 'from-purple-400 to-pink-400',
    },
    {
        icon: '📱',
        title: 'Responsive Design',
        description: 'Adapts beautifully across all screen sizes and devices flawlessly.',
        gradient: 'from-orange-400 to-red-400',
    },
];

export default function FeaturesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current || cardsRef.current.length === 0) return;

        gsap.fromTo(cardsRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-[#050505] py-32 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section header */}
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-semibold text-white mb-6 tracking-tight">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Excellence</span>
                    </h2>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Every detail is crafted to deliver a premium, performant experience that feels responsive and intentional.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 overflow-hidden hover:border-white/10 transition-all duration-500"
                        >
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${feature.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                            
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl text-white mb-4 font-medium tracking-tight">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-zinc-400 font-light leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}