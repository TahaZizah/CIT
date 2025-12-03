import React from 'react';
import { useNavigate } from 'react-router-dom';
import Scene from '../canvas/Scene';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-black overflow-x-hidden relative">
            <Navbar />

            {/* Hero Section */}
            <main className="relative flex items-center justify-center h-screen w-full">
                {/* Background Decorative Elements 
        (Optional: just to give the text depth context) 
      */}
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-500/10 rounded-full blur-[100px]" /> */}


                {/* Background Text (Behind 3D) */}
                <div className="absolute inset-0 flex items-start pt-40 md:items-center md:pt-0 justify-center z-0 pointer-events-none select-none">
                    <h1
                        className="flex flex-col items-center justify-center w-full text-center"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }} // Ensure you import this font or it defaults to monospace
                    >
                        {/* First Line: 2026
             - Increased contrast with 'from-white'
             - Added distinct drop-shadow for clarity
          */}
                        <span
                            className="block text-[30vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter 
                       bg-gradient-to-b from-white via-cyan-300 to-blue-500 
                       bg-clip-text text-transparent 
                       filter drop-shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                        >
                            2026
                        </span>

                        {/* Second Line: HOODIE
             - Matches width visually
             - Slightly different gradient for depth
          */}
                        <span
                            className="block text-[20vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter 
                       bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600 
                       bg-clip-text text-transparent 
                       filter drop-shadow-[0_0_30px_rgba(79,70,229,0.4)]"
                        >
                            HOODIE
                        </span>
                    </h1>
                </div>

                {/* 3D Scene (Overlay) */}
                <div className="absolute inset-0 z-10">
                    <Scene />
                </div>

                {/* Foreground Content (CTA) */}
                <div className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <Button onClick={() => navigate('/order')} className="border-2 border-blue-500 bg-black/50 hover:bg-blue-500 hover:text-black text-black shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                            INITIATE ORDER
                        </Button>
                    </div>
                    <p className="mt-4 text-blue-400/70 text-xs font-mono tracking-[0.3em] uppercase animate-pulse">
                        &lt; LIMITED EDITION DROP /&gt;
                    </p>
                </div>
            </main>

            {/* Gallery Section */}
            <div className="relative z-20 bg-black">
                <footer className="py-8 text-center text-blue-900 text-xs font-mono border-t border-blue-900/20">
                    &copy; 2026 CIT. SYSTEM ONLINE.
                </footer>
            </div>
        </div>
    );
}
