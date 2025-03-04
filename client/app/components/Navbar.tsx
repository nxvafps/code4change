"use client";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo2.png";

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

export default function NavBar() {
  return (
    <NavbarContainer>
      <Image src={logo} alt="code4change logo" width={60} height={60} />
      <LinkContainer>
        <StyledLink href="/home">Home</StyledLink>
        <StyledLink href="/">My Profile</StyledLink>
        <StyledLink href="/projects">Projects</StyledLink>
        <StyledLink href="/add_project">Add Project</StyledLink>
        <StyledLink href="/leaderboard">Leaderboard</StyledLink>
        <StyledLink href="/">Log Out</StyledLink>
      </LinkContainer>
    </NavbarContainer>
  );
}
