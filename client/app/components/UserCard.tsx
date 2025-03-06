import styled from "styled-components";
import Link from "next/link";
import { User } from "../../../server/app/types/table-data-types";
import { useParams } from "next/navigation";
import { fetchUserByUsername } from "../api";
import { useState, useEffect } from "react";

const UsersPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  padding: 1rem;
  background-color: #f9f9f9;
  border: solid 1px red;
  height: 100px;
  width: 90%;
  max-width: 800px;
  margin-top: 10px;
`;

const Section = styled.section`
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  text-align: center;
  border: solid 1px;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: solid 1px;
`;

const ProfileImage = styled.img`
  width: 40%;
  height: 40%;
  object-fit: cover;
  border-radius: 10px;
  width: 80px;
  height: 80px;
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
  }, []);

  return (
    <UsersPageContainer>
      <ImageContainer>
        <ProfileImage
          src={user?.profile_picture}
          alt={`Profile of ${user?.github_username}`}
        />
      </ImageContainer>
      <Section>
        <Title>{user?.github_username}</Title>
        <Link href={`https://github.com/${user?.github_id}`} passHref>
          <InfoText>
            <strong>{`https://github.com/${user?.github_id}`}</strong>
          </InfoText>
        </Link>
        <InfoText>
          <strong>Email: </strong>
          {user?.email}
        </InfoText>
        <InfoText>
          <strong>XP: </strong>
          {user?.xp}
        </InfoText>
        <InfoText>
          <strong>Role: </strong>
          {user?.role}
        </InfoText>
        <div>
          <strong>Skills: </strong>
          <TagList>
            {user?.skills?.map((skill, index) => (
              <Tag key={index}>{skill}</Tag>
            ))}
          </TagList>
        </div>
        <div>
          <strong>Categories:</strong>
          <TagList>
            {user?.categories.map((category, index) => (
              <Tag key={index}>{category}</Tag>
            ))}
          </TagList>
        </div>
      </Section>
    </UsersPageContainer>
  );
}
