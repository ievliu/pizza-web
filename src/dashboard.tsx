import useAxios from "axios-hooks";
import { Api, Pizza } from "./api";

export const Dashboard = () => {
  const { getPizzas } = Api;

  const [{ data, loading, error }] = useAxios<Pizza[]>(getPizzas);

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error!</p>;
  console.log(data);

  return (
    <div>
      Pizza
      <p>{data[0].id}</p>
      <p>{data[0].name}</p>
    </div>
  );
};
