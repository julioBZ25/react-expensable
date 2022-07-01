import styled from "@emotion/styled";
import { colors, fonts } from "../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${fonts.primary};
  color: ${colors.gray[500]};
  gap: 4px;
`;

export const Label = styled.label`
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.125em;
  text-transform: uppercase;
`;

export const StyledInput = styled.input`
  border: 1px solid ${colors.gray[200]};
  outline: none;
  box-sizing: border-box;
  padding: 8px 12px;
  gap: 10px;
  background-color: ${ colors.white };
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;
