import styled from "styled-components";
import Link from "next/link";

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

interface UserCardProps {
  user: User;
}

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

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 40%;
  height: 40%;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #333;

  a {
    color: #0070f3;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
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
  transition: background-color 0.2s;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function UserCard({ user }: UserCardProps) {
  return (
    <UsersPageContainer>
      <Title>{user.github_username}</Title>
      <Section>
        <ImageContainer>
          <ProfileImage
            src={user.profile_picture}
            alt={`Profile of ${user.github_username}`}
          />
        </ImageContainer>
        <Link href={`https://github.com/${user.github_id}`} passHref>
          <InfoText>
            <strong>{`https://github.com/${user.github_id}`}</strong>
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
    </UsersPageContainer>
  );
}
