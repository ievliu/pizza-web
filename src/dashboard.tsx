import { useEffect, useState } from "react";
import { Pizza, fetchPizzas } from "./api";

export const Dashboard = () => {
  const [pizza, setPizza] = useState<Pizza>();

  useEffect(() => {
    (async () => {
      const pizzas = await fetchPizzas();
      console.log(pizzas);
    })();
  }, []);

  return (
    <div>
      Pizza
      {pizza?.Id}
      {pizza?.Name}
    </div>
  );
};
