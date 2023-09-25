import { Link } from "react-router-dom";

interface Props {
  id: string;
}

export const OrderItem = ({ id }: Props) => {
  return (
    <li>
      <Link to={`orders/${id}`}>{`Order ${id}`}</Link>
    </li>
  );
};
