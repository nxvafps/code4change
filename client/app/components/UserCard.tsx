import styled from "styled-components";
import Link from "next/link";
import { User } from "../../../server/app/types/table-data-types";
import { useParams } from "next/navigation";
import { fetchUserByUsername } from "../api";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const LoadingState = styled.div`
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export default function UserCard() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isOwnProfile =
    currentUser && user && currentUser.github_username === user.github_username;

  useEffect(() => {
    if (username) {
      fetchUserByUsername(username)
        .then((userFromAPI) => {
          setUser(userFromAPI);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load, please try again");
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) return <LoadingState>Loading...</LoadingState>;
  if (error) return <LoadingState>{error}</LoadingState>;
  if (!user) return <LoadingState>User not found.</LoadingState>;

  return (
    <UsersContainer>
      <ImageContainer>
        <ProfileImage
          src={user.profile_picture}
          alt={`Profile of ${user.github_username}`}
        />
        <UsersInfo>
          <InfoRow>
            <Label>Username:</Label>
            <Value>{user?.github_username}</Value>
          </InfoRow>
          <InfoRow>
            <Label>GitHub:</Label>
            <StyledLink
              href={`https://github.com/${user.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Github Account
            </StyledLink>
          </InfoRow>
          {isOwnProfile && (
            <InfoRow>
              <Label>Email:</Label>
              <Value>{user?.email}</Value>
            </InfoRow>
          )}

          <InfoRow>
            <Label>Role</Label>
            <Value>{user?.role}</Value>
          </InfoRow>

          <InfoRow>
            <Label>Skills:</Label>
            <SkillsContainer>
              {user?.skills?.map((skill, index) => (
                <Tag key={index}>{skill}</Tag>
              )) || "N/A"}
            </SkillsContainer>
          </InfoRow>

          <InfoRow>
            <Label>Categories:</Label>
            <CategoriesContainer>
              {user?.categories?.map((category, index) => (
                <Tag key={index}>{category}</Tag>
              )) || "N/A"}
            </CategoriesContainer>
          </InfoRow>

          <InfoRow>
            <Label>XP:</Label>
            <Value>{user?.xp}</Value>
          </InfoRow>
        </UsersInfo>
      </ImageContainer>
    </UsersContainer>
  );
}

const UsersContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-width: 800px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.lg} auto;
`;

const UsersInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.dark}40;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const InfoRow = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark}40;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent.main};
  margin-right: ${({ theme }) => theme.spacing.sm};
  min-width: 100px;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const ImageContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary.main};
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.text.dark};
  }
`;
