import styled from "@emotion/styled";
import { colors, typography } from "../styles";

const Label = styled.label``;

const StyledInput = styled.input`
  padding: 0.5rem;
  ${typography.lg};
  border-radius: 6px;
  border: 1px solid ${colors.gray[400]};
  background-color: white;
  color: ${colors.gray.dark};
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const Error = styled.p`
  color: red;
  padding-left: 1rem;
`;

function Input({
  id,
  name,
  type = "text",
  placeholder,
  label,
  error,
  ...rest
}) {
  return (
    <InputContainer>
      {label && <Label htmlFor={id}>{label}</Label>}
      {console.log(rest)}
      <StyledInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {error && <Error size="sm">{error}</Error>}
    </InputContainer>
  );
}

export default Input;
