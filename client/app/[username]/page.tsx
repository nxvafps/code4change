"use client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import UserCard from "../components/UserCard";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function UserPage() {
  return (
    <PageContainer>
      <NavBar />

      <UserCard />

      <Footer />
    </PageContainer>
  );
}
