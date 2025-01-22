import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../components/layouts/app-layout";
import Home from "./routes/user/home";
import Register from "./routes/auth/register";
import Login from "./routes/auth/login";
import AuthLayout from "../components/layouts/auth-layout";
import { useAppDispatch } from "../hooks/use-store";
import { useEffect } from "react";
import { getUserLogged } from "../stores/auth/async";
import AddArtist from "./routes/admin/add-artist";
import AddMusic from "./routes/admin/add-music";
import Music from "./routes/admin/music";
import AdminLayout from "../components/layouts/admin-layout";

export default function RouterApp() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserLogged());
  }, []);
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/add-artist",
          element: <AddArtist />,
        },
        {
          path: "/list-music",
          element: <Music />,
        },
        {
          path: "/add-music",
          element: <AddMusic />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
