import axios from "axios";
import { useState } from "react";

export default <T>() => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();

  const fetch = (url: string) => {
    setLoading(true);
    axios.get(url)
    .then(({ data }) => setData(data.meals[0]))
    .finally(() => setLoading(false))
  };
  return { loading, data, fetch };
};
