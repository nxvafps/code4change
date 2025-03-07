// ProfileCard.tsx
"use client";

import React from "react";
import styled from "styled-components";
import { User } from "../../../server/app/types/table-data-types";

interface ProfileCardProps {
  userInfo: User;
  selectBadge: (xp: number) => JSX.Element | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userInfo, selectBadge }) => {
  return (
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
  );
};

export default ProfileCard;

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
