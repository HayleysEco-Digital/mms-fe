# Copilot Instructions for Meal Management System Client

## Project Overview
- This is a React + Vite frontend for a meal and room management system, using React Router for navigation and Bootstrap for UI.
- The app manages entities like Rooms, Meals, Employees, Companies, Departments, Divisions, Contractors, and Bookings.
- All API calls are centralized in `src/components/utils/ApiFunctions.js` and communicate with a backend via REST endpoints (see `api` config).

## Key Architectural Patterns
- **Component Structure:**
  - Major features are grouped by domain in `src/components/` (e.g., `room/`, `meals/`, `employee/`, `company/`, `department/`, `division/`, `contractor/`, `booking/`, `mealrequest/`).
  - Each domain typically has `Add`, `Edit`, and `Existing` components for CRUD operations.
  - Common UI and utility components are in `src/components/common/` and `src/components/utils/`.
- **Routing:**
  - All routes are defined in `src/App.jsx` using React Router. Admin and protected routes use `RequireAdmin` and `RequireAuth` wrappers.
- **State Management:**
  - Local state is managed with React hooks. Auth state is provided via `AuthProvider`.
- **API Integration:**
  - All data fetching and mutations use functions from `ApiFunctions.js`. Use these for any new API interactions.
  - API endpoints expect JWT tokens from `localStorage` for authentication.
  - File uploads (e.g., room photos) use `multipart/form-data` headers via `getHeader2()`.

## Developer Workflows
- **Install dependencies:**
  - `npm install`
- **Run development server:**
  - `npm run dev` (Vite dev server with HMR)
- **Build for production:**
  - `npm run build`
- **No built-in test scripts** are present; add tests as needed.
- **Debugging:**
  - Use browser dev tools and console logs. Most errors are surfaced via UI toasts or alerts.

## Project-Specific Conventions
- **API Functions:**
  - Always use the exported functions in `ApiFunctions.js` for backend communication. Do not call `fetch` or `axios` directly in components.
  - All CRUD operations for each entity are implemented as `addX`, `getXById`, `getAllX`, `updateX`, `deleteX`.
- **UI Patterns:**
  - Use Bootstrap classes for layout and styling.
  - Use `react-hot-toast` for notifications (see `Toaster` usage in list components).
  - Confirmation modals for destructive actions require typing `DELETE`.
- **Data Flow:**
  - Most forms use controlled components and local state. Data is refreshed after mutations by re-fetching lists.
- **Auth:**
  - User and token are stored in `localStorage`. Use `AuthProvider` and `RequireAuth` for protected routes.

## Integration Points
- **Backend:**
  - All API calls point to a base URL set in `ApiFunctions.js` (currently an ngrok endpoint).
  - Endpoints require JWT authentication.
- **3rd Party Libraries:**
  - Bootstrap, React Router, react-hot-toast, moment.js, XLSX (for report export), and others as needed.

## Examples
- To add a new entity, create `AddX.jsx`, `EditX.jsx`, and `ExistingX.jsx` in the relevant domain folder, and add routes in `App.jsx`.
- To fetch or mutate data, import and use the relevant function from `ApiFunctions.js`.
- For new API endpoints, add a function in `ApiFunctions.js` following the existing naming and header conventions.

---
For questions or unclear patterns, review `ApiFunctions.js`, `App.jsx`, and the relevant domain folder for examples.
