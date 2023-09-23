import { Link } from "react-router-dom";

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
  const test = [1, 2, 3];

  return (
    <ul className="rounded-lg menu bg-base-200">
      {test.map((item) => (
        <OrderItem id={item.toString()} key={item} name={`Order ${item}`} />
      ))}
    </ul>
  );
};

interface OrderItemProps {
  id: string;
  name: string;
}

const OrderItem = ({ name, id }: OrderItemProps) => {
  return (
    <li>
      <Link to={`orders/${id}`}>{name}</Link>
    </li>
  );
};
