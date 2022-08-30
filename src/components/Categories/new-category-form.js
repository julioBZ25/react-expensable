import styled from "@emotion/styled";
import { colors, typography } from "../../styles";
import { GrClose } from "react-icons/gr";
import { categoryColors, categoryIcons } from "../../utils";
import { useState } from "react";
import CircleIcon from "../CircleIcon";
import Button from "../Button";

const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 0.5rem;
  padding: 1rem;
  width: 272px;
`;

const Title = styled.h2`
  ${typography.head.sm};
`;

const Header = styled.div`
  ${typography.head.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem;
  gap: 1.5rem;
`;

const Color = styled.input`
  background-color: ${(props) => props.color};
  display: inline-block;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  outline: ${(props) => (props.active ? `2px solid ${props.color}` : "")};
  outline-offset: ${(props) => (props.active ? "2px" : "")};
  appearance: none;
  &:focus {
    outline: ${(props) => (props.active ? `2px solid ${props.color}` : "")};
    outline-offset: ${(props) => (props.active ? "2px" : "")};
  }
`;

function NewCategoryForm({ onClose, onSubmit, type }) {
  const [activeColor, setActiveColor] = useState("");
  const [activeIcon, setActiveIcon] = useState("");
  const [name, setName] = useState("");

  function handleClick() {
    const data = {
      name: name,
      transaction_type: type,
      color: activeColor,
      icon: activeIcon,
    };
    onSubmit(data);
  }

  return (
    <Card>
      <Header>
        <Title>New Category</Title>
        <GrClose style={{ cursor: "pointer", height: "24px", width: "24px" }} onClick={onClose} />
      </Header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Color</label>
        <Container>
          {Object.entries(categoryColors).map(([colorName, color]) => (
            <Color
              key={colorName}
              color={color}
              active={activeColor === colorName}
              onClick={() => setActiveColor(colorName)}
              type="radio"
              name="color"
            />
          ))}
        </Container>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label>Icon</label>
        <Container>
          {Object.entries(categoryIcons).map(([iconName, Icon]) => (
            <CircleIcon
              key={iconName}
              size="md"
              color={colors.gray[600]}
              Icon={Icon}
              inverted={activeIcon !== iconName}
              onClick={() => setActiveIcon(iconName)}
            />
          ))}
        </Container>
      </div>
      <Button type="primary" size="md" isFullWidth onClick={handleClick}>
        Create
      </Button>
    </Card>
  );
}

export default NewCategoryForm;
