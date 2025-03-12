"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import ProjectCardBox from "../components/ProjectCardBox";
import styled from "styled-components";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedSkill, setSelectedSkill] = useState<string>("All skills");

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        <Sidebar>
          <SearchBar
            setSelectedCategory={setSelectedCategory}
            setSelectedSkill={setSelectedSkill}
          />
        </Sidebar>
        <MainContent>
          <Title>Available Projects</Title>
          <ProjectCardBox
            selectedCategory={selectedCategory}
            selectedSkill={selectedSkill}
          />
        </MainContent>
      </ContentWrapper>

      <Footer />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background.dark},
    #151515
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border: solid 1px white;
`;

const ContentWrapper = styled.main`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
  flex-grow: 1;
`;

const Sidebar = styled.div`
  width: 20%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 4px solid ${({ theme }) => theme.colors.primary.main};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
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
