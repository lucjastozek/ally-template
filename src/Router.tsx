import HomePage from "@/pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
