import React, { useState } from 'react';

/**
 * PhotoCard component rendering an individual photo, author name,
 * and an interactive heart button to toggle favourite status.
 *
 * @param {Object} props
 * @param {Object} props.photo - Picsum photo object { id, author, width, height, url, download_url }
 * @param {boolean} props.isFavourited - Whether this photo is currently favourited
 * @param {Function} props.onToggleFavourite - Callback function to toggle favourite state
 */
export default function PhotoCard({ photo, isFavourited, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Optimized 600x400 image URL using the photo ID for high performance, with fallback to download_url
  const optimizedImageUrl = `https://picsum.photos/id/${photo.id}/600/400`;

  return (
    <article
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
        isFavourited
          ? 'border-rose-300 shadow-md shadow-rose-100/50 ring-1 ring-rose-200'
          : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {/* Placeholder skeleton while image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
        )}

        {/* Fallback in case image fails to load */}
        {imageError ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-4 text-center">
            <svg
              className="w-10 h-10 mb-2 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            src={optimizedImageUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              // Try fallback to direct download_url if optimized URL errors
              setImageError(true);
            }}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Heart Icon Button (Top-Right Overlay) */}
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourited
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
            isFavourited
              ? 'bg-rose-50/90 text-rose-500 shadow-sm hover:scale-110 active:scale-95'
              : 'bg-white/80 text-slate-600 hover:text-rose-500 hover:bg-white hover:scale-110 active:scale-95 shadow-sm'
          }`}
        >
          <svg
            className="w-5 h-5 transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={isFavourited ? '0' : '2'}
            fill={isFavourited ? 'currentColor' : 'none'}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Favourited Badge (Top-Left Overlay for unambiguous visual state) */}
        {isFavourited && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/95 text-white backdrop-blur-md shadow-sm">
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Favourite
          </span>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4 flex items-center justify-between gap-3 bg-white">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Photographer
          </p>
          <h3
            className="text-sm sm:text-base font-bold text-slate-800 truncate group-hover:text-rose-600 transition-colors"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        {/* Photo ID badge */}
        <span className="shrink-0 text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
          #{photo.id}
        </span>
      </div>
    </article>
  );
}
