import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { api, Order } from "../api";

export const OrderOverview = () => {
  const { orderId } = useParams();
  const { getOrderById } = api;
  const [{ data, loading }] = useAxios<Order>(getOrderById(orderId));

  if (loading) return <p>Loading...</p>;
  if (!data) throw new Error("No data!");

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="text-2xl font-semibold text-center">Order #{data.id}</div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="text-lg">Toppings</th>
              </tr>
            </thead>
            <tbody>
              {data.pizzaToppings.map((topping, index) => (
                <tr key={index} className="hover">
                  <td>{topping}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table">
            <thead>
              <tr>
                <th className="text-lg">Additional information</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <td>Size</td>
                <td className="font-semibold">{data.pizzaSize}</td>
              </tr>
              <tr className="hover">
                <td>Total</td>
                <td className="font-semibold">€ {data.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
