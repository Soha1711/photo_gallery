/**
 * Action types for the favourites reducer
 */
export const FAVOURITES_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
  CLEAR_FAVOURITES: 'CLEAR_FAVOURITES',
};

/**
 * LocalStorage key for persisting favourite photo IDs
 */
export const STORAGE_KEY = 'celebrare_favourite_photos';

/**
 * Lazy initializer function for useReducer.
 * Safely reads and parses saved favourite photo IDs from localStorage.
 * If data is missing or corrupted, gracefully falls back to the initial value ([]).
 *
 * @param {Array} initialValue - Default initial state
 * @returns {Array} Array of favourited photo IDs
 */
export function initFavourites(initialValue = []) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return initialValue;
  }
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      return initialValue;
    }
    const parsedData = JSON.parse(storedData);
    if (Array.isArray(parsedData)) {
      return parsedData;
    }
  } catch (err) {
    console.error('Failed to parse favourites from localStorage:', err);
  }
  return initialValue;
}

/**
 * Reducer function managing favourite photo IDs.
 * Performs immutable state updates.
 *
 * @param {Array<string>} state - Array of favourited photo IDs
 * @param {Object} action - Action with type and payload
 * @returns {Array<string>} Next state
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const photoId = String(action.payload);
      const isAlreadyFavourited = state.includes(photoId);

      // If already in favourites, remove it immutably; otherwise append it
      if (isAlreadyFavourited) {
        return state.filter((id) => id !== photoId);
      } else {
        return [...state, photoId];
      }
    }

    case FAVOURITES_ACTIONS.CLEAR_FAVOURITES: {
      return [];
    }

    default:
      return state;
  }
}
