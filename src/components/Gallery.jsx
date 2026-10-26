import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  initFavourites,
  FAVOURITES_ACTIONS,
  STORAGE_KEY,
} from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';

/**
 * Gallery component: Integrates the useFetchPhotos custom hook,
 * manages search state using useCallback and useMemo,
 * and manages favourite photos state using useReducer and localStorage.
 */
export default function Gallery() {
  // Requirement 2 & 6: Fetch photos using the custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Controlled search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement 5: Manage favourites using useReducer with lazy initialization
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  // Requirement 5: Persist favourites to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to save favourites to localStorage:', err);
    }
  }, [favourites]);

  // Requirement 7: useCallback for the search filter handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handler to clear search
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Handler to toggle favourite via useReducer dispatch
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
      payload: photoId,
    });
  }, []);

  // Requirement 7: useMemo to compute filtered photos list in real-time
  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) {
      return photos;
    }
    const normalizedQuery = searchTerm.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery)
    );
  }, [photos, searchTerm]);

  return (
    <div className="w-full">
      {/* Top Search Controls */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClear={handleClearSearch}
      />

      {/* Stats / Status Bar */}
      {!loading && !error && photos.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1 text-sm text-slate-500">
          <p>
            Showing <span className="font-semibold text-slate-800">{filteredPhotos.length}</span> of{' '}
            <span className="font-semibold text-slate-800">{photos.length}</span> photos
            {searchTerm.trim() && (
              <span>
                {' '}
                for &ldquo;<span className="text-rose-600 font-medium">{searchTerm}</span>&rdquo;
              </span>
            )}
          </p>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
              <svg className="w-3.5 h-3.5 fill-rose-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{favourites.length} Favourited</span>
            </span>
          </div>
        </div>
      )}

      {/* Requirement 2: Loading State */}
      {loading && <LoadingSpinner />}

      {/* Requirement 2: Error State */}
      {error && !loading && (
        <div
          role="alert"
          className="max-w-xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-center"
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-red-900 mb-2">Failed to Load Photos</h3>
          <p className="text-sm text-red-700 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Retry Loading
          </button>
        </div>
      )}

      {/* Requirement 4: Empty State when no photos match the search */}
      {!loading && !error && filteredPhotos.length === 0 && (
        <div className="max-w-md mx-auto my-12 p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No Photos Found</h3>
          <p className="text-sm text-slate-500 mb-5">
            No photographer matching &ldquo;{searchTerm}&rdquo; was found in the 30 fetched photos.
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      )}

      {/* Requirement 3: Responsive Photo Grid: Mobile 1 col, Tablet 2 cols, Desktop 4 cols */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div
          id="photo-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourited={favourites.includes(String(photo.id))}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
