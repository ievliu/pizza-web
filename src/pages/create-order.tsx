import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {
  const [price, setPrice] = useState<number>();
  const navigate = useNavigate();

  return (
    <div className="">
      <p className="pb-2 text-xl font-semibold">Select pizza size</p>
      <div className="flex justify-between p-1 border rounded-2xl border-accent">
        <Radio label="Small" />
        <Radio label="Medium" />
        <Radio label="Large" />
      </div>
      <p className="py-2 text-xl font-semibold">Select pizza toppings</p>
      <div className="flex flex-col p-1 border rounded-2xl border-accent">
        <Checkbox label="Pepperoni" />
        <Checkbox label="Mushrooms" />
        <Checkbox label="Onions" />
        <Checkbox label="Sausage" />
        <Checkbox label="Bacon" />
      </div>
      <p className="py-2 text-xl font-semibold">Price</p>
      <div className="flex items-center justify-between p-1 rounded-2xl">
        <div className="flex gap-2">
          <button onClick={() => setPrice(10)} className="btn">
            Calculate
          </button>
          {price && (
            <button onClick={() => navigate("/")} className="btn btn-accent">
              Order
            </button>
          )}
        </div>
        <span className="text-xl font-semibold">${price ?? " -"}</span>
      </div>
    </div>
  );
};

interface RadioProps {
  label: string;
}

interface CheckboxProps {
  label: string;
}

const Radio = ({ label }: RadioProps) => {
  return (
    <label className="gap-2 cursor-pointer label">
      <input type="radio" name="radio-1" className="radio radio-accent" />
      <span className="label-text">{label}</span>
    </label>
  );
};

const Checkbox = ({ label }: CheckboxProps) => {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">{label}</span>
        <input type="checkbox" className="checkbox checkbox-accent" />
      </label>
    </div>
  );
};
