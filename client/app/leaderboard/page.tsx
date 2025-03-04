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
    <div>
      <NavBar />
      <CollpseBox>
        <CollapseButton onClick={toggleBox}>
          {isOpen ? "Hide Leaderboard Rules" : "Show Leaderboard Rules"}
        </CollapseButton>
        {isOpen ? (
          <RulesBox>
            <ul>
              <li>1XP is awarded for each contribution change</li>
              <li>1XP - Contributor Level</li>
              <li>50XP - Active Contributor</li>
              <li>250XP Top Contributor</li>
              <li>500XP Open Source Champion</li>
              <li>1000XP Code4Change Legend</li>
            </ul>
          </RulesBox>
        ) : null}
      </CollpseBox>
      <LeaderboardTable></LeaderboardTable>
      <BadgeContainer>
        <UserBadge color="diamond" />
        <UserBadge color="platinum" />
        <UserBadge color="gold" />
        <UserBadge color="silver" />
        <UserBadge color="bronze" />
      </BadgeContainer>
      <Footer />
    </div>
  );
}

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
`;

const CollpseBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const CollapseButton = styled.button`
  background-color: #24292e;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 200px;
  height: 30px;
  &:hover {
    background-color: #1b1f23;
  }
`;

const RulesBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
