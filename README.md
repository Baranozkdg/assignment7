# Assignment 7 — React Shop

Baran Ozakdag — 230408039

A small online shop built with React, using react-router for navigation, Context API for authentication, and Zustand for cart management.

## How to Run

```
npm install
npm run dev
```

Demo login credentials:
- Username: `230408039@st.biruni.edu.tr`
- Password: `demo123456`

## Reasoning Questions

### 1. State choices

- **Signed-in user:** Lives in React Context (AuthContext) because it is read by many components (NavBar, ProtectedRoute) but changes rarely, only on login/logout.
- **Cart:** Managed in a Zustand store because it changes frequently (add/remove items, quantity updates) and many components need to read parts of it. Zustand lets components subscribe to only the slice they need so they dont re-render unnecessarily.
- **Filter values (search text, category):** Stored in the URL query string via useSearchParams. This way users can share or bookmark a filtered view and refreshing the page keeps the same filters.
- **Product list:** Fetched from the API and held in the useFetch hook's local state (useReducer). It is only needed while the ProductList component is mounted, so it doesn't need global state.
- **Theme:** Stored in localStorage through the useLocalStorage hook so it survives page reloads. It is passed down as a prop from App since only the Layout and NavBar need it.

### 2. Context versus store

The signed-in user is in Context because it barely changes — only two actions (login and logout) happen during a session. Context re-renders every consumer when the value changes, but since auth changes are rare this is fine. The cart is in Zustand because users add/remove items often, and with Context every consumer would re-render on each cart update even if they only need the item count. Zustand selectors prevent that. If we swapped them: putting the cart in Context would cause the NavBar and any other consumer to re-render every time any cart field changes. Putting auth in Zustand would work technically but it would be overkill for state that changes twice per session.

### 3. Custom hooks

useFetch shares the loading-error-data pattern, the AbortController cleanup, and the useReducer state machine between ProductList and ProductDetail. Both pages go through the same cycle: start loading, either succeed or fail, and clean up on unmount or when inputs change. What it does NOT share is the actual data — each component gets its own independent state from its own call to useFetch. Two components using the same hook do not share state, they share logic.

### 4. Route parameters

The id from useParams is a string, not a number. This matters in two places: when passing it to the API URL (string concatenation works fine, so no issue there) and if you ever compare it with a product's numeric id from the API response (you would need to convert with Number(id) or use == instead of ===). In my code, since I just pass it into the fetch URL as a path segment, the string type works directly without conversion.

### 5. Protected routes

ProtectedRoute only checks a piece of React state on the client. A user could open the browser devtools and change that state, or simply call the API endpoints directly without going through the UI at all. Client-side protection is a UX feature, not real security. To make it secure you would need server-side authentication — the backend should verify a session token or JWT on every request and reject unauthorized access regardless of what the client says.

### 6. Deep links

If you deploy on a plain static file server and a user reloads `/products/3`, the server looks for a file at that path, doesn't find one, and returns a 404 error. This is because client-side routing only works when the `index.html` is served first and then React Router reads the URL in the browser. The Vite dev server is configured to fall back to `index.html` for any route that doesnt match a real file, so it works during development. In production you would need to configure the server (like nginx or Netlify's _redirects) to serve index.html for all routes.
