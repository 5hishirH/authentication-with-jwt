import { createBrowserRouter } from "react-router-dom";

// routes import
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import MainLayout from "./layouts/main-layout";

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
    ],
  },
]);

export { router };
