import useAxios from "axios-hooks";
import { api, Order } from "../api";
import { OrderItem } from "./order-item";

export const OrderList = () => {
  const { getAllOrders } = api;
  const [{ data }] = useAxios<Order[]>(getAllOrders);

  return (
    <ul className="rounded-lg menu bg-base-200">
      {!data?.length && <p className="text-center">No orders found 😔</p>}
      {data?.map((order) => (
        <OrderItem id={order.id} key={order.id} />
      ))}
    </ul>
  );
};
