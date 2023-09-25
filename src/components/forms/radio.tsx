import { PizzaSize } from "../../api";

interface Props {
  name: PizzaSize;
  currentlyChecked?: PizzaSize;
  onClick: (pizzaSize: PizzaSize) => void;
}

export const Radio = ({ name, onClick, currentlyChecked }: Props) => {
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
