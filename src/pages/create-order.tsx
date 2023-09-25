import useAxios from "axios-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order, PizzaSize, PizzaTopping, api } from "../api";
import { Checkbox } from "../components/forms/checkbox";
import { Radio } from "../components/forms/radio";

type FormError = "pizzaSize" | "pizzaToppings";

const SIZES: PizzaSize[] = ["Small", "Medium", "Large"];
const TOPPINGS: PizzaTopping[] = [
  "Cheese",
  "Pepperoni",
  "Sausage",
  "Bacon",
  "Pineapple",
  "Ham",
  "Chicken",
  "Beef",
  "Mushroom",
  "Onion",
];

export const CreateOrder = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState<number>();
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>();
  const [pizzaToppings, setPizzaToppings] = useState<PizzaTopping[]>([]);
  const [errors, setErrors] = useState<FormError[]>([]);
  const { calculateTotal, createOrder } = api;

  const [, executeCalculateTotal] = useAxios<number>(
    {
      url: calculateTotal,
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const [, executeCreateOrder] = useAxios<Order>(
    {
      url: createOrder,
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const handleToppingsChange = (topping: PizzaTopping, checked: boolean) => {
    if (checked) {
      setPizzaToppings([...pizzaToppings, topping]);
      setErrors(errors.filter((e) => e !== "pizzaToppings"));
    } else {
      setPizzaToppings(pizzaToppings.filter((t) => t !== topping));
    }

    setPrice(undefined);
  };

  const handlePizzaSizeChange = (pizzaSize: PizzaSize) => {
    setPizzaSize(pizzaSize);
    setPrice(undefined);
    setErrors(errors.filter((e) => e !== "pizzaSize"));
  };

  const handleCalculateTotal = async () => {
    if (!validateForm()) return;

    const { data } = await executeCalculateTotal({
      data: {
        pizzaSize,
        pizzaToppings,
      },
    });
    setPrice(data);
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) return;

    const { data } = await executeCreateOrder({
      data: {
        pizzaSize,
        pizzaToppings,
      },
    });
    navigate(`/orders/${data.id}`);
  };

  const validateForm = () => {
    const errors: FormError[] = [];
    if (!pizzaSize) errors.push("pizzaSize");
    if (pizzaToppings.length === 0) errors.push("pizzaToppings");
    setErrors(errors);
    return errors.length === 0;
  };

  return (
    <div>
      <p className="pb-2 text-xl font-semibold">Select pizza size</p>
      <div className="flex justify-between p-1 border rounded-2xl border-accent">
        {SIZES.map((size) => (
          <Radio
            key={size}
            currentlyChecked={pizzaSize}
            onClick={handlePizzaSizeChange}
            name={size}
          />
        ))}
      </div>
      {errors.includes("pizzaSize") && (
        <p className="py-1 text-red-600">
          Sorry, we don't serve falsy pizza sizes yet...
        </p>
      )}
      <p className="py-2 text-xl font-semibold">Select pizza toppings</p>
      <div className="flex flex-col p-1 border rounded-2xl border-accent">
        {TOPPINGS.map((topping) => (
          <Checkbox
            key={topping}
            onChange={handleToppingsChange}
            name={topping}
          />
        ))}
      </div>
      {errors.includes("pizzaToppings") && (
        <p className="py-1 text-red-600">
          Pizza without toppings is just a loaf of bread, you know...
        </p>
      )}
      <p className="py-2 text-xl font-semibold">Price</p>
      <div className="flex items-center justify-between p-1 rounded-2xl">
        <div className="flex gap-2">
          <button onClick={handleCalculateTotal} className="btn">
            Calculate
          </button>
          {price && (
            <button onClick={handleCreateOrder} className="btn btn-accent">
              Order
            </button>
          )}
        </div>
        <span className="text-xl font-semibold">€ {price ?? " -"}</span>
      </div>
    </div>
  );
};
