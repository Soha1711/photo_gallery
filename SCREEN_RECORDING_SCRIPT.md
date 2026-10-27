# 5-Minute Video Recording Script

### **0:00 – 1:00 | Section 1: Demonstrate the Application**

*(Start on the running app at `http://localhost:5173/` or `http://localhost:4173/`)*

> "Hello everyone! Today I am presenting my Photo Gallery web application built with React, Vite, and Tailwind CSS.
>
> When the page loads, it fetches 30 photos from the Picsum API. While the request is in progress, a loading spinner is displayed. Once loaded, all photos render in a clean, responsive grid layout. On desktop, it displays in 4 columns, which adapts cleanly to 2 columns on tablet, and 1 column on mobile devices.
>
> At the top, we have a real-time search input. When I type an author's name, such as 'Alejandro', the gallery filters instantly without reloading the page and without making any additional API calls. If I search for an author that doesn't exist, a clear empty state is shown with an option to reset the search.
>
> Each photo card displays the image, the author's name, and a heart button. When I click the heart icon on a photo, it marks it as a favourite with a red heart and a badge, and the favourites counter increments. If I refresh the browser, notice that the favourite status persists because it is saved in browser localStorage."

---

### **1:00 – 2:00 | Section 2: Explain `useFetchPhotos`**

*(Switch to VS Code: Open `src/hooks/useFetchPhotos.js`)*

> "Now, looking at the code, Requirement 6 asks for a custom hook named `useFetchPhotos`.
>
> We create this custom hook to cleanly separate our data-fetching and network logic from the UI. The Gallery component does not fetch data directly; it simply calls `useFetchPhotos()` and receives three values: `photos`, `loading`, and `error`.
>
> Inside this hook, we manage state for the fetched photos array, a loading boolean initially set to true, and an error state initialized to null.
>
> Inside `useEffect`, we execute an asynchronous fetch to the Picsum endpoint.
> If the API request fails—for instance, if the server returns a 404 or 500 error—standard fetch does not throw an error automatically. So we explicitly check `if (!response.ok)` and throw an error. If there is a network failure, the `catch` block intercepts it and sets our `error` state, allowing the UI to render a helpful error message with a retry button.
>
> We also configure an `AbortController`. If the component unmounts while a request is in flight, the cleanup function aborts the request, preventing race conditions and avoiding state updates on an unmounted component."

---

### **2:00 – 3:00 | Section 3: Explain `useReducer` and `localStorage`**

*(Switch to VS Code: Open `src/reducers/favouritesReducer.js` and show `Gallery.jsx`)*

> "Next, for Requirement 5, we manage the favourites list using React's `useReducer` hook instead of `useState`.
>
> Why `useReducer`? Managing favourites involves complex state transitions: checking if an item is already present, adding it, or removing it. A reducer centralizes this business logic into a single, pure, predictable function with clearly defined action types.
>
> In `favouritesReducer.js`, we define the `TOGGLE_FAVOURITE` action. When the heart button is clicked, we pass the photo ID as the payload. If the ID is already in our state, we remove it immutably using array `filter`. If it is not present, we append it using the spread operator.
>
> To initialize the state, we pass `initFavourites` as a lazy initializer to `useReducer`. This function safely reads and parses `localStorage` using a `try-catch` block. If `localStorage` is empty or contains invalid JSON, it gracefully falls back to an empty array without crashing the app.
>
> Then, in `Gallery.jsx`, a `useEffect` hook monitors the `favourites` state and automatically synchronizes any changes back into `localStorage`."

---

### **3:00 – 4:00 | Section 4: Explain `useCallback` and `useMemo`**

*(Switch to VS Code: Open `src/components/Gallery.jsx`)*

> "In Requirement 7, we optimize performance using `useCallback` and `useMemo`.
>
> First, `useCallback` is used for our search handler, `handleSearchChange`.
> In React, functions declared inside a component are re-created on every render with a new reference in memory. Wrapping `handleSearchChange` in `useCallback` with an empty dependency array preserves the exact same function reference between renders. This prevents unnecessary re-renders of the child `SearchBar` component. If we removed `useCallback`, the handler would be re-created on every render cycle.
>
> Second, `useMemo` is used to compute `filteredPhotos`, with dependencies `[photos, searchTerm]`.
> It filters the 30 photos by author name in a case-insensitive manner.
> What problem does this solve? When a user clicks the heart icon to toggle a favourite, the `Gallery` component re-renders to update the heart icon. Without `useMemo`, React would re-run the filtering logic across all 30 photos on every single click. With `useMemo`, React caches the filtered list and only re-computes it when the original photos array or the search query actually changes."

---

### **4:00 – 5:00 | Section 5: Implementation Challenge & Conclusion**

*(Switch back to the browser showing the working Photo Gallery)*

> "One genuine challenge I faced was synchronizing `useReducer` with browser `localStorage` safely without causing hydration errors, race conditions, or crashes on corrupted data.
>
> Reading `localStorage` directly inside a component body or directly within the reducer can cause repeated disk reads on every render and risks throwing an exception if the stored string is malformed.
>
> I solved this by leveraging React's third argument in `useReducer`—the lazy initializer function `initFavourites`. This ensures `localStorage` is read and parsed only once when the component initially mounts. Wrapping it in a `try-catch` block with array validation guarantees that even if a user has corrupted storage data, the app recovers gracefully to an empty array without breaking.
>
> In conclusion, all seven requirements are fully implemented:
> 1. React, Vite, and Tailwind setup without UI libraries.
> 2. Fetching 30 photos with loading and error handling.
> 3. Responsive 4-column grid.
> 4. Real-time search filter.
> 5. useReducer for favourites with localStorage persistence.
> 6. useFetchPhotos custom hook.
> 7. Proper use of useCallback and useMemo.
>
> Thank you for watching!"
