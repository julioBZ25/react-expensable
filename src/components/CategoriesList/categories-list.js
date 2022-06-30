import CategoryCard from "../CategoryCard";
import PropTypes from "prop-types";
import { Wrapper } from "./styles";

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
      <button onClick={onNewCategoryClick}>Add Category</button>
    </Wrapper>
  );
}

CategoriesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default CategoriesList;
