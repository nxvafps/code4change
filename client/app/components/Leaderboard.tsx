"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchUsers } from "../api";
import { User } from "../../../server/app/types/table-data-types";

export default function LeaderboardTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers()
      .then((usersFromApi) => {
        setUsers(usersFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load leaderboard, please try again");
        setIsLoading(false);
      });
  }, []);
  console.log(users);

  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);
  return (
    <LeaderboardContainer>
      <Title>🏆 Leaderboard</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>XP</TableHeader>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <TableRow key={user.id} rank={index + 1}>
              <TableData>{index + 1}</TableData>
              <TableData>
                <StyledLink href={`/${user.github_username}`} passHref>
                  {user.github_username}
                </StyledLink>
              </TableData>
              <TableData>{user.xp}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </LeaderboardContainer>
  );
}

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  padding: 10px;
`;

const Table = styled.table`
  width: 85%;
  min-width: 330px;
  border-collapse: collapse;
  margin: auto;
`;

const TableHeader = styled.th`
  background-color: #333;
  color: white;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
`;

const TableRow = styled.tr<{ rank: number }>`
background-color: ${(props) =>
  props.rank === 1
    ? "gold"
    : props.rank === 2
    ? "silver"
    : props.rank === 3
    ? "#cd7f32"
    : "#fff"};
}`;

const TableData = styled.td`
  padding: 15px;
  text-align: center;
`;

const StyledLink = styled(Link)``;
