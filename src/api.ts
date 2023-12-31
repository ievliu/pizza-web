const BASE_URL = import.meta.env.VITE_BASE_URL;

export type PizzaSize = "Small" | "Medium" | "Large";

export type PizzaTopping =
  | "Cheese"
  | "Pepperoni"
  | "Sausage"
  | "Bacon"
  | "Pineapple"
  | "Ham"
  | "Chicken"
  | "Beef"
  | "Mushroom"
  | "Onion";

export interface Order {
  id: string;
  pizzaSize: PizzaSize;
  pizzaToppings: PizzaTopping[];
  total: number;
}

export const api = {
  getAllOrders: `${BASE_URL}/Orders`,
  calculateTotal: `${BASE_URL}/Orders/CalculateTotal`,
  createOrder: `${BASE_URL}/Orders`,
  getOrderById: (id?: string) => {
    if (!id) {
      throw new Error("Id is required");
    }
    return `${BASE_URL}/Orders/${id}`;
  },
};
