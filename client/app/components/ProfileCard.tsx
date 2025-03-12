// ProfileCard.tsx
"use client";

import React, { ReactElement } from "react";
import styled from "styled-components";
import { User } from "../../../server/app/types/table-data-types";

interface ProfileCardProps {
  userInfo: User;
  selectBadge: (xp: number) => ReactElement | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userInfo, selectBadge }) => {
  return (
    <Card>
      <Header>
        <Title>Hi {userInfo.github_username}, time to make a difference!</Title>
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
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const Header = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  align-items: center;
  justify-content: center;
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

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary.main};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const BadgeSection = styled.div`
  margin-left: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
`;
