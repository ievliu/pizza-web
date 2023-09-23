import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { CreateOrder } from "./pages/create-order";
import { OrderOverview } from "./pages/order-overview";
import { Orders } from "./pages/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Orders />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderOverview />,
      },
      {
        path: "/create-order",
        element: <CreateOrder />,
      },
    ],
  },
]);
