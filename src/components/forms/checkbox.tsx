import { PizzaTopping } from "../../api";

interface Props {
  name: PizzaTopping;
  onChange: (topping: PizzaTopping, checked: boolean) => void;
}

export const Checkbox = ({ name, onChange }: Props) => {
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
