import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);
