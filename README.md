# Photo Gallery Web App

> **Celebrare — Frontend React Internship Pre-Screening Assignment**  
> A responsive photo gallery web application built with **React**, **Vite**, and **Tailwind CSS**. It fetches photos from the public Picsum API, renders a responsive grid layout, allows real-time search by author name, and manages favourites persisted in browser `localStorage` using `useReducer`.

---

## 📸 Screenshots

*(Add screenshots of your running application here before submission)*

| Desktop View (4 Columns) | Tablet View (2 Columns) | Mobile View (1 Column) |
| :---: | :---: | :---: |
| *[Add Desktop Screenshot]* | *[Add Tablet Screenshot]* | *[Add Mobile Screenshot]* |

| Real-Time Search Filter | Favourites Persistence | Error & Loading States |
| :---: | :---: | :---: |
| *[Add Search Screenshot]* | *[Add Favourites Screenshot]* | *[Add State Screenshot]* |

---

## ✨ Features

1. **API Integration via Custom Hook (`useFetchPhotos`)**
   - Fetches 30 photos on initial load from `https://picsum.photos/v2/list?limit=30`.
   - Handles loading indicator and user-friendly error state with retry.
   - Cleans up network requests with `AbortController` to avoid race conditions or state updates on unmounted components.

2. **Responsive Photo Grid**
   - **Desktop (>= 1024px)**: 4 columns.
   - **Tablet (>= 768px)**: 2 columns.
   - **Mobile (< 768px)**: 1 column.
   - Responsive cards displaying the image, author name, photo ID, and an interactive heart toggle button.

3. **Real-Time Live Search (Optimized with `useCallback` & `useMemo`)**
   - Instant filtering as the user types in the search input.
   - Case-insensitive author name matching.
   - Client-side filtering without extra API roundtrips or page reload.
   - Dedicated empty state when no author matches the query.

4. **Favourites Management via `useReducer` + `localStorage`**
   - Strict use of `useReducer` (no `useState` for favourites state).
   - `TOGGLE_FAVOURITE` action performs clean, immutable array updates.
   - Lazy initializer reads saved favourites from `localStorage` on boot with safe JSON parsing.
   - `useEffect` synchronizes any state change back into `localStorage`.
   - Distinct visual states: filled red heart and badge for favourited photos.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Functional Components & Hooks)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v3 & PostCSS
- **State Management**: `useReducer`, `useState`, `useEffect`, `useCallback`, `useMemo`
- **Persistence**: Browser `localStorage` API
- **Data Fetching**: Native `fetch` API with `AbortController`
- **Linting**: Oxlint

> **Note**: In strict accordance with assignment requirements, **no external component libraries** (such as Material UI, Bootstrap, Ant Design) or icon libraries were used. All styling is pure Tailwind CSS and all icons are lightweight inline SVGs.

---

## 📁 Project Folder Structure

```text
photo_gallery/
├── public/                     # Static assets
├── src/
│   ├── components/             # Presentational and container components
│   │   ├── Gallery.jsx         # Main gallery container: hook integration, search, & grid
│   │   ├── LoadingSpinner.jsx  # Accessible animated spinner component
│   │   ├── PhotoCard.jsx       # Individual card: photo, author, & favourite button
│   │   └── SearchBar.jsx       # Controlled search bar with inline SVG icons
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook managing API fetch, loading, & error
│   ├── reducers/
│   │   └── favouritesReducer.js# Reducer function, actions, & localStorage initializer
│   ├── App.jsx                 # App root layout, header, subtitle, & footer
│   ├── index.css               # Tailwind CSS directives and custom typography
│   └── main.jsx                # Application entry point with React StrictMode
├── index.html                  # HTML entry point with Plus Jakarta Sans font
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration for Tailwind CSS
├── tailwind.config.js          # Tailwind CSS content configuration
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation

```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended; developed on Node v24)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository (or navigate into the project directory):
   ```bash
   git clone https://github.com/Soha1711/photo_gallery.git
   cd photo_gallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173/
```

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

Run code linting:
```bash
npm run lint
```

---

## 📡 API Endpoint Used

The application fetches photos from the official Picsum Photos API:
```text
https://picsum.photos/v2/list?limit=30
```

