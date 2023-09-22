import axios from "axios";

const BASE_URL = "https://localhost:7127";

export interface Pizza {
  Id: string;
  Name: string;
}

export const fetchPizzas = async () => {
  // Make a GET request to the API.
  const response = await axios.get<Pizza[]>(`${BASE_URL}/all`);

  // Return the data from the response.
  return response.data;
};
