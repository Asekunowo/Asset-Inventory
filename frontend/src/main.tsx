import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/auth/auth";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Rooterror from "./components/error/rooterror.tsx";
import App from "./App.tsx";
import "./index.css";
import { Buffer } from "buffer";

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

if (!window.Buffer) {
  window.Buffer = Buffer;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider defaultTheme="dark">
        <AuthProvider>
          <ErrorBoundary
            FallbackComponent={Rooterror}
            onReset={() => (location.href = "/")}
          >
            <App />
          </ErrorBoundary>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
