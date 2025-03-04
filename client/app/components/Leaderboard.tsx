"use client";

import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

export default function LeaderboardTable() {
  const [users, setUsers] = useState([
    { username: "Mark", xp: 123 },
    { username: "Rina", xp: 433 },
    { username: "Alois", xp: 438 },
    { username: "Cristian", xp: 398 },
    { username: "Ollie", xp: 400 },
  ]);

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
            <TableRow key={user.username} rank={index + 1}>
              <TableData>{index + 1}</TableData>
              <TableData>
                <StyledLink href={`/${user.username}`} passHref>
                  {user.username}
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
