import useAxios from "axios-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order, PizzaSize, PizzaTopping, api } from "../api";

const sizes: PizzaSize[] = ["Small", "Medium", "Large"];
const toppings: PizzaTopping[] = [
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

type FormError = "pizzaSize" | "pizzaToppings";

export const CreateOrder = () => {
  const [price, setPrice] = useState<number>();
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>();
  const [pizzaToppings, setPizzaToppings] = useState<PizzaTopping[]>([]);
  const [errors, setErrors] = useState<FormError[]>([]); // ["Pizza size is required", "Pizza toppings are required"
  const navigate = useNavigate();
  const { calculateTotal, createOrder } = api;
  const [, fetchTotal] = useAxios<number>(
    {
      url: calculateTotal,
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const [, orderPizza] = useAxios<Order>(
    {
      url: createOrder,
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const handleToppingChange = (topping: PizzaTopping, checked: boolean) => {
    if (checked) {
      setPizzaToppings([...pizzaToppings, topping]);
      setErrors(errors.filter((e) => e !== "pizzaToppings"));
    } else {
      setPizzaToppings(pizzaToppings.filter((t) => t !== topping));
    }

    setPrice(undefined);
  };

  const handleCalculate = async () => {
    if (!validateForm()) return;

    const { data } = await fetchTotal({
      data: {
        pizzaSize,
        pizzaToppings,
      },
    });
    setPrice(data);
  };

  const handleOrderPizza = async () => {
    if (!validateForm()) return;

    const { data } = await orderPizza({
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

  const handlePizzaSize = (pizzaSize: PizzaSize) => {
    setPizzaSize(pizzaSize);
    setPrice(undefined);
    setErrors(errors.filter((e) => e !== "pizzaSize"));
  };

  return (
    <div className="">
      <p className="pb-2 text-xl font-semibold">Select pizza size</p>
      <div className="flex justify-between p-1 border rounded-2xl border-accent">
        {sizes.map((size) => (
          <Radio
            key={size}
            currentlyChecked={pizzaSize}
            onClick={handlePizzaSize}
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
        <Checkbox onChange={handleToppingChange} name="Pepperoni" />
        {toppings.map((topping) => (
          <Checkbox
            key={topping}
            onChange={handleToppingChange}
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
          <button onClick={handleCalculate} className="btn">
            Calculate
          </button>
          {price && (
            <button onClick={handleOrderPizza} className="btn btn-accent">
              Order
            </button>
          )}
        </div>
        <span className="text-xl font-semibold">€ {price ?? " -"}</span>
      </div>
    </div>
  );
};

interface RadioProps {
  name: PizzaSize;
  currentlyChecked?: PizzaSize;
  onClick: (pizzaSize: PizzaSize) => void;
}

const Radio = ({ name, onClick, currentlyChecked }: RadioProps) => {
  return (
    <label className="gap-2 cursor-pointer label">
      <input
        checked={currentlyChecked === name}
        id={name}
        onChange={() => onClick(name)}
        type="radio"
        name={name}
        className="radio radio-accent"
      />
      <span className="label-text">{name}</span>
    </label>
  );
};

interface CheckboxProps {
  name: PizzaTopping;
  onChange: (topping: PizzaTopping, checked: boolean) => void;
}

const Checkbox = ({ name, onChange }: CheckboxProps) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">{name}</span>
        <input
          onChange={(e) => onChange(name, e.target.checked)}
          type="checkbox"
          className="checkbox checkbox-accent"
        />
      </label>
    </div>
  );
};
