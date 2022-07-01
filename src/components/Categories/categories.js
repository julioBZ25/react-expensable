import { useEffect, useState } from "react";
import apiFetch from "../../services/api-fetch";
import PropTypes from "prop-types";
import { getMonthlyData } from "./utils";
import CategoriesList from "../CategoriesList";
import styled from "@emotion/styled";
import { colors, typography } from "../../styles";
import Calculator from "../Calculator/calculator";
import NewCategoryForm from "./new-category-form";
import CategoryCheckbox from "../CategoryCheckbox/CategoryCheckbox";
import { useCategories } from "../../context/category-context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const TotalAmount = styled.p`
  ${typography.head.lg}
  color: ${(props) =>
    props.type === "expense" ? colors.red[500] : colors.green[500]};
`;

const TotalLabel = styled.p`
  ${typography.text.sm}
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(23 23 23 / 75%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Categories({ date, type }) {
  
  const [isOpenCalcModal, setIsOpenCalcModal] = useState(false);
  const [isOpenCatModal, setIsOpenCatModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categories, setCategories, loading, error } = useCategories()

  const monthlyData = getMonthlyData(categories, date, type);
  const total = monthlyData.reduce((acc, cur) => acc + cur.amount, 0);
  
  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setIsOpenCalcModal(true);
  }

  function handleNewCategoryClick() {
    setIsOpenCatModal(true);
  }

  function handleCalculatorClose() {
    setIsOpenCalcModal(false);
  }

  function handleCalcSubmit(categoryId, amount, date) {
    apiFetch(`categories/${categoryId}/transactions`, {
      body: { amount: parseInt(amount), date },
    })
      .then((trx) => {
        const newCategories = [...categories];
        const category = newCategories.find((cat) => cat.id === categoryId);
        category.transactions.push(trx);
        setCategories(newCategories);
      })
      .catch((error) => console.log(error));
  }

  function handleNewCategorySubmit(data) {
    apiFetch("categories", {
      body: data,
    })
      .then((category) => {
        setCategories([...categories, category]);
        setIsOpenCatModal(false);
      })
      .catch((error) => console.log(error));
  }

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Wrapper>
      <TotalWrapper>
        <TotalAmount type={type}>
          $ {Intl.NumberFormat("en-US").format(total)}
        </TotalAmount>
        <TotalLabel>
          Total {type === "expense" ? "Expenses" : "Income"}
        </TotalLabel>
      </TotalWrapper>
      <CategoriesList
        data={monthlyData}
        onCategoryClick={handleCategoryClick}
        onNewCategoryClick={handleNewCategoryClick}
      />
      {isOpenCalcModal ? (
        <Modal>
          <Calculator
            category={selectedCategory}
            onCloseClick={handleCalculatorClose}
            date={date}
            onCalcSubmit={handleCalcSubmit}
          />
        </Modal>
      ) : null}
      {isOpenCatModal ? (
        <Modal>
          <NewCategoryForm
            onClose={() => setIsOpenCatModal(false)}
            onSubmit={handleNewCategorySubmit}
            type={type}
          />
        </Modal>
      ) : null}
    </Wrapper>
  );
}

Categories.propTypes = {
  date: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
  }),
  type: PropTypes.oneOf(["income", "expense"]),
};

export default Categories;
