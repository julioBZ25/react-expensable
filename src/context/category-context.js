import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../services/api-fetch";

const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch("categories")
      .then((data) => {
          setCategories(data);
          setLoading(false);
          setParams(JSON.parse(localStorage.getItem("expensable_date")))
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);


  return (
    <CategoryContext.Provider
      value={{
      params,
      setParams,
      categories,
      setCategories,
      loading,
      error
    }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

function useCategories() {
  return useContext(CategoryContext);
}

export { CategoryProvider, useCategories };
