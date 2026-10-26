# 5-Minute Screen Recording Walkthrough Script

> **Assignment**: Celebrare — Frontend React Internship Pre-Screening  
> **Speaker Role**: 3rd-year B.Tech Computer Science Student  
> **Target Duration**: Exactly 5:00 minutes (1 minute per section)  
> **Free Recording Tools**:
> - **Windows**: Press `Win + G` (Xbox Game Bar) or use OBS Studio.
> - **Mac**: Open QuickTime Player -> File -> New Screen Recording.
> - **Upload**: Google Drive or YouTube (set visibility to Unlisted).

---

## Quick Preparation Checklist Before Recording
1. Open your terminal in the `photo_gallery` directory and run `npm run dev`.
2. Open your browser to `http://localhost:5173/`.
3. Open your code editor (VS Code) with the project open, specifically these files in tabs:
   - `src/hooks/useFetchPhotos.js`
   - `src/reducers/favouritesReducer.js`
   - `src/components/Gallery.jsx`
4. Clear your browser's localStorage or start with a fresh tab so you can demonstrate the fresh load.

---

## ⏱️ Section 1: Demonstrate the Application (0:00 – 1:00)

**[What to show on screen]**:
- Start with the browser window showing `http://localhost:5173/`.
- Press refresh to quickly show the loading spinner.
- Scroll down to show the 4-column responsive grid with author names and photo cards.
- Type `"Alejandro"` into the search bar to show real-time filtering (5 photos).
- Clear the search to show all 30 photos again.
- Click the heart icon on photo `#0` to favourite it (highlighting the red heart, the "Favourite" badge, and the counter at the top).
- Press browser refresh (`F5`) to demonstrate that photo `#0` remains favourited from `localStorage`.

**[What to say - Spoken Script]**:
> "Hello everyone! My name is Soham, and today I am presenting my submission for the Celebrare Frontend React Internship Pre-Screening Assignment.
>
> Here is the running Photo Gallery web app built with React, Vite, and Tailwind CSS.
>
> When the page loads, we fetch 30 photos from the Picsum API. You can see a clean loading spinner while fetching, and then all 30 photos render in a responsive grid. On desktop, it displays in 4 columns, which adapts cleanly to 2 columns on tablet and 1 column on mobile.
>
> At the top, we have our real-time search bar. When I type an author's name, like 'Alejandro', the gallery filters instantly without any page reload or extra API calls. Notice the counter updates to 'Showing 5 of 30 photos'. If I search for a name that doesn't exist, we display a clear empty state with a 'Clear Search' button.
>
> Each photo card has an author name and an interactive heart icon. When I click the heart button on photo zero, it turns red, displays a 'Favourite' badge, and increments our favourited counter. Even if I refresh the page right now, notice that photo zero remains favourited because the state is persisted in localStorage."

---

## ⏱️ Section 2: Explain `useFetchPhotos` Custom Hook (1:00 – 2:00)

**[What to show on screen]**:
- Switch to VS Code and show `src/hooks/useFetchPhotos.js`.
- Highlight lines 12–15 (`photos`, `loading`, `error` states).
- Highlight lines 18–48 (the `useEffect` with `AbortController` and `fetch`).
- Highlight lines 28–30 (`if (!response.ok)` check).
- Highlight line 54 (`return { photos, loading, error };`).

**[What to say - Spoken Script]**:
> "Now let's look at the code. Following Requirement 6, I created a custom React hook named `useFetchPhotos`.
>
> We use a custom hook here to cleanly separate data-fetching logic from the UI. Instead of writing fetch calls inside the Gallery component, the Gallery simply calls `useFetchPhotos()` and receives three values: `photos`, `loading`, and `error`.
>
> Inside this hook, we maintain three states using `useState`: `photos` initialized to an empty array, `loading` initialized to `true`, and `error` initialized to `null`.
>
> Inside `useEffect`, we make an asynchronous request to the Picsum endpoint.
> Importantly, we handle API failures in two ways:
> First, if the server returns an HTTP error status like a 404 or 500, native `fetch` does not automatically throw an error. So we explicitly check `if (!response.ok)` and throw an Error with the status code.
> Second, if there is a network disconnection, our `catch` block captures it and sets a friendly error message, which the UI renders as an alert box with a retry button.
>
> We also instantiate an `AbortController`. If the component unmounts while the request is still pending, the cleanup function aborts the request, preventing memory leaks and stale state updates on an unmounted component."

---

## ⏱️ Section 3: Explain `useReducer` and `localStorage` (2:00 – 3:00)

**[What to show on screen]**:
- Open `src/reducers/favouritesReducer.js`.
- Highlight `initFavourites` function (lines 22–37).
- Highlight `favouritesReducer` switch statement (lines 47–65).
- Switch briefly to `src/components/Gallery.jsx` to show lines 24–34 (`useReducer` and `useEffect` saving to `localStorage`).

**[What to say - Spoken Script]**:
> "Next, let's examine Requirement 5: managing favourite photos using `useReducer`.
>
> The assignment strictly specified not to use `useState` here. Why is `useReducer` preferred? Because toggling a favourite is a state transition that involves validation, checking for duplicates, and immutable array manipulations. A reducer centralizes this business logic in a single pure function outside our UI components.
>
> In `favouritesReducer.js`, we define the `TOGGLE_FAVOURITE` action. When the heart button is clicked, we pass the photo ID as the payload. If the ID is already present in our state array, we remove it immutably using `filter`. If it is not present, we append it using the spread operator `[...state, photoId]`.
>
> To persist favourites across browser refreshes, we use a lazy initialization function called `initFavourites`. We pass this as the third argument to `useReducer`. It safely reads and parses `localStorage` using a `try...catch` block. If the storage is empty or contains malformed JSON, it safely falls back to an empty array without crashing the app.
>
> Finally, in `Gallery.jsx`, an effect hook listens to changes in the `favourites` array and serializes the updated list back to `localStorage` automatically."

---

## ⏱️ Section 4: Explain `useCallback` and `useMemo` (3:00 – 4:00)

**[What to show on screen]**:
- Keep `src/components/Gallery.jsx` open.
- Highlight line 37: `const handleSearchChange = useCallback((e) => { ... }, []);`
- Highlight lines 52–60: `const filteredPhotos = useMemo(() => { ... }, [photos, searchTerm]);`

**[What to say - Spoken Script]**:
> "Now let's move to Requirement 7: optimizing performance using `useCallback` and `useMemo`.
>
> First, `useCallback`: In `Gallery.jsx`, we wrap our search input handler, `handleSearchChange`, inside `useCallback` with an empty dependency array.
> What problem does this solve? In React, every time a component re-renders, ordinary functions get re-created with new memory references. By wrapping `handleSearchChange` in `useCallback`, React memoizes this function reference. This ensures that child components, like our `SearchBar`, do not re-render unnecessarily when unrelated state changes occur.
>
> Second, `useMemo`: We use `useMemo` to compute the `filteredPhotos` array.
> Its dependency array contains `[photos, searchTerm]`.
> When the user types in the search box, `useMemo` filters the already-fetched photos by author name in a case-insensitive manner.
> What problem does this solve? Imagine a user toggles the favourite button on one of the photos. That updates the `favourites` state and causes `Gallery` to re-render. Without `useMemo`, React would re-run the filtering algorithm over all 30 photos on every single heart click! With `useMemo`, React remembers the filtered list and only recalculates it when `photos` or `searchTerm` actually changes."

---

## ⏱️ Section 5: Implementation Challenge & Conclusion (4:00 – 5:00)

**[What to show on screen]**:
- Show `src/reducers/favouritesReducer.js` (focus on `initFavourites`) and then show the working browser gallery one final time.

**[What to say - Spoken Script]**:
> "To conclude, I'd like to share one genuine challenge I encountered during implementation:
>
> The challenge was handling `localStorage` synchronization safely with `useReducer` across different browser states and environments.
> If you read `localStorage` directly in a component body or inside the reducer, it can cause hydration issues, unnecessary disk reads on every render, or even throw exceptions if the stored string is corrupt or invalid JSON.
>
> To solve this, I researched React's third argument for `useReducer`, known as the **lazy initializer**. By moving the `localStorage.getItem` and `JSON.parse` call into the `initFavourites` function, React only executes that code once during the initial mount. Furthermore, wrapping it in a `try...catch` block with array validation ensures that even if a user has corrupted storage data, the app recovers gracefully to an empty array without breaking.
>
> In summary, all seven assignment requirements have been fully satisfied:
> 1. React + Vite + Tailwind setup without UI libraries.
> 2. Fetching 30 photos with loading and error states.
> 3. Responsive 4-column grid.
> 4. Real-time author search.
> 5. useReducer for persistent favourites.
> 6. useFetchPhotos custom hook.
> 7. Proper use of useCallback and useMemo.
>
> Thank you so much for your time and for reviewing my assignment! I look forward to your feedback."

---

## 💡 Practical Tips for Your Video Recording
- **Stay Relaxed**: Speak at a steady, conversational pace.
- **Microphone**: Keep the microphone a few inches away to avoid breathing noises.
- **Screen Resolution**: Standard 1080p (1920x1080) works best. Zoom in on VS Code text (`Ctrl + +`) so code is easily legible on video.
- **Timer**: Keep your phone stopwatch next to your keyboard so you can pace yourself comfortably for each 1-minute segment.
- **Link Setting**: If uploading to YouTube, choose **Unlisted** (anyone with the link can view; no login required). If using Google Drive, make sure link sharing is set to **"Anyone with the link can view"**.
