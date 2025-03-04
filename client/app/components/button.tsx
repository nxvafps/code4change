import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #24292e;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 150px;
  height: 30px;
  &:hover {
    background-color: #1b1f23;
  }
`;

function LoginButton() {
  const handleLogin = () => {};

  return <StyledButton onClick={handleLogin}>Login</StyledButton>;
}

function RegisterButton() {
  const handleRegister = () => {};
  return <StyledButton onClick={handleRegister}>Register</StyledButton>;
}

export { LoginButton, RegisterButton };
