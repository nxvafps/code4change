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

  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

  if (isLoading) return <LoadingText>Loading leaderboard...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <LeaderboardContainer>
      <Title>🏆 Leaderboard</Title>
      <TableCard>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Rank</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>XP</TableHeader>
            </TableRow>
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
      </TableCard>
    </LeaderboardContainer>
  );
}

const LeaderboardContainer = styled.div`
  display: flex;
  position: relative;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  max-width: 68rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};
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

const TableCard = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const Table = styled.table`
  width: 100%;
  min-width: 330px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const TableRow = styled.tr<{ rank?: number }>`
  background-color: ${(props) =>
    props.rank === 1
      ? "rgba(255, 215, 0, 0.15)"
      : props.rank === 2
      ? "rgba(192, 192, 192, 0.15)"
      : props.rank === 3
      ? "rgba(205, 127, 50, 0.15)"
      : "transparent"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme, rank }) =>
      rank === 1
        ? "rgba(255, 215, 0, 0.25)"
        : rank === 2
        ? "rgba(192, 192, 192, 0.25)"
        : rank === 3
        ? "rgba(205, 127, 50, 0.25)"
        : `${theme.colors.background.dark}40`};
  }
`;

const TableData = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.light};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingText = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ErrorText = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
