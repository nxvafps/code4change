"use client";

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "../../../server/app/types/table-data-types";
import { fetchUserByUsername } from "../api";
import ProfileCard from "../components/Profile";
import ProgressCard from "../components/ProgressCard";
import UserBadge from "../components/Badges";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserByUsername(user.github_username)
        .then((userFromAPI) => {
          setUserInfo(userFromAPI);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load, please try again");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!userInfo) return <div>User not found.</div>;

  const selectBadge = (xp: number): JSX.Element | null => {
    if (xp >= 1000) return <UserBadge color="diamond" />;
    if (xp >= 500) return <UserBadge color="platinum" />;
    if (xp >= 250) return <UserBadge color="gold" />;
    if (xp >= 50) return <UserBadge color="silver" />;
    if (xp >= 0) return <UserBadge color="bronze" />;
    return null;
  };

  const adjustProgress = (xp: number): number => {
    const maxXP = 1500;
    return Math.min(xp, maxXP);
  };

  const actualProgress = adjustProgress(userInfo.xp);

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        <ProfileCard userInfo={userInfo} selectBadge={selectBadge} />
        <ProgressCard actualProgress={actualProgress} />
        <Card>
          <SectionTitle>Suggested Projects Based on Skillset</SectionTitle>
        </Card>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;

// Styled components used in HomePage
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--background, #f0f0f0);
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Card = styled.section`
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #555;
`;
