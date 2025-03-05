"use client";
import { useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import ContributionsCard from "../components/ContributionsCard";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

type User = {
  github_id: string;
  github_username: string;
  email: string;
  xp: number;
  role: string;
  profile_picture: string;
  skills: string[];
  categories: string[];
};

type Contribution = {
  user_github_username: string;
  project_name: string;
  contribution: {
    pull_request_url: string;
    additions: number;
    deletions: number;
    total_changes: number;
    status: string;
  };
};

export default function UserPage() {
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

  const [userContributions, setUserContributions] = useState<Contribution[]>([
    {
      user_github_username: "devcontributor",
      project_name: "EcoTracker",
      contribution: {
        pull_request_url: "https://github.com/nxvafps/EcoTracker/pull/15",
        additions: 87,
        deletions: 5,
        total_changes: 92,
        status: "pending",
      },
    },
    {
      user_github_username: "devcontributor",
      project_name: "CaptainPlanet",
      contribution: {
        pull_request_url: "https://github.com/nxvafps/EcoTracker/pull/15",
        additions: 87,
        deletions: 5,
        total_changes: 92,
        status: "pending",
      },
    },
  ]);

  return (
    <PageContainer>
      <NavBar />
      <UserCard user={user} />
      <ContributionsCard
        userContributions={userContributions}
        username={user.github_username}
      />
      <Footer />
    </PageContainer>
  );
}
