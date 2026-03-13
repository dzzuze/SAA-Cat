import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App";
import { AuthProvider } from "../src/auth/AuthProvider";
import ToastProvider from "./lib/toast/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider />
      <App />
    </AuthProvider>
  </StrictMode>,
);
