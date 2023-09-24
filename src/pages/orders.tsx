import useAxios from "axios-hooks";
import { Link } from "react-router-dom";
import { Api, Order } from "../api";

export const Orders = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="text-2xl font-semibold text-center">Orders</div>
      <OrderList />
      <div className="flex justify-center w-full">
        <Link to="/create-order" className="btn btn-accent btn-wide">
          Add new order
        </Link>
      </div>
    </div>
  );
};

const OrderList = () => {
  const { getAllOrders } = Api;
  const [{ data }] = useAxios<Order[]>(getAllOrders);

  return (
    <ul className="rounded-lg menu bg-base-200">
      {data?.map((order) => (
        <OrderItem id={order.id} key={order.id} />
      ))}
    </ul>
  );
};

interface OrderItemProps {
  id: string;
}

const OrderItem = ({ id }: OrderItemProps) => {
  return (
    <li>
      <Link to={`orders/${id}`}>{`Order ${id}`}</Link>
    </li>
  );
};
