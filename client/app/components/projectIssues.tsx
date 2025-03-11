"use client";

import { getContributionsByProjectId, getIssuesByProjectId } from "./../api";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ContributionsCard from "./ContributionsCard";
import IssuesCard from "./IssuesCard";

export function IssuesBox({ projectId }: any) {
  const [issues, setIssues] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState("issues");

  useEffect(() => {
    Promise.all([
      getIssuesByProjectId(projectId),
      getContributionsByProjectId(projectId),
    ])
      .then(([issuesFromApi, contributionsFromApi]) => {
        setIssues(issuesFromApi);
        setContributions(contributionsFromApi);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load, please try again");
        setLoading(false);
      });
  }, [projectId]);

  const isIssuesActive = view === "issues";

  return (
    <>
      <ToggleContainer>
        <ToggleButton
          active={view === "issues"}
          onClick={() => setView("issues")}
        >
          Issues
        </ToggleButton>
        <ToggleButton
          active={view === "contributions"}
          onClick={() => setView("contributions")}
        >
          Contributions
        </ToggleButton>
      </ToggleContainer>
      <StyledSection>
        {isIssuesActive ? (
          issues && issues?.length > 0 ? (
            <ListContainer>
              {issues.map((issue) => (
                <IssuesCard key={issue.id} issue={issue} />
              ))}
            </ListContainer>
          ) : (
            <EmptyMessage>
              This project doesn't currently have any issues!
            </EmptyMessage>
          )
        ) : contributions && contributions.length > 0 ? (
          <ListContainer>
            {contributions.map((contribution) => (
              <ContributionsCard
                key={contribution.id}
                contribution={contribution}
              />
            ))}
          </ListContainer>
        ) : (
          <EmptyMessage>
            This project has no tracked contributions so far
          </EmptyMessage>
        )}
      </StyledSection>
    </>
  );
}

export interface Issue {
  id?: number;
  project_id?: number;
  title: string;
  description?: string;
  status: string;
  created_by?: number;
  assigned_to?: number;
  created_at: Date;
  updated_at: Date;
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

interface ToggleButtonProps {
  active: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary.main : theme.colors.text.light};
  border-bottom: ${({ active, theme }) =>
    active ? `2px solid ${theme.colors.primary.main}` : "none"};
  transition: color 0.3s, border-bottom 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.status.error};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.background.dark}40;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;
