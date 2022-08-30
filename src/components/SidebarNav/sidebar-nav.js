import { css, cx } from '@emotion/css'
import styled from "@emotion/styled";
import { BiCategoryAlt } from "react-icons/bi";
import { BsReceiptCutoff } from "react-icons/bs";
import { GiTargeted } from "react-icons/gi";
import { colors, typography } from "../../styles";
import SidebarNavItem from "./sidebar-nav-item";
import { useAuth } from "../../context/auth-context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  justify-content: space-between;
`;

const UserContactWrapper = styled.div`
  padding: 16px 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid ${colors.gray[200]};
  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const LogOutDiv = styled.div`
  cursor: pointer;
  ${typography.text['lg']}
  color: ${colors.gray[600]}
`;

function SidebarNav() {
  const { user, logout } = useAuth();

  const navigation = [
    {
      name: "Categories",
      to: "/categories",
      icon: <BiCategoryAlt />,
    },
    // {
    //   name: "Transactions",
    //   icon: <BsReceiptCutoff />,
    //   to: "/transactions",
    // },
    // { name: "Budgets", to: "/budgets", icon: <GiTargeted /> },
  ];

  function HandleLogout(){
    logout()
  }

  return (
    <Wrapper>
      {navigation.map((nav) => (
        <SidebarNavItem key={nav.name} {...nav} />
      ))}
      <UserContactWrapper>
        <div>  
          { user ? <p className={css`${typography.text['sm']} color: ${colors.gray[700]}`} >
              {user.first_name} {user.last_name}
            </p> 
            : "" }
          { user ? <p className={css` ${typography.text['xs']} color: ${colors.gray[500]}`}>{user.email}</p> : "" }
        </div>
        { user ? <LogOutDiv onClick={HandleLogout}>Log out</LogOutDiv> : "" }
      </UserContactWrapper>
    </Wrapper>
  );
}

export default SidebarNav;
