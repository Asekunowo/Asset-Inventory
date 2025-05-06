import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "./utils/auth.tsx";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Rooterror from "./components/error/rooterror.tsx";

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
