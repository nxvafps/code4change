"use client";

import { useState } from "react";
import styled from "styled-components";
import UserBadge from "../components/Badges";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import LeaderboardTable from "../components/Leaderboard";

export default function Leaderboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => setIsOpen(!isOpen);

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        <Title>Leaderboard</Title>
        <Card>
          <CollpseBox>
            <CollapseButton onClick={toggleBox}>
              {isOpen ? "Hide Level Rules" : "Show Level Rules"}
            </CollapseButton>
            {isOpen ? (
              <RulesBox>
                <ul>
                  <li>1XP is awarded for each contribution change</li>
                  <li>Earn the following XP to Level Up</li>
                  <li>20XP - Explorer</li>
                  <li>50XP - Developer</li>
                  <li>100XP - Contributor</li>
                  <li>250XP Champion</li>
                  <li>350XP Expert</li>
                  <li>500XP Master</li>
                  <li>750XP Guru</li>
                  <li>1000XP Legend</li>
                  <li>1500XP Visionary</li>
                </ul>
              </RulesBox>
            ) : null}
          </CollpseBox>
        </Card>
        <Card>
          <LeaderboardTable />
        </Card>
        <Card>
          <SectionTitle>Achievement Badges</SectionTitle>
          <BadgeContainer>
            <UserBadge color="diamond" />
            <UserBadge color="platinum" />
            <UserBadge color="gold" />
            <UserBadge color="silver" />
            <UserBadge color="bronze" />
            <UserBadge color="emerald" />
            <UserBadge color="sapphire" />
            <UserBadge color="amethyst" />
          </BadgeContainer>
        </Card>
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
`;

const ContentWrapper = styled.main`
  display: flex;
  position: relative;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  max-width: 68rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Card = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
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

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
`;

const CollpseBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const CollapseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const RulesBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.sm};

  ul {
    list-style-type: none;
    padding: 0;
    width: 100%;

    li {
      margin-bottom: ${({ theme }) => theme.spacing.md};
      position: relative;
      padding: ${({ theme }) => theme.spacing.sm}
        ${({ theme }) => theme.spacing.md};
      padding-left: ${({ theme }) => theme.spacing.xl};
      background-color: ${({ theme }) => theme.colors.background.dark}40;
      border-radius: ${({ theme }) => theme.borderRadius.small};
      border-left: 3px solid ${({ theme }) => theme.colors.primary.main};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      transition: transform 0.2s, box-shadow 0.2s;

      &:before {
        content: "✦";
        position: absolute;
        left: ${({ theme }) => theme.spacing.sm};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.medium};
      }
    }
  }
`;
