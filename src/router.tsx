import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { CreateOrder } from "./pages/create-order";
import { Error } from "./pages/error";
import { OrderOverview } from "./pages/order-overview";
import { Orders } from "./pages/orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
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
