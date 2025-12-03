import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    CheckCircle,
    AlertCircle,
    Package,
    Star,
    ShieldCheck,
    CreditCard,
    MapPin,
    Truck,
    Info
} from 'lucide-react';
import NavBar from '../components/Navbar';

// ==========================================
// CONFIGURATION
// ==========================================
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSddnVTbtmhTJDgkXdLMlTOjPrE-EL-9hmtzCBB-jBuN0YLF-g/formResponse";

const FORM_FIELDS = {
    EMAIL: "entry.1871437445",
    NAME: "entry.2100829503",
    YEAR: "entry.1049927325",
    MAJOR: "entry.1836592500",
    PHONE: "entry.1399618403",
    SIZE: "entry.1533926266",
    PAYMENT_METHOD: "entry.1830317645",
    AGREEMENT: "entry.1230404767",
};

const SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const MAJORS = ['ASEDS', 'ICCN', 'AMOA', 'DATA', 'SMART', 'SESNUM', 'CLOUD'];
const YEARS = ['INE1', 'INE2', 'INE3', 'Master', 'Lauréat'];

// ==========================================
// UI COMPONENTS (Internal)
// ==========================================

const SectionHeader = ({ number, title, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-cyan-900/30">
        <div className="flex items-center justify-center w-8 h-8 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
            {number}
        </div>
        <h2 className="text-lg font-bold text-cyan-50 tracking-wide flex items-center gap-2">
            {title}
            {Icon && <Icon size={16} className="text-cyan-600" />}
        </h2>
    </div>
);

const InputField = ({ label, name, type = "text", value, onChange, placeholder, icon: Icon }) => (
    <div className="space-y-2 group">
        <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider ml-1 group-focus-within:text-cyan-400 transition-colors">
            {label}
        </label>
        <div className="relative">
            <input
                type={type}
                name={name}
                required
                value={value}
                onChange={onChange}
                className="w-full p-3.5 bg-slate-900/60 border border-slate-800 rounded text-cyan-50 placeholder-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:bg-slate-900 outline-none transition-all duration-300 pl-10"
                placeholder={placeholder}
            />
            {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors">
                    <Icon size={18} />
                </div>
            )}
        </div>
    </div>
);

