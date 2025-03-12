"use client";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { User } from "../../../server/app/types/table-data-types";
import logo from "../../public/logo.svg";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(to right, #000000, #1c1c1c);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    color: rgb(52, 164, 82); /* Soft yellow hover effect */
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const LogoutButton = styled.button`
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgb(13, 79, 23);
    background-color: rgba(7, 88, 40, 0.35);
  }
`;

export default function NavBar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userName = user?.github_username;

  return (
    <NavbarContainer>
      <Link href="/home">
        <Image
          src={logo}
          alt="Code4Change Logo"
          width={60}
          height={60}
          priority
          style={{ cursor: "pointer" }}
        />
      </Link>
      <LinkContainer>
        <StyledLink href="/home">Home</StyledLink>
        <StyledLink href={`/${userName}`}>My Profile</StyledLink>
        <StyledLink href="/projects">Projects</StyledLink>
        <StyledLink href="/add_project">Add Project</StyledLink>
        <StyledLink href="/leaderboard">Leaderboard</StyledLink>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </LinkContainer>
    </NavbarContainer>
  );
}
