import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import Button from "./Button";
import Input from "./input";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    login(form).catch((error) => console.log(error));
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="example@mail.com"
        value={form.email}
        onChange={handleFormChange}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="******"
        value={form.password}
        onChange={handleFormChange}
      />
      <Button isFullWidth type="primary">
        Login
      </Button>
    </StyledForm>
  );
}
