"use client";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { useAuth } from "../context/AuthContext";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  border: solid 1px;
  padding: 10px;
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 5px;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 5px;
  text-align: center;

  &:hover {
    color: #0070f3;
  }
`;

const LogoutButton = styled.button`
  text-decoration: none;
  color: inherit;
  padding: 5px;
  text-align: center;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;

  &:hover {
    color: #0070f3;
  }
`;

export default function NavBar() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <NavbarContainer>
      <Image src={logo} alt="code4change logo" width={60} height={60} />
      <LinkContainer>
        <StyledLink href="/home">Home</StyledLink>
        <StyledLink href="/">My Profile</StyledLink>
        <StyledLink href="/projects">Projects</StyledLink>
        <StyledLink href="/add_project">Add Project</StyledLink>
        <StyledLink href="/leaderboard">Leaderboard</StyledLink>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </LinkContainer>
    </NavbarContainer>
  );
}
