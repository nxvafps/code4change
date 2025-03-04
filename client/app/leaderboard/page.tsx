"use client";

import styled from "styled-components";
import UserBadge from "../components/Badges";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import LeaderboardTable from "../components/Leaderboard";

export default function Leaderboard() {
  return (
    <div>
      <NavBar />
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
