"use client";

import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #24292e;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1b1f23;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export default function GitHubLoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/api/auth/github";
  };

  return (
    <StyledButton onClick={handleLogin}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.836 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C19.568 21.796 24 17.3 24 12c0-6.63-5.37-12-12-12" />
      </svg>
      Sign in with GitHub
    </StyledButton>
  );
}
