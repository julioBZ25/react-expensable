import styled from "@emotion/styled";
import React from 'react'
import { useCategories } from "../../context/category-context";
import { colors, typography } from '../../styles';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const SytledCheckbox = styled.input`
  width: 1em;
  height: 1em;
  accent-color: ${colors.stone[300]};
`;

export const FilterTitle = styled.p`
  ${typography.text['md']}
  ${colors.gray['500']}
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

function CategoryCheckbox({ onChecked }) {
  const { categories } = useCategories();

  function handleChange(e) {
    onChecked(e.target.name);
  }

  return (
    <Container>
      <FilterTitle>Category</FilterTitle>
      <CheckboxesContainer>
        {categories.map( (cat, index) => {
          return (
          <CheckboxDiv key={index}>
            <SytledCheckbox
              type="checkbox"
              id={cat.id || cat.name}
              name={cat.name}
              onChange={handleChange}
              key={index}
              defaultChecked={false}
            />
            <LabelCheckbox key={index + 1} htmlFor={cat.id || cat.name}>{cat.name}</LabelCheckbox>
          </CheckboxDiv>)
        })}
      </CheckboxesContainer>
    </Container>
  );
}

export default CategoryCheckbox