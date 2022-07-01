import styled from "@emotion/styled";
import { format, getMonth, getYear } from "date-fns";
import Categories from "../components/Categories/categories";
import MonthPicker from "../components/MonthPicker";
import { typography } from "../styles";
import { Link, useLocation, useParams } from "react-router-dom";
import { useLocalStorage, useSearchParamsWithLocal } from "../hooks";
import CategoryCheckbox from "../components/CategoryCheckbox/CategoryCheckbox";
import { useState } from "react";
import { getMonthlyData } from "../components/Categories/utils";

const Title = styled.h1`
  ${typography.head.sm}
  font-weight: 600;
`;

const initialDate = {
  year: getYear(new Date()),
  month: getMonth(new Date()),
};

function CategoriesPage() {
  let params = useParams();
  let location = useLocation();
   
  const [searchParams, setSearchParams] = useSearchParamsWithLocal(
    initialDate,
    "expensable_date"
  );

  // const type = params.type || "expense";
  const [type, setType] = useLocalStorage("expense", "transaction-type");

  const date = {
    year: +searchParams.get("year"),
    month: +searchParams.get("month"),
  };

  const handleRightClick = () => {
    const newMonth = date.month + 1;
    if (newMonth > 11) {
      setSearchParams({ year: date.year + 1, month: 0 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
    }
  };

  const handleLeftClick = () => {
    const newMonth = date.month - 1;
    if (newMonth < 0) {
      setSearchParams({ year: date.year - 1, month: 11 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
    }
  };

  return (
    <>
      <div>
        <Title>Categories</Title>
        <div>
          <Link
            to={"/categories/expense" + location.search}
            onClick={() => setType("expense")}
          >
            Expense
          </Link>
          <Link
            to={"/categories/income" + location.search}
            onClick={() => setType("income")}
          >
            Income
          </Link>
        </div>
        <MonthPicker
          label={format(new Date(date.year, date.month), "MMMM yyyy")}
          onRightClick={handleRightClick}
          onLeftClick={handleLeftClick}
        />
        <Categories date={date} type={type} />
      </div>
    </>
  );
}

export default CategoriesPage;
