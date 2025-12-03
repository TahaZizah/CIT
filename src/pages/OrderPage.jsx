import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    CheckCircle,
    AlertCircle,
    Package,
    Star,
    ShieldCheck,
    CreditCard
} from 'lucide-react';
import NavBar from '../components/Navbar';

// ==========================================
// CRITICAL CONFIGURATION - MUST UPDATE THESE
// ==========================================

// 1. URL FIX: We changed '/viewform' to '/formResponse'
// The ID '1FAIpQLSddnVTbtmhTJDgkXdLMlTOjPrE-EL-9hmtzCBB-jBuN0YLF-g' is from your link.
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSddnVTbtmhTJDgkXdLMlTOjPrE-EL-9hmtzCBB-jBuN0YLF-g/formResponse";

// 2. ENTRY ID FIX: You MUST inspect your Google Form to find these.
// How to find them:
// 1. Open your Google Form in a browser.
// 2. Right-click > "View Page Source".
// 3. Ctrl+F (Find) and search for "entry."
// 4. Map the numbers (e.g., entry.123456) to the fields below.
const FORM_FIELDS = {
    EMAIL: "entry.1871437445",
    NAME: "entry.2100829503",
    YEAR: "entry.1049927325",
    MAJOR: "entry.1836592500",
    PHONE: "entry.1399618403",
    SIZE: "entry.1533926266",
    // Note: 'Payment' isn't usually a form field unless you have a specific question for it
};

