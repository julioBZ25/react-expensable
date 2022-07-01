import styled from "@emotion/styled";
import React from 'react'
import { useCategories } from "../../context/category-context";
import { colors, typography } from '../../styles';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 24px 8px 0 32px;
  border-left: 1px solid #D1D5DB;
`;

const SytledCheckbox = styled.input`
  width: 1em;
  height: 1em;
  accent-color: ${colors.stone[300]};
`;

const CategoryTitle = styled.p`
  ${typography.text['md']}
`;

const TransactionTitle =styled.h1` 
  ${typography.head['sm']}
`;

const LabelCheckbox = styled.label`
  ${typography.text['sm']}
`

const CheckboxesContainer = styled.div`
  display: grid;
  row-gap: 0.5rem;
  grid-template-columns: repeat(3, 100px);
`

const CheckboxDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
`

function CategoryCheckbox() {
  const { categories } = useCategories();

  return (
    <Container>
      <TransactionTitle>Transactions</TransactionTitle>
      <CategoryTitle>Category</CategoryTitle>
      <CheckboxesContainer>
        {categories.map( (cat) => {
          return (
          <CheckboxDiv>
            <SytledCheckbox type="checkbox" id={cat.id || cat.name} name={cat.name}/>
            <LabelCheckbox htmlFor={cat.id || cat.name}>{cat.name}</LabelCheckbox>
          </CheckboxDiv>)
        })}
      </CheckboxesContainer>
    </Container>
  );
}

export default CategoryCheckbox