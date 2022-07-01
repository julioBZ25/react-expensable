import styled from "@emotion/styled";
import { fonts, colors } from "../../styles";

export const Section = styled.div`
  max-width: 295px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: ${ fonts.primary };
  color: ${colors.gray[500]};
`;

export const Title = styled.h2`
  font-size: 16px;
  line-height: 24px;
`;

export const InputsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;
