"use client";
import styled from "styled-components";
import Link from "next/link";

const NavbarContainer = styled.nav`
  display: flex;
  border: solid 1px;
`;

const Logo = styled.img`
  height: 60px;
`;

const LinkContainer = styled.div`
  display: grid;
  grid-template-columns; repeat(3, fr);
  width: 100%;
  gap: 5px;
  padding: 5px;
`;

const NavLink = styled.a`
  text-decoration: none;
`;

export default function NavBar() {
  return (
    <NavbarContainer>
      <Logo src="/logo.svg" alt="code4change logo" />
      <LinkContainer>
        <Link href="/home">Home</Link>
        <Link href="/">My Profile</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/add_project">Add Project</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        <Link href="/">Log Out</Link>
      </LinkContainer>
    </NavbarContainer>
  );
}
