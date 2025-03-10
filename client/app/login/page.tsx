"use client";

import GitHubLoginButton from "../components/login/GithubLoginButton";
import styled from "styled-components";
import Footer from "../components/Footer";

const PageWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background.dark},
    #151515
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.large};
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
`;

const LoginHeader = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const LoginDescription = styled.p`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Login() {
  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
