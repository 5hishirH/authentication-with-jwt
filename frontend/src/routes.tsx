import { createBrowserRouter } from "react-router-dom";

// authentication required
import AuthMiddleware from "./middlewares/auth.middleware";

// routes import
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import MainLayout from "./layouts/main-layout";
import SignIn from "./pages/sign-in";
import Private from "./pages/private";
import Canary from "./pages/canary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/private",
        element: (
          <AuthMiddleware>
            <Private />
          </AuthMiddleware>
        ),
      },
      {
        path: "/canary",
        element: (
          <AuthMiddleware>
            <Canary />,
          </AuthMiddleware>
        ),
      },
    ],
  },
]);

export { router };
