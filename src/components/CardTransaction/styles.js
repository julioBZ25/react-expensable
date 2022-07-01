import styled from "@emotion/styled";
import { colors, fonts } from "../../styles";

export const Container = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: ${fonts.primary};
  background-color: ${({ type }) => type === "day" ? colors.gray[200] : colors.white };
`;

export const Day = styled.h2`
  font-family: ${fonts.secondary};
  color: ${colors.gray[900]};
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
`;

export const Info = styled.div`
  max-width: 85px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Text = styled.p`
  font-family: ${ fonts.primary };
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ isHead }) => isHead ? colors.gray[900] : colors.gray[500]};
`;

export const Amount = styled.h2`
  font-family: ${ fonts.secondary };
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: ${({ tran_type }) => tran_type === "expense" ? colors.red[500] : colors.green[600]};
`;
