import React from 'react';

export default function Button({ children, onClick, className = "", type = "button", disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        px-8 py-3 rounded-full font-bold text-lg tracking-wide transition-all duration-300
        bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500
        hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
        >
            {children}
        </button>
    );
}
