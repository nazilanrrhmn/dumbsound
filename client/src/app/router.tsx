import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../components/layouts/app-layout";
import Home from "./routes/user/home";

export default function RouterApp() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
