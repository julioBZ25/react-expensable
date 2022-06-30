import * as S from "./styles";
import { ReactComponent as Logo } from "../../assets/expensable-logo.svg";
import SidebarNav from "../SidebarNav";
import styled from "@emotion/styled";
import { colors } from "../../styles";
import { useAuth } from "../../context/auth-context";

const CustomLink = styled.a`
  cursor: pointer;
  color: ${colors.gray.medium};
  font-weight: 600;
  &:hover {
    color: ${colors.gray.dark};
  }
`;

function Sidebar() {
  const { logout } = useAuth();
  return (
    <S.Wrapper>
      <Logo />
      <SidebarNav />
      <CustomLink onClick={() => logout()}>Logout</CustomLink>
    </S.Wrapper>
  );
}

export default Sidebar;
