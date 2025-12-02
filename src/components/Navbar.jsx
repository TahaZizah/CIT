import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-black/40 backdrop-blur-xl border-white/10 py-3'
                : 'bg-transparent border-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center relative min-h-[4rem]">

                {/* Logo */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-4 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="relative h-14 w-auto md:h-16 flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <img
                            src={`${import.meta.env.BASE_URL}Cit.png`}
                            alt="Club Logo"
                            className="relative h-full w-auto object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6 ml-auto">

                    {/* Back button */}
                    {!isHome && (
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white/80 hover:text-white transition-colors flex items-center gap-1 group"
                        >
                            <span className="hidden md:inline font-mono text-xs tracking-widest mr-2">BACK</span>
                            <ChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                    )}

                    <button className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group">
                        <span className="font-mono text-xs text-white tracking-wider">CONNECTED</span>
                        <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
                    </button>

                </div>
            </div>
        </nav>
    );
}
