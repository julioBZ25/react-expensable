import CategoryCard from "../CategoryCard";
import PropTypes from "prop-types";
import { Wrapper } from "./styles";
import styled from "@emotion/styled";
import { colors } from "../../styles";
import { RiAddLine } from "react-icons/ri";

const AddCategoryButton = styled.div`
  border: 2px dashed ${colors.stone['400']};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${colors.stone['400']};
  & svg {
    width: 2rem;
    height: 2rem;
  }
`

function CategoriesList({ data, onCategoryClick, onNewCategoryClick }) {
  return (
    <Wrapper>
      {data.map(({ ...data }) => (
        <CategoryCard
          key={data.id}
          onCategoryClick={onCategoryClick}
          {...data}
        />
      ))}
      <AddCategoryButton onClick={onNewCategoryClick}>
        <RiAddLine />
      </AddCategoryButton>
    </Wrapper>
  );
}

CategoriesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default CategoriesList;
