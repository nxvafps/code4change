"use client";

import GitHubLoginButton from "../components/login/GithubLoginButton";
import styled from "styled-components";
import Footer from "../components/Footer";

// styled components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: var(--background);
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;

  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
  }
`;

const LoginHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--foreground);
`;

const LoginDescription = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #4b5563;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Login() {
  return (
    <>
      <LoginContainer>
        <LoginCard>
          <LoginHeader>Sign In</LoginHeader>
          <LoginDescription>
            Connect with your GitHub account to contribute to projects
          </LoginDescription>
          <ButtonContainer>
            <GitHubLoginButton />
          </ButtonContainer>
        </LoginCard>
      </LoginContainer>
      <Footer />
    </>
  );
}
