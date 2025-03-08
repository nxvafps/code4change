import styled from "styled-components";
import Link from "next/link";
import { User } from "../../../server/app/types/table-data-types";
import { useParams } from "next/navigation";
import { fetchUserByUsername } from "../api";
import { useState, useEffect } from "react";

const ProfileCard = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary.main};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.text.light};

  strong {
    color: ${({ theme }) => theme.colors.primary.light};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
  justify-content: center;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.light};
`;

const LoadingState = styled.div`
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export default function UserCard() {
  const { username } = useParams<{ username: string }>();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <ProfileCard>
      <ImageContainer>
        <ProfileImage
          src={user.profile_picture}
          alt={`Profile of ${user.github_username}`}
        />
      </ImageContainer>
      <Title>{user.github_username}</Title>

      <Link href={`https://github.com/${user.github_username}`} passHref>
        <InfoText>
          <strong>GitHub: </strong>
          {`https://github.com/${user.github_username}`}
        </InfoText>
      </Link>

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
      <SectionTitle>
        <strong>Skills</strong>
      </SectionTitle>
      <TagList>
        {user.skills?.map((skill, index) => (
          <Tag key={index}>{skill}</Tag>
        ))}
      </TagList>

      <SectionTitle>
        <strong>Categories</strong>
      </SectionTitle>
      <TagList>
        {user.categories?.map((category, index) => (
          <Tag key={index}>{category}</Tag>
        ))}
      </TagList>
    </ProfileCard>
  );
}
