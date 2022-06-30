import styled from "@emotion/styled";
import { useState } from "react";
import LoginForm from "./components/login-form";
import SignupForm from "./components/signup-form";
import { colors, typography } from "./styles";

const Section = styled.div`
  margin: 96px auto;
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  ${typography.head.sm}
  font-weight: 600;
`;

const CustomLink = styled.a`
  cursor: pointer;
  color: ${colors.gray.medium};
  font-weight: 600;
  &:hover {
    color: ${colors.gray.dark};
  }
`;

function UnauthenticatedApp() {
  const [showLogin, setShowLogin] = useState(true);

  function handleLinkClick(event) {
    event.preventDefault();
    setShowLogin(!showLogin);
  }

  return (
    <Section>
      <Container>
        <Title size="xl" bold>
          Welcome
        </Title>
        {showLogin ? <LoginForm /> : <SignupForm />}
        <CustomLink onClick={handleLinkClick}>
          {showLogin ? "Create Account" : "Login"}
        </CustomLink>
      </Container>
    </Section>
  );
}

export default UnauthenticatedApp;
