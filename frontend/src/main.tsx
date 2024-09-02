// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import QueryClientProvider from "./providers/query.provider";
import store from "./store";
import { Provider as ReduxProvider } from "react-redux";
import AuthProvider from "./providers/auth.provider";

import "./index.css";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <QueryClientProvider>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ReduxProvider>
  // </StrictMode>
);
