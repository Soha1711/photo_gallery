import React from 'react';

/**
 * LoadingSpinner component displayed while photos are being fetched from Picsum API.
 * Uses inline SVG with Tailwind CSS animations.
 */
export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="relative w-16 h-16">
        {/* Subtle backdrop circle */}
        <div className="w-16 h-16 rounded-full border-4 border-rose-100 animate-pulse"></div>
        {/* Spinning indicator */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-5 text-base font-medium text-slate-700 animate-pulse">
        Loading 30 photos from Picsum API...
      </p>
      <span className="sr-only">Loading photos, please wait...</span>
    </div>
  );
}
