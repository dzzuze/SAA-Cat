import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App";
import { AuthProvider } from "./auth/AuthProvider";
import ToastProvider from "./lib/toast/ToastProvider";
import { ThemeProvider } from "./providers/ThemeProvider";  

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
