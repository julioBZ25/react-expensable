import styled from "@emotion/styled";
import { format, getMonth, getYear } from "date-fns";
import Categories from "../components/Categories/categories";
import MonthPicker from "../components/MonthPicker";
import { colors, typography } from "../styles";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLocalStorage, useSearchParamsWithLocal } from "../hooks";
import { useCategories } from "../context/category-context";
import { RiIndeterminateCircleLine, RiAddCircleLine } from "react-icons/ri";

const Title = styled.h1`
  ${typography.head.sm}
  font-weight: 600;
`;

const initialDate = {
  year: getYear(new Date()),
  month: getMonth(new Date()),
};

const CategoriesButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 18px;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${colors.gray['200']};
  & a {
    color: ${colors.gray['500']};
    text-decoration: none;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`;

function CategoriesPage() {
  const { loading, setParams } = useCategories();

  let location = useLocation();
  
  const [searchParams, setSearchParams] = useSearchParamsWithLocal(
    initialDate,
    "expensable_date"
  );

  const [type, setType] = useLocalStorage("expense", "transaction-type");

  const date = {
    year: +searchParams.get("year"),
    month: +searchParams.get("month"),
  };

  const handleRightClick = () => {
    const newMonth = date.month + 1;
    if (newMonth > 11) {
      setSearchParams({ year: date.year + 1, month: 0 });
      setParams({ year: date.year + 1, month: 0 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
      setParams({ year: date.year, month: newMonth });
    }
  };

  const handleLeftClick = () => {
    const newMonth = date.month - 1;
    if (newMonth < 0) {
      setSearchParams({ year: date.year - 1, month: 11 });
      setParams({ year: date.year - 1, month: 11 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
      setParams({ year: date.year, month: newMonth });
    }
  };


  return (
    loading
    ?
    "Loading..."
    :
    <>
      <div>
        <Title>Categories</Title>
        <CategoriesButton>
          <Link
            to={"/categories/expense" + location.search}
            onClick={() => setType("expense")}
            style={type==='expense' ? {color: `${colors.pink['600']}`} : null}
          >
            <RiIndeterminateCircleLine />
            Expense
          </Link>
          <Link
            to={"/categories/income" + location.search}
            onClick={() => setType("income")}
            style={type==='income' ? {color: `${colors.pink['600']}`} : null}
          >
            <RiAddCircleLine />
            Income
          </Link>
        </CategoriesButton>
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
