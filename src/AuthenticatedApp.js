import styled from "@emotion/styled";
import { colors } from "./styles";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CategoriesPage from "./pages/categories-page";
import { CategoryProvider } from "./context/category-context";
import CategoryCheckbox from "./components/CategoryCheckbox/CategoryCheckbox";


const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr 360px;
  background-color: ${colors.gray[50]};
  height: 100vh;
`;

const MainContainer = styled.main`
  padding: 1.5rem 2rem;
`;

function AuthenticatedApp() {
  return (
    <Container>
      <Sidebar />
      <CategoryProvider>
        <MainContainer>
          <Routes>
            <Route index element={<Navigate to="categories" />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:type" element={<CategoriesPage />} />
            <Route path="/transactions" element={<h1>Transactions</h1>} />
            <Route path="/budgets" element={<h1>Budgets</h1>} />
          </Routes>
        </MainContainer>
        <CategoryCheckbox />
      </CategoryProvider>

    </Container>
  );
}

export default AuthenticatedApp;
