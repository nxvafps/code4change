"use client";

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import UserBadge from "../components/Badges";

// Define types for the User object
interface User {
  github_id: string;
  github_username: string;
  email: string;
  xp: number;
  role: string;
  profile_picture: string;
  skills: string[];
  categories: string[];
}

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User>({
    github_id: "23456789",
    github_username: "devcontributor",
    email: "devcontributor@example.com",
    xp: 135,
    role: "developer",
    profile_picture: "https://randomuser.me/api/portraits/women/42.jpg",
    skills: ["javascript", "react", "node", "express"],
    categories: ["education", "accessibility", "healthcare"],
  });

  function adjustProgress(xp: number): number {
    const maxXP = 1000;
    const actualProgress = Math.min(xp, maxXP);
    return actualProgress;
  }

  const actualProgress = adjustProgress(user.xp);

  function selectBadge(xp: number): JSX.Element | null {
    return xp >= 1000 ? (
      <UserBadge color="diamond" />
    ) : xp >= 500 ? (
      <UserBadge color="platinum" />
    ) : xp >= 250 ? (
      <UserBadge color="gold" />
    ) : xp >= 50 ? (
      <UserBadge color="silver" />
    ) : xp >= 1 ? (
      <UserBadge color="bronze" />
    ) : null;
  }

  return (
    <div>
      <NavBar />
      <LandingPageContainer>
        <form>
          <FormContainerUser>
            <div>
              <h3>Hi {user.github_username}, time to make a difference!</h3>
              <br />
              <ImageContainer>
                <Image src={user.profile_picture} alt="profile" />
                <BadgeContainer>{selectBadge(user.xp)}</BadgeContainer>
              </ImageContainer>
            </div>
          </FormContainerUser>
          <div>
            <Title>Progress Bar - Total XP </Title>
            <ProgressContainer>
              <ProgressBar style={{ width: `${actualProgress * 0.1}%` }}>
                {actualProgress} XP
              </ProgressBar>
            </ProgressContainer>
          </div>
          <FormContainer>
            <div>
              <br />
              <p>Suggested projects based on skillset</p>
            </div>
          </FormContainer>
        </form>
      </LandingPageContainer>
      <Footer />
    </div>
  );
};

export default HomePage;

const LandingPageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  left: 40%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 10vh;
  padding: 1rem;
  background-color: var(--background);
`;

const FormContainerUser = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  max-width: 54rem;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  border: solid 1px purple;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  max-width: 54rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  border: solid 1px purple;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BadgeContainer = styled.div`
  margin-left: 50px;
  height: 50px;
`;

const Image = styled.img`
  width: 40%;
  height: 40%;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(26, 44, 188, 0.1);
  overflow: hidden;
  padding: 10px 0;
`;

const ProgressBar = styled.div`
  height: 70px;
  background: #28a745;
  color: white;
  text-align: center;
  line-height: 70px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: width 0.1s ease-in-out;
`;
