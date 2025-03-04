"use client";
import { useState } from "react";
import styled from "styled-components";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const UsersPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  padding: 1rem;
  background-color: #f9f9f9;
`;

const Section = styled.section`
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
`;

const ProfileImage = styled.img`
  width: 60%;
  height: 60%;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #333;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1rem 0;
  align-items: center;
  justify-content: center;
`;

const Tag = styled.span`
  background-color: #0070f3;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
`;

const ContributionsContainer = styled(Section)`
  margin-top: 1.5rem;
`;

const ContributionInfoText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #333;
`;

const ContributionLink = styled.a`
  color: #0070f3;
  text-decoration: none;
`;

export default function UserPage() {
  const [user, setUser] = useState({
    github_id: "23456789",
    github_username: "devcontributor",
    email: "devcontributor@example.com",
    xp: 135,
    role: "developer",
    profile_picture: "https://randomuser.me/api/portraits/women/42.jpg",
    skills: ["javascript", "react", "node", "express"],
    categories: ["education", "accessibility", "healthcare"],
  });

  const [userContributions, setUserContributions] = useState([
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
      <UsersPageContainer>
        <Link href={`/users/${user.github_id}`}>
          <Title>{user.github_username}</Title>
        </Link>
        <Section>
          <ImageContainer>
            <ProfileImage
              src={user.profile_picture}
              alt={`Profile of ${user.github_username}`}
            />
          </ImageContainer>
          <InfoText>
            <strong>Email: </strong>
            {user.email}
          </InfoText>
          <InfoText>
            <strong>XP: </strong>
            {user.xp}
          </InfoText>
          <InfoText>
            <strong>Role: </strong>
            {user.role}
          </InfoText>
          <div>
            <strong>Skills: </strong>
            <TagList>
              {user.skills.map((skill, index) => (
                <Tag key={index}>{skill}</Tag>
              ))}
            </TagList>
          </div>
          <div>
            <strong>Categories:</strong>
            <TagList>
              {user.categories.map((category, index) => (
                <Tag key={index}>{category}</Tag>
              ))}
            </TagList>
          </div>
        </Section>

        <ContributionsContainer>
          <Title>{user.github_username}'s contributions</Title>
          {userContributions.length > 0 ? (
            userContributions.map((contribution, index) => (
              <ContributionInfoText key={index}>
                <strong>Project Name: </strong> {contribution.project_name}
                <br />
                <strong>Total Changes: </strong>
                {contribution.contribution.total_changes}
                <br />
                <strong>Additions: </strong>
                {contribution.contribution.additions}
                <br />
                <strong>Deletions: </strong>
                {contribution.contribution.deletions}
                <br />
                <strong>Status: </strong> {contribution.contribution.status}
                <br />
                <strong>Pull Request: </strong>
                <ContributionLink
                  href={contribution.contribution.pull_request_url}
                >
                  View Pull Request
                </ContributionLink>
              </ContributionInfoText>
            ))
          ) : (
            <ContributionInfoText>No contributions yet.</ContributionInfoText>
          )}
        </ContributionsContainer>
      </UsersPageContainer>
      <Footer />
    </PageContainer>
  );
}
