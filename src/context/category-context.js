import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../services/api-fetch";

const CategoryContext = createContext();

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch("categories")
      .then((data) => {
          setCategories(data);
          setParams(JSON.parse(localStorage.getItem("expensable_date"))); // { year: "2022", month: "08" }
          let partial = [];
          data.forEach(category => { // data = >categories 
            const newTransactions = category.transactions.map(transaction => ( 
              {
                ...transaction,
                categoryName: category.name,
                color: category.color,
                icon: category.icon,
                tran_type: category.transaction_type
              }
              ));
              
              partial.push(...newTransactions)}
          );

          partial = partial?.reduce((acc, tran) => {
            acc[tran.date] = [...acc[tran.date] || [], tran];
            return acc;
          }, {})

          setTransactions(partial);
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
      params,
      setParams,
      categories,
      transactions,
      setCategories,
      setTransactions,
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
