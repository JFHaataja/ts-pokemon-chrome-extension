import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Supports weights 400-700
//@ts-expect-error ts can't find font but it still works
import "@fontsource-variable/pixelify-sans";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <StrictMode>
      <App />
    </StrictMode>
  </ErrorBoundary>,
);