Each item returned is a JSON object with:
- `id`: Unique identifier string (e.g. `"0"`)
- `author`: Photographer's name (e.g. `"Alejandro Escamilla"`)
- `width` & `height`: Original photo dimensions
- `url`: Unsplash source page
- `download_url`: High-resolution image direct URL

---

## 🧠 Architectural Concepts Explained

### 1. Custom Hook — `useFetchPhotos`
- **Location**: `src/hooks/useFetchPhotos.js`
- **Purpose**: Separates network data fetching from UI presentation.
- **Return Value**: An object `{ photos, loading, error }`.
- **Implementation Highlights**:
  - Initializes `loading` as `true`, `photos` as `[]`, and `error` as `null`.
  - Employs `AbortController` within `useEffect`. If the component unmounts while a request is in flight, `controller.abort()` cancels the fetch safely.
  - Catches `AbortError` to prevent updating state after component unmount.
  - Checks `if (!response.ok)` to properly catch HTTP error codes (e.g., 404 or 500) that `fetch` does not automatically reject.

### 2. State Management with `useReducer` & `localStorage`
- **Location**: `src/reducers/favouritesReducer.js` & `src/components/Gallery.jsx`
- **Why `useReducer` instead of `useState`?**:
  - `useReducer` centralizes state transition rules into a single pure function.
  - Keeps logic predictable and decoupled from component rendering.
- **Actions**:
  - `TOGGLE_FAVOURITE`: Takes a `photoId`. If the ID exists in the array, it removes it immutably via `filter`. If not present, it appends it using array spreading `[...state, photoId]`.
  - `CLEAR_FAVOURITES`: Resets the array to `[]`.
- **Lazy Initialization (`initFavourites`)**:
  - Passed as the 3rd argument to `useReducer(favouritesReducer, [], initFavourites)`.
  - Runs once on mount, parsing existing favourite IDs from `localStorage` inside a safe `try...catch` block.
- **Persistence (`useEffect`)**:
  - Whenever the `favourites` state changes, a `useEffect` runs to save the serialized array to `localStorage` under `celebrare_favourite_photos`.

### 3. Performance Hooks — `useCallback` & `useMemo`
- **`useCallback` (Search Handler & Toggle Handler)**:
  - Memoizes the `handleSearchChange` function reference.
  - Prevents recreating a new function instance on every render, avoiding unnecessary re-renders of the child `<SearchBar />`.
- **`useMemo` (Filtered Photo Computation)**:
  - Memoizes the filtered photo list based on dependencies `[photos, searchTerm]`.
  - Filtering only runs when the search input value or the photos array changes.
  - When a user clicks the heart icon to favourite/unfavourite a card, `Gallery` re-renders to update the favourite status, but `useMemo` skips the search filtering calculation completely.

---

## 🧪 Testing Checklist

- [x] **Project Setup**: React + Vite + Tailwind CSS runs cleanly on Windows.
- [x] **API Fetch**: 30 photos load from `https://picsum.photos/v2/list?limit=30`.
- [x] **Loading Spinner**: Visual spinner appears while network request is pending.
- [x] **Error Handling**: Displays an alert banner if network fails or non-200 HTTP code is received.
- [x] **Responsive Grid**:
  - Desktop: 4 columns (`lg:grid-cols-4`).
  - Tablet: 2 columns (`md:grid-cols-2`).
  - Mobile: 1 column (`grid-cols-1`).
- [x] **Photo Card**: Displays photo, author name, and heart icon button.
- [x] **Search Filter**:
  - Real-time filtering by author name as user types.
  - Case-insensitive (e.g., `alejandro` matches `Alejandro Escamilla`).
  - No page reload and no additional API requests.
  - Empty state message displayed when no author matches.
- [x] **Favourites with `useReducer`**:
  - Heart click toggles favourite state.
  - Distinct visual state (filled red heart and badge).
  - Persisted in `localStorage` across page refresh.
  - Corrupted `localStorage` handled safely.
- [x] **Custom Hook**: `useFetchPhotos` encapsulates fetching and returns `{ photos, loading, error }`.
- [x] **Performance Hooks**: `useCallback` on search handler, `useMemo` on filtered photo list.
- [x] **Code Quality**: Production build passes (`npm run build`) and linter passes with 0 errors (`npm run lint`).

---

## 📄 License

This project was created as an assignment submission for Celebrare's Frontend React Internship pre-screening.
