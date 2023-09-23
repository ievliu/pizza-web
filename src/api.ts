const BASE_URL = "https://localhost:7127";

export interface Pizza {
  id: string;
  name: string;
}

export const Api = {
  getPizzas: `${BASE_URL}/all`,
};
