import { Link } from "react-router-dom";
import { OrderList } from "../components/order-list";

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