const SelectField = ({ label, name, value, onChange, options, placeholder }) => (
    <div className="space-y-2 group">
        <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider ml-1 group-focus-within:text-cyan-400 transition-colors">
            {label}
        </label>
        <div className="relative">
            <select
                name={name}
                required
                value={value}
                onChange={onChange}
                className="w-full p-3.5 bg-slate-900/60 border border-slate-800 rounded text-cyan-50 appearance-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all cursor-pointer"
            >
                <option value="" className="bg-black text-slate-500">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt} value={opt} className="bg-slate-900">{opt}</option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-600">
                <ChevronRight size={16} className="rotate-90" />
            </div>
        </div>
    </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function OrderPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        year: '',
        major: '',
        phone: '',
        size: '',
        paymentMethod: '',
        agreedToAdvance: false,
        rating: '0'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    // Scroll to top on mount
    useEffect(() => window.scrollTo(0, 0), []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // EXACT TEXT MATCHING FOR GOOGLE FORMS
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
        
        if(!formData.size) {
            setError("Please select a size to continue.");
            return;
        }

        if(!formData.paymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        // Validate phone number: exactly 10 digits, no letters
        const phoneRegex = /^\d{10}$/;
        if(!phoneRegex.test(formData.phone)) {
            setError("Phone number must be exactly 10 digits with no letters.");
            return;
        }

        if(!formData.agreedToAdvance) {
            setError("Please confirm the advance payment terms.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const formBody = new URLSearchParams();
        
        // Append fields strictly matching Google Form expectations
        formBody.append(FORM_FIELDS.EMAIL, formData.email);
        formBody.append(FORM_FIELDS.NAME, formData.name);
        formBody.append(FORM_FIELDS.YEAR, formData.year);
        formBody.append(FORM_FIELDS.MAJOR, formData.major);
        formBody.append(FORM_FIELDS.PHONE, formData.phone);
        // Map short size code (e.g., 'S') to full form string (e.g., 'S (Small)')
        formBody.append(FORM_FIELDS.SIZE, SIZE_MAPPING[formData.size] || formData.size);
        // IMPORTANT: Must match form option casing exactly
        formBody.append(FORM_FIELDS.PAYMENT_METHOD, formData.paymentMethod);
        // IMPORTANT: Must match checkbox label exactly
        formBody.append(FORM_FIELDS.AGREEMENT, "I agree to pay a 50 DH advance to confirm my order");

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: formBody,
                mode: 'no-cors' // This hides the CORS error but also hides successful status
            });
            // Since we use no-cors, we assume success if no network error occurred
            setTimeout(() => {
                setSubmitted(true);
                window.scrollTo(0, 0);
            }, 800);
        } catch (err) {
            console.error("Submission error:", err);
            setError("Connection failed. Please retry.");
        } finally {
             if (!submitted) setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#050505] font-sans flex items-center justify-center p-4">
                 <div className="max-w-md w-full bg-slate-900/50 border border-cyan-500/30 rounded-xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden text-center">
                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent left-0" />
                    
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <CheckCircle size={40} className="text-cyan-400" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Order Confirmed</h2>
                    <p className="text-cyan-200/60 mb-8">Your request has been processed successfully.</p>
                    
                    <div className="bg-black/30 rounded-lg p-4 mb-8 text-left border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-3 tracking-wider">Order Details</div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-400">Recipient:</span>
                            <span className="text-cyan-100 font-medium">{formData.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Size:</span>
                            <span className="text-cyan-100 font-medium">{formData.size}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] uppercase tracking-wide text-sm"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-slate-200 selection:bg-cyan-500/30 pb-20 relative font-sans">
            {/* Background Texture */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} 
            />

            <NavBar />

            <div className="max-w-7xl mx-auto px-4 pt-28 relative z-10">
                
                {/* Header Title */}
                <div className="mb-10 text-center md:text-left border-b border-slate-800 pb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Secure Checkout</h1>
                    <p className="text-slate-500">Complete your details to secure your CIT merchandise.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* 1. SHIPPING DETAILS */}
                        <section className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-800/60 shadow-xl">
                            <SectionHeader number="1" title="Personal Details" icon={MapPin} />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputField 
                                        label="Full Name" 
                                        name="name" 
                                        placeholder="" 
                                        value={formData.name} 
                                        onChange={handleChange}
                                    />
                                </div>
                                <InputField 
                                    label="Email Address" 
                                    name="email" 
                                    type="email" 
                                    placeholder="student@inpt.ac.ma" 
                                    value={formData.email} 
                                    onChange={handleChange}
                                />
                                <InputField 
                                    label="Phone Number" 
                                    name="phone" 
                                    type="tel" 
                                    placeholder="06 XX XX XX XX" 
                                    value={formData.phone} 
                                    onChange={handleChange}
                                />
                                <SelectField 
                                    label="Major" 
                                    name="major" 
                                    value={formData.major} 
                                    onChange={handleChange} 
                                    options={MAJORS} 
                                    placeholder="Select Major" 
                                />
                                <SelectField 
                                    label="Academic Year" 
                                    name="year" 
                                    value={formData.year} 
                                    onChange={handleChange} 
                                    options={YEARS} 
                                    placeholder="Select Year" 
                                />
                            </div>
                        </section>

                        {/* 2. ITEM CONFIGURATION */}
                        <section className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-800/60 shadow-xl">
                            <SectionHeader number="2" title="Configuration" icon={Package} />
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-cyan-600 uppercase tracking-wider ml-1">Select Size</label>
                                    <span className="text-xs text-slate-500">Unsure? Size up for relaxed fit.</span>
                                </div>
                                
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                    {SIZES.map((size) => (
                                        <label key={size} className="cursor-pointer relative group">
                                            <input
                                                type="radio"
                                                name="size"
                                                value={size}
                                                checked={formData.size === size}
                                                onChange={handleChange}
                                                className="hidden peer"
                                            />
                                            <div className="h-14 flex items-center justify-center rounded border border-slate-700 bg-slate-800/50 text-slate-400 font-medium 
                                                          hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-400 transition-all duration-200
                                                          peer-checked:bg-cyan-600 peer-checked:border-cyan-500 peer-checked:text-white peer-checked:font-bold peer-checked:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                                                {size}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {formData.size && (
                                    <div className="text-center text-sm text-cyan-400 font-medium animate-pulse mt-2">
                                        Selected: {SIZE_MAPPING[formData.size]}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* 3. PAYMENT */}
                        <section className="bg-slate-900/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-800/60 shadow-xl">
                            <SectionHeader number="3" title="Payment Method" icon={CreditCard} />
                            
                            <div className="space-y-3">
                                <label className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                                    formData.paymentMethod === 'Cash On Delivery' 
                                    ? 'border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/30' 
                                    : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50'
                                }`}>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod"
                                        value="Cash On Delivery" // FIXED: Was "Cash on delivery", must match Form exactly
                                        checked={formData.paymentMethod === 'Cash On Delivery'}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 text-cyan-500 accent-cyan-500" 
                                    />
                                    <div>
                                        <div className="font-bold text-cyan-100 text-sm">Cash on Delivery</div>
                                        <div className="text-xs text-cyan-200/60 mt-1">Pay 50 DH advance now, rest on pickup at CIT HQ.</div>
                                    </div>
                                </label>
                                
                                <label className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                                    formData.paymentMethod === 'Wire transfer' 
                                    ? 'border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/30' 
                                    : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50'
                                }`}>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod"
                                        value="Wire transfer"
                                        checked={formData.paymentMethod === 'Wire transfer'}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 text-cyan-500 accent-cyan-500" 
                                    />
                                    <div className="flex-1">
                                        <div className="font-bold text-cyan-100 text-sm">Wire Transfer</div>
                                        <div className="text-xs text-cyan-200/60 mt-1">Transfer 50 DH advance, pay rest on pickup.</div>
                                        {formData.paymentMethod === 'Wire transfer' && (
                                            <div className="mt-3 p-3 bg-slate-950/50 rounded border border-cyan-500/20">
                                                <div className="text-xs text-slate-400 mb-1.5">Transfer to:</div>
                                                <div className="font-mono text-cyan-300 text-sm font-bold tracking-wider">
                                                    230 107 1111204002703683 47
                                                </div>
                                                <div className="text-[10px] text-slate-500 mt-1"> Bank Of Africa</div>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>

                            {/* Advance Payment Confirmation */}
                            <div className="mt-6 pt-6 border-t border-slate-800">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="agreedToAdvance"
                                        checked={formData.agreedToAdvance}
                                        onChange={(e) => setFormData({...formData, agreedToAdvance: e.target.checked})}
                                        className="mt-1 w-5 h-5 text-cyan-500 accent-cyan-500 rounded border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 bg-slate-800"
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm text-cyan-100 font-medium group-hover:text-cyan-300 transition-colors">
                                            I agree to pay a 50 DH advance to confirm my order
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                                            The remaining 150 DH will be paid when collecting the hoodie at the CIT stand on campus.
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </section>

                        {/* RATING */}
                         <div className="bg-transparent p-4 flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-slate-500 uppercase">Hype Level:</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setFormData({...formData, rating: String(star)})}>
                                        <Star size={20} 
                                            className={`transition-all ${Number(formData.rating) >= star ? "fill-cyan-500 text-cyan-500" : "text-slate-700"}`} 
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN - SUMMARY */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28">
                            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
                                {/* Product Preview */}
                                <div className="p-6 bg-slate-950/50 border-b border-slate-800 flex gap-4 items-center">
                                    <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 border border-slate-700">
                                        <Package size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">CIT HOODIE V2026</h3>
                                        <p className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> IN STOCK
                                        </p>
                                    </div>
                                </div>

                                {/* Totals */}
                                <div className="p-6 space-y-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-slate-400">
                                            <span>Subtotal</span>
                                            <span>250.00 DH</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>Shipping</span>
                                            <span className="text-cyan-400">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-emerald-400/80">
                                            <span>Student Discount</span>
                                            <span>-20%</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-slate-200 font-bold">Total</span>
                                            <span className="text-2xl font-bold text-cyan-400 font-mono">200.00 DH</span>
                                        </div>
                                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-3">
                                            <div className="flex items-start gap-2">
                                                <Info size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                                                <div className="text-xs text-amber-200/90">
                                                    <span className="font-bold">Advance: 50 DH</span> · Balance on pickup: 150 DH
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>Processing...</>
                                        ) : (
                                            <>PLACE ORDER <ChevronRight size={18} className="stroke-[3px]" /></>
                                        )}
                                    </button>
                                    
                                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 mt-4">
                                        <ShieldCheck size={12} />
                                        <span>Secure SSL Encryption</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>

                {/* Error Toast */}
                {error && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-900/90 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 backdrop-blur-md z-50 animate-bounce">
                        <AlertCircle size={18} />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}