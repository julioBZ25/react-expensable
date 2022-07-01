import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../services/api-fetch";

const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch("categories")
      .then((data) => {
        console.log(data)
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);


  return (
    <CategoryContext.Provider
      value={{
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