export default function OrderPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        year: '',
        major: '',
        phone: '',
        payment: '',
        size: '',
        rating: '0'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating: String(rating) });
    };

    const SIZE_MAPPING = {
        'S': 'S (Small)',
        'M': 'M (Medium)',
        'L': 'L (Large)',
        'XL': 'XL (Extra Large)',
        'XXL': 'XXL (Double Extra Large)',
        'XXXL': 'XXXL (Triple Extra Large)'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Create the form data payload using URLSearchParams (standard for Google Forms)
        const formBody = new URLSearchParams();

        // Map state data to Google Form Entry IDs
        formBody.append(FORM_FIELDS.EMAIL, formData.email);
        formBody.append(FORM_FIELDS.NAME, formData.name);
        formBody.append(FORM_FIELDS.YEAR, formData.year);
        formBody.append(FORM_FIELDS.MAJOR, formData.major);
        formBody.append(FORM_FIELDS.PHONE, formData.phone);
        // Map the size code (S, M, L) to the full string expected by Google Forms
        formBody.append(FORM_FIELDS.SIZE, SIZE_MAPPING[formData.size] || formData.size);

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: formBody,
                mode: 'no-cors'
            });

            setSubmitted(true);
            window.scrollTo(0, 0);
        } catch (err) {
            console.error("Form submission error:", err);
            setError("Connection error. Please check your internet and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- SUCCESS STATE (Order Confirmation) ---
    if (submitted) {
        return (
            <div className="min-h-screen bg-black font-mono text-cyan-400 selection:bg-cyan-500/30">
                <div className="max-w-3xl mx-auto p-6 md:p-12">
                    <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-8 shadow-[0_0_20px_rgba(0,243,255,0.1)] relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="flex items-center gap-3 text-cyan-400 mb-6">
                            <CheckCircle size={32} className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                            <h2 className="text-2xl font-bold tracking-tight">ORDER SUBMITTED</h2>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded border border-cyan-500/20 mb-8 text-sm font-mono">
                            <div className="font-bold text-cyan-100 mb-2 uppercase tracking-wider text-xs border-b border-cyan-500/20 pb-1">Delivery Vector</div>
                            <div className="text-cyan-300/90 mt-2">{formData.name}</div>
                            <div className="text-cyan-300/90">{formData.phone}</div>
                            <div className="text-cyan-300/90">{formData.major} - {formData.year}</div>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="w-full md:w-auto px-8 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 font-bold tracking-widest text-xs uppercase"
                        >
                            Return to Base
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- MAIN CHECKOUT PAGE ---
    return (
        <div className="min-h-screen bg-[#050505] font-mono text-cyan-400 selection:bg-cyan-500/30 pb-12 relative overflow-x-hidden">
            {/* Background Grid Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Minimalist Checkout Header */}
            <NavBar />

            <div className="max-w-6xl mx-auto px-4 pt-24 pb-8 relative z-10">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                    {/* LEFT COLUMN - FORM FIELDS */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* 1. Delivery Address Section */}
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-cyan-950/10">
                                <h2 className="text-lg font-bold text-cyan-100 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-sm bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/50">1</span>
                                    SHIPPING ADDRESS
                                </h2>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Full name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-900/50 border border-cyan-900/50 rounded-sm text-cyan-100 placeholder-cyan-900/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all"
                                        placeholder="ENTER FULL NAME"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Phone number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-900/50 border border-cyan-900/50 rounded-sm text-cyan-100 placeholder-cyan-900/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all"
                                        placeholder="06 XX XX XX XX"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-900/50 border border-cyan-900/50 rounded-sm text-cyan-100 placeholder-cyan-900/50 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] outline-none transition-all"
                                        placeholder="name@example.com"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Major</label>
                                        <div className="relative">
                                            <select
                                                name="major"
                                                required
                                                value={formData.major}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-slate-900/50 border border-cyan-900/50 rounded-sm text-cyan-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none appearance-none"
                                            >
                                                <option value="" className="bg-black text-gray-500">SELECT MAJOR</option>
                                                <option value="ASEDS" className="bg-slate-900">ASEDS</option>
                                                <option value="ICCN" className="bg-slate-900">ICCN</option>
                                                <option value="AMOA" className="bg-slate-900">AMOA</option>
                                                <option value="DATA" className="bg-slate-900">DATA</option>
                                                <option value="SMART" className="bg-slate-900">SMART</option>
                                                <option value="SESNUM" className="bg-slate-900">SESNUM</option>
                                                <option value="CLOUD" className="bg-slate-900">CLOUD</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-600">
                                                <ChevronRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider">Year</label>
                                        <div className="relative">
                                            <select
                                                name="year"
                                                required
                                                value={formData.year}
                                                onChange={handleChange}
                                                className="w-full p-3 bg-slate-900/50 border border-cyan-900/50 rounded-sm text-cyan-100 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none appearance-none"
                                            >
                                                <option value="" className="bg-black text-gray-500">SELECT YEAR</option>
                                                <option value="INE1" className="bg-slate-900">INE1</option>
                                                <option value="INE2" className="bg-slate-900">INE2</option>
                                                <option value="INE3" className="bg-slate-900">INE3</option>
                                                <option value="Master" className="bg-slate-900">Master</option>
                                                <option value="Lauréat" className="bg-slate-900">Lauréat</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-600">
                                                <ChevronRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Product Options Section */}
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-cyan-950/10">
                                <h2 className="text-lg font-bold text-cyan-100 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-sm bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/50">2</span>
                                    ITEM CONFIGURATION
                                </h2>
                            </div>
                            <div className="p-6">
                                <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-3 block">Select Size:</label>
                                <div className="flex flex-wrap gap-3">
                                    {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                                        <label key={size} className="cursor-pointer relative group">
                                            <input
                                                type="radio"
                                                name="size"
                                                value={size}
                                                checked={formData.size === size}
                                                onChange={handleChange}
                                                className="hidden peer"
                                            />
                                            <div className="w-14 h-12 flex items-center justify-center border border-cyan-900/50 rounded-sm bg-slate-900/50 text-cyan-500/70 text-sm font-medium 
                                                          group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]
                                                          peer-checked:bg-cyan-500/20 peer-checked:border-cyan-400 peer-checked:text-cyan-300 peer-checked:font-bold peer-checked:shadow-[0_0_15px_rgba(6,182,212,0.4)]
                                                          transition-all duration-200">
                                                {size}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Section */}
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 bg-cyan-950/10">
                                <h2 className="text-lg font-bold text-cyan-100 flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-sm bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/50">3</span>
                                    PAYMENT METHOD
                                </h2>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="border border-cyan-500/50 bg-cyan-500/5 rounded-sm p-4 flex items-start gap-3 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                                    <input
                                        type="radio"
                                        checked={true}
                                        readOnly
                                        className="mt-1 h-4 w-4 accent-cyan-500 bg-transparent border-cyan-500"
                                    />
                                    <div>
                                        <div className="font-bold text-sm text-cyan-100">Cash on Delivery</div>
                                        <div className="text-xs text-cyan-400/70 mt-1">Payment required upon physical receipt at campus location.</div>
                                    </div>
                                </div>
                                <div className="opacity-40 pointer-events-none border border-cyan-900/30 rounded-sm p-4 flex items-start gap-3 grayscale">
                                    <input type="radio" disabled className="mt-1 h-4 w-4" />
                                    <div>
                                        <div className="font-bold text-sm text-gray-400 flex items-center gap-2">
                                            Digital Transaction <span className="text-[9px] bg-gray-800 text-gray-400 px-1 rounded border border-gray-700">OFFLINE</span>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <CreditCard size={16} className="text-gray-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Feedback / Rating (Optional) */}
                        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] p-6">
                            <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-3">Hype Level</h3>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className="focus:outline-none group"
                                    >
                                        <Star
                                            size={24}
                                            fill={Number(formData.rating) >= star ? "#06b6d4" : "none"}
                                            color={Number(formData.rating) >= star ? "#06b6d4" : "#1e293b"}
                                            className="transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - ORDER SUMMARY (Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">

                            {/* Place Order Box */}
                            <div className="bg-black/80 backdrop-blur-md border border-cyan-500/50 rounded-lg p-5 shadow-[0_0_30px_rgba(0,243,255,0.15)] relative overflow-hidden">
                                {/* Animated border gradient effect could go here */}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 py-3 rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] text-sm font-bold tracking-widest uppercase cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mb-4 transition-all duration-300"
                                >
                                    {isSubmitting ? 'PROCESSING...' : 'ORDER'}
                                </button>

                                <p className="text-[10px] text-center text-cyan-700/60 mb-4 px-2 font-mono">
                                    By executing this command, you agree to the <span className="text-cyan-500 underline cursor-pointer">Protocols</span> and <span className="text-cyan-500 underline cursor-pointer">Data Policy</span>.
                                </p>

                                <div className="border-t border-cyan-900/50 pt-4 space-y-2">
                                    <h3 className="font-bold text-lg text-cyan-100">Summary</h3>

                                    <div className="flex justify-between text-sm text-cyan-400/80">
                                        <span>Item (1):</span>
                                        <span className="font-mono">250.00 DH</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-cyan-400/80">
                                        <span>Shipping:</span>
                                        <span className="font-mono">0.00 DH</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-cyan-400/80">
                                        <span>Promotion:</span>
                                        <span className="text-red-400 font-mono">-28%</span>
                                    </div>

                                    <div className="border-t border-cyan-900/50 my-2 pt-2 flex justify-between items-center">
                                        <span className="font-bold text-lg text-cyan-100">Total:</span>
                                        <span className="font-bold text-xl text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] font-mono">180.00 DH</span>
                                    </div>
                                </div>

                                <div className="bg-cyan-950/20 rounded p-3 mt-4 text-[10px] text-cyan-600/80 flex gap-2 border border-cyan-900/30">
                                    <ShieldCheck size={14} className="text-cyan-500 shrink-0" />
                                    <span>Encrypted transaction. No payment data stored on local servers.</span>
                                </div>
                            </div>

                            {/* Item in Cart Preview */}
                            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-5 shadow-sm">
                                <h3 className="font-bold text-cyan-600 text-xs uppercase tracking-wider mb-3">Manifest</h3>
                                <div className="flex gap-4">
                                    {/* Placeholder Image */}
                                    <div className="w-16 h-16 bg-slate-900 rounded border border-cyan-900/50 flex items-center justify-center shrink-0">
                                        <Package className="text-cyan-700" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-cyan-100 leading-snug">
                                            CIT HOODIE V2026
                                        </div>
                                        <div className="text-[10px] text-green-500 font-bold mt-1 uppercase tracking-wider">Stock_Available</div>
                                        <div className="text-xs text-cyan-500/70 mt-1">Size: <span className="font-bold text-cyan-300">{formData.size}</span></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

                {error && (
                    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-950/90 border border-red-500 text-red-200 px-6 py-4 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-3 animate-slide-up z-50 backdrop-blur-md">
                        <AlertCircle size={20} className="text-red-500" />
                        <span className="font-mono text-sm">{error}</span>
                    </div>
                )}
            </div>

            {/* Simple Footer */}
            <footer className="border-t border-cyan-900/30 mt-12 bg-black/80 py-8">
                <div className="text-center text-xs text-cyan-800/50 space-y-2 font-mono">
                    <p>© 2026 CIT SYSTEMS. ALL RIGHTS RESERVED.</p>
                    <div className="space-x-4 text-cyan-700/70">
                        <a href="#" className="hover:text-cyan-400 transition-colors">PRIVACY PROTOCOL</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">TERMS OF ENGAGEMENT</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}