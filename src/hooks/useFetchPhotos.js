import { useState, useEffect } from 'react';

const API_ENDPOINT = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom React Hook to fetch photos from Picsum API.
 * Encapsulates data fetching, loading indicator state, and error handling.
 *
 * @returns {{ photos: Array, loading: boolean, error: string|null }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController to cleanly cancel the fetch if component unmounts
    const abortController = new AbortController();

    async function loadPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_ENDPOINT, {
          signal: abortController.signal,
        });

        // Handle unsuccessful HTTP response statuses (e.g. 404, 500)
        if (!response.ok) {
          throw new Error(`Failed to fetch photos: HTTP status ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Do not update state if the request was aborted due to unmounting
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'An error occurred while loading photos. Please try again.');
      } finally {
        // Ensure loading is set to false only if the component remains mounted
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPhotos();

    // Cleanup: cancel pending request if component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  return { photos, loading, error };
}
