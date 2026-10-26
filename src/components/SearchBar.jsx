import React from 'react';

/**
 * SearchBar component for filtering photos by author name in real-time.
 * Controlled component receiving searchTerm and onSearchChange.
 *
 * @param {Object} props
 * @param {string} props.searchTerm - Current search input value
 * @param {Function} props.onSearchChange - Event handler wrapped in useCallback
 * @param {Function} [props.onClear] - Optional handler to clear search query
 */
export default function SearchBar({ searchTerm, onSearchChange, onClear }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <label htmlFor="author-search" className="sr-only">
        Search photos by author name
      </label>
      <div className="relative">
        {/* Inline SVG Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {/* Controlled Input */}
        <input
          id="author-search"
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Filter photos by author name (e.g. Alejandro)..."
          className="w-full pl-11 pr-11 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-200"
        />

        {/* Clear Button (shown when user has typed something) */}
        {searchTerm && (
          <button
            type="button"
            onClick={onClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            title="Clear search input"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
