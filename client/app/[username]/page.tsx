"use client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import UserCard from "../components/UserCard";
import ContributionsList from "../components/ContributionsList";

const PageWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background.dark},
    #151515
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentWrapper = styled.main`
  display: flex;
  position: relative;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  max-width: 68rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
`;

export default function UserPage() {
  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        <UserCard />
        <ContributionsList />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
}
