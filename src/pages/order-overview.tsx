import { useParams } from "react-router-dom";

export const OrderOverview = () => {
  const { orderId } = useParams();

  if (!orderId) throw new Error("No orderId");

  const toppings = ["Cheese", "Tomato", "Mushrooms", "Pepperoni"];

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="text-2xl font-semibold text-center">Order #{orderId}</div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="text-lg">Toppings</th>
              </tr>
            </thead>
            <tbody>
              {toppings.map((topping, index) => (
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
                <td className="font-semibold">Large</td>
              </tr>
              <tr className="hover">
                <td>Total</td>
                <td className="font-semibold">€ 12.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
