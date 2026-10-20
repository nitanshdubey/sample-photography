// src/main.tsx
// ---------------------------------------------------------------
// MAISON AUBADE: application entry point.
// Mounts the React app into the <div id="root"> in index.html
// and loads the global styles.
// ---------------------------------------------------------------

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Root element not found. Make sure index.html contains <div id="root"></div>.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);