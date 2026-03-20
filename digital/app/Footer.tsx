"use client";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#020202] text-white py-20 px-4 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-sm" />
                            </div>
                            <h3 className="text-xl font-medium tracking-tight text-white">
                                Kinetic
                            </h3>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed font-light pr-8">
                            A premium demonstration of scroll-based animations using React, Tailwind CSS, and GSAP. Experience smooth, performant motion that responds to your subtle inputs.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-6 text-zinc-300 uppercase tracking-widest">Capabilities</h3>
                        <ul className="text-zinc-500 text-sm space-y-4 font-light">
                            <li className="hover:text-indigo-400 transition-colors cursor-pointer">Scroll-Linked Motion</li>
                            <li className="hover:text-indigo-400 transition-colors cursor-pointer">Staggered Reveals</li>
                            <li className="hover:text-indigo-400 transition-colors cursor-pointer">Glassmorphism UI</li>
                            <li className="hover:text-indigo-400 transition-colors cursor-pointer">Responsive Engine</li>
                            <li className="hover:text-indigo-400 transition-colors cursor-pointer">60fps Rendering</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-6 text-zinc-300 uppercase tracking-widest">Ecosystem</h3>
                        <ul className="text-zinc-500 text-sm space-y-4 font-light">
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">React 19</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Tailwind CSS 4</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">GSAP Core</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">TypeScript</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Next.js App Router</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm font-light pt-8 border-t border-white/5">
                    <p>© {currentYear} Kinetic Interface Studio. All rights reserved.</p>
                    <p className="mt-4 md:mt-0 flex items-center gap-2">
                        Engineered with <span className="text-indigo-500/80">✦</span> for precision
                    </p>
                </div>
            </div>
        </footer>
    );
}