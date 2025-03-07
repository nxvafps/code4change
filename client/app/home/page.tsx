"use client";

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState, useEffect } from "react";
import UserBadge from "../components/Badges";
import { useAuth } from "../context/AuthContext";
import { User } from "../../../server/app/types/table-data-types";
import { fetchUserByUsername } from "../api";

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

  const adjustProgress = (xp: number): number => {
    const maxXP = 1500;
    return Math.min(xp, maxXP);
  };

  const actualProgress = adjustProgress(userInfo.xp);

  const selectBadge = (xp: number): JSX.Element | null => {
    if (xp >= 1000) return <UserBadge color="diamond" />;
    if (xp >= 500) return <UserBadge color="platinum" />;
    if (xp >= 250) return <UserBadge color="gold" />;
    if (xp >= 50) return <UserBadge color="silver" />;
    if (xp >= 0) return <UserBadge color="bronze" />;
    return null;
  };

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        <Card>
          <Header>
            <Greeting>
              Hi {userInfo.github_username}, time to make a difference!
            </Greeting>
          </Header>
          <ProfileSection>
            <ProfileImage src={userInfo.profile_picture} alt="profile" />
            <BadgeSection>{selectBadge(userInfo.xp)}</BadgeSection>
          </ProfileSection>
        </Card>
        <Card>
          <SectionTitle>Progress Bar - Total XP</SectionTitle>
          <ProgressWrapper>
            <ProgressBar progress={actualProgress * 0.1}>
              <ProgressText>{actualProgress} XP</ProgressText>
            </ProgressBar>
          </ProgressWrapper>
        </Card>
        <Card>
          <SectionTitle>Suggested Projects Based on Skillset</SectionTitle>
        </Card>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;

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

const Header = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
`;

const Greeting = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #28a745;
`;

const BadgeSection = styled.div`
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #555;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 40px;
  background: linear-gradient(90deg, #28a745, #1e7e34);
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressText = styled.span`
  color: #fff;
  font-weight: bold;
`;
