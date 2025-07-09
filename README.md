Movie Explorer

A responsive React web app that lets users search for movies using the OMDb API, view posters and details, and build a personal watchlist — complete with drag-and-drop reordering and dark mode.

My Approach

1) Planning
The idea was to build a lightweight, aesthetic, and responsive React web application to demonstrate key front-end skills like:
- Component-based design
- State management with `useState` and `useEffect`
- Working with APIs (OMDb)
- UI/UX polish using TailwindCSS
- User interactions like drag-and-drop, watchlist persistence

2) Development Steps
1. Component Structure: Broke the app into modular components (`SearchBar`, `MovieCard`, `MovieList`, `Watchlist`) for reusability.
2. Styling: Used TailwindCSS for consistent, responsive styling and added dark mode using the `class` strategy.
3. Search Optimization: Added a custom `useDebounce` hook to prevent excessive API calls.
4. Watchlist Handling: Implemented localStorage to persist user data.
5. Drag-and-Drop: Used `@hello-pangea/dnd` to allow easy reordering of the watchlist.
6. Polish & Aesthetics: Improved spacing, responsive grid layout, hover effects, and iconography using `react-icons`.

3)Tech Stack
- React 19 (Create React App)
- TailwindCSS 3.4
- OMDb API
- @hello-pangea/dnd (Drag and Drop)
- react-icons


