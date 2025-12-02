import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Navbar from '../components/Navbar';
import { Star, Truck, ShieldCheck } from 'lucide-react';

// PLACEHOLDER URL - User needs to replace this
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSddnVTbtmhTJDgkXdLMlTOjPrE-EL-9hmtzCBB-jBuN0YLF-g/viewform?usp=header";
// PLACEHOLDER FIELD NAMES - User needs to replace these with their actual entry IDs
const FORM_FIELDS = {
    EMAIL: "entry.1234567890",
    NAME: "entry.1234567891",
    YEAR: "entry.1234567892",
    MAJOR: "entry.1234567893",
    PHONE: "entry.1234567894",
    PAYMENT: "entry.1234567895",
    SIZE: "entry.1234567896",
    RATING: "entry.1234567897",
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
        size: '', // Default size
        rating: '0' // Default rating
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formBody = new FormData();
        formBody.append(FORM_FIELDS.EMAIL, formData.email);
        formBody.append(FORM_FIELDS.NAME, formData.name);
        formBody.append(FORM_FIELDS.YEAR, formData.year);
        formBody.append(FORM_FIELDS.MAJOR, formData.major);
        formBody.append(FORM_FIELDS.PHONE, formData.phone);
        formBody.append(FORM_FIELDS.PAYMENT, formData.payment);
        formBody.append(FORM_FIELDS.SIZE, formData.size);
        formBody.append(FORM_FIELDS.RATING, formData.rating);

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: formBody,
                mode: 'no-cors'
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Form submission error:", err);
            setError("Transmission failed. Please retry.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#050505] text-gray-400 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
                <div className="border border-gray-800 p-8 max-w-md w-full bg-black/90 relative z-10 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                    <div className="text-4xl mb-4 text-[#00f3ff] animate-pulse">✓</div>
                    <h2 className="text-2xl font-bold mb-4 text-white">ORDER_CONFIRMED</h2>
                    <p className="mb-8 text-gray-400/80">
                        Transmission received. Your special drop is being prepared.
                        <br /><br />
                        Check your comms (email) for tracking coordinates.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full border border-gray-700 py-3 hover:bg-gray-800 hover:text-white transition-colors font-bold tracking-widest text-sm"
                    >
                        RETURN HOME
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-gray-400 font-mono relative selection:bg-[#00f3ff] selection:text-black">
            <Navbar />

            <div className="pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-8 uppercase tracking-widest">
                    <span className="hover:text-gray-400 cursor-pointer" onClick={() => navigate('/')}>Home</span>
                    <span>/</span>
                    <span className="text-gray-400">Order</span>
                    <span>/</span>
                    <span className="text-[#00f3ff]">Hoodie</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left Column: Visuals */}
                    {/* Left Column: Visuals */}
                    <div className="h-[500px] lg:h-auto w-full relative bg-[#0a0a0a] border border-gray-800 rounded-sm overflow-hidden">
                        <img
                            src="/hoodie.JPG"
                            alt="CIT Hoodie"
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Badge */}
                        <div className="absolute top-4 left-4 bg-[#00f3ff] text-black text-xs font-bold px-2 py-1 uppercase tracking-wider z-10">
                            New
                        </div>
                    </div>

                    {/* Right Column: Details & Form */}
                    <div className="flex flex-col h-full">
                        <div className="mb-2">
                            <span className="text-[#00f3ff] text-xs font-bold tracking-widest uppercase">Oversized Fit Hoodie</span>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-2">CIT HOODIE</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1 text-[#00f3ff]">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-xs text-gray-500">289 reviews</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8 border-b border-gray-800 pb-8">
                            <span className="text-3xl font-bold text-white">180DH</span>
                            <span className="text-lg text-gray-600 line-through">250DH</span>
                            <span className="text-xs bg-red-900/20 text-red-400 px-2 py-1 rounded">-28%</span>
                        </div>

                        <div className="space-y-6 mb-8">
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Engineered for the digital nomad. High-density cotton blend with reinforced stitching.
                                Features hidden pockets for secure storage and a relaxed fit for maximum mobility.
                                Limited run.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Size Selector */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Hoodie Size *</label>
                                    <button type="button" className="text-xs text-gray-500 underline hover:text-[#00f3ff]">Size Chart</button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        'S',
                                        'M',
                                        'L',
                                        'XL',
                                        'XXL',
                                        'XXXL'
                                    ].map((size) => (
                                        <label key={size} className={`
                                            cursor-pointer border py-3 px-4 text-left transition-all relative overflow-hidden group rounded-sm flex items-center gap-3
                                            ${formData.size === size
                                                ? 'border-[#00f3ff] bg-[#00f3ff]/10 text-[#00f3ff]'
                                                : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}
                                        `}>
                                            <div className={`w-4 h-4 border flex items-center justify-center rounded-full ${formData.size === size ? 'border-[#00f3ff]' : 'border-gray-600'}`}>
                                                {formData.size === size && <div className="w-2 h-2 bg-[#00f3ff] rounded-full" />}
                                            </div>
                                            <input
                                                type="radio"
                                                name="size"
                                                value={size}
                                                checked={formData.size === size}
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                            <span className="text-sm font-bold">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Info Section */}
                            <div className="pt-6 border-t border-gray-800">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Truck size={16} /> Shipping Details
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-[#0a0a0a] border border-gray-800 p-3 text-sm text-white focus:border-[#00f3ff] outline-none transition-colors rounded-sm placeholder-gray-700"
                                            placeholder="Full Name *"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-[#0a0a0a] border border-gray-800 p-3 text-sm text-white focus:border-[#00f3ff] outline-none transition-colors rounded-sm placeholder-gray-700"
                                            placeholder="Email *"
                                        />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-[#0a0a0a] border border-gray-800 p-3 text-sm text-white focus:border-[#00f3ff] outline-none transition-colors rounded-sm placeholder-gray-700"
                                        placeholder="Phone Number *"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="bg-[#0a0a0a] border border-gray-800 p-3 text-sm text-gray-400 focus:border-[#00f3ff] outline-none transition-colors rounded-sm"
                                        >
                                            <option value="">Year of Studies</option>
                                            <option value="INE1">INE1</option>
                                            <option value="INE2">INE2</option>
                                            <option value="INE3">INE3</option>
                                            <option value="Master">Master</option>
                                            <option value="Lauréat">Lauréat</option>
                                        </select>
                                        <select
                                            name="major"
                                            value={formData.major}
                                            onChange={handleChange}
                                            className="bg-[#0a0a0a] border border-gray-800 p-3 text-sm text-gray-400 focus:border-[#00f3ff] outline-none transition-colors rounded-sm"
                                        >
                                            <option value="">Major/Specialty</option>
                                            <option value="ASEDS">ASEDS</option>
                                            <option value="ICCN">ICCN</option>
                                            <option value="AMOA">AMOA</option>
                                            <option value="DATA">DATA</option>
                                            <option value="SMART">SMART</option>
                                            <option value="SESNUM">SESNUM</option>
                                            <option value="CLOUD">CLOUD</option>
                                        </select>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="space-y-2 mt-2">
                                        <label className="text-xs uppercase tracking-widest text-gray-500">Preferred Payment Method *</label>
                                        <div className="flex gap-4">
                                            {['Cash on Delivery'].map((method) => (
                                                <label key={method} className="flex items-center gap-2 cursor-pointer group">
                                                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors rounded-full ${formData.payment === method ? 'border-[#00f3ff]' : 'border-gray-700'}`}>
                                                        {formData.payment === method && <div className="w-2 h-2 bg-[#00f3ff] rounded-full" />}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value={method}
                                                        checked={formData.payment === method}
                                                        onChange={handleChange}
                                                        className="hidden"
                                                    />
                                                    <span className={`text-sm ${formData.payment === method ? 'text-white' : 'text-gray-500'}`}>{method}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="space-y-3 mt-4">
                                        <label className="text-xs uppercase tracking-widest text-gray-500">Rating: How excited are you about getting your new hoodie? *</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    onClick={() => handleRatingChange(rating)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        size={24}
                                                        fill={Number(formData.rating) >= rating ? "#00f3ff" : "none"}
                                                        color={Number(formData.rating) >= rating ? "#00f3ff" : "#4b5563"}
                                                        className="transition-colors"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#00f3ff] text-black font-bold py-4 hover:bg-[#00c2cc] transition-colors tracking-widest uppercase text-sm rounded-sm shadow-[0_0_20px_rgba(0,243,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Processing...' : 'Buy Now'}
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex items-center gap-6 pt-6 border-t border-gray-800 text-gray-500 text-xs">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={16} />
                                    <span>Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck size={16} />
                                    <span>Free Shipping</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
