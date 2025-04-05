import axios from 'axios';
import Randomfood from './RandomFoodClient';

const fetchData = async () => {
  const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
  return data;
};

export default async function RandomFoodPage() {
  const data = await fetchData();
  return <Randomfood data={data} />;
}
