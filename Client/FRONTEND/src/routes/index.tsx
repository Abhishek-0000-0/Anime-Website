// src/routes/index.tsx
import type { RouteObject } from "react-router-dom";
import Login from "../pages/Auth/login";
import Signup from "../pages/Auth/signup";
import Home from "../pages/home";
const routes: RouteObject[] = [
  {

    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];

export default routes;
