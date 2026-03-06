import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#27272a",
          color: "#fff",
          borderRadius: "8px",
          border: "1px solid #3f3f46",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          iconTheme: {
            primary: "#fbbf24",
            secondary: "#fff",
          },
          style: {
            borderLeft: "4px solid #22c55e",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
          style: {
            borderLeft: "4px solid #ef4444",
          },
        },
        loading: {
          iconTheme: {
            primary: "#fbbf24",
            secondary: "#fff",
          },
          style: {
            borderLeft: "4px solid #fbbf24",
          },
        },
      }}
    />
  );
}
