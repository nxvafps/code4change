"use client";

import { getIssuesByProjectId } from "./../api";
import { useState, useEffect } from "react";
import styled from "styled-components";

const IssuesContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
  margin-top: 20px;
`;

const IssueTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const IssuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const IssueItem = styled.li`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};

  &:last-child {
    border-bottom: none;
  }
`;

const IssueItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.light};
`;

const IssueDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const IssueDetail = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatusLabel = styled.strong`
  color: ${({ theme }) => theme.colors.primary.main};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.status.error};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export function IssuesBox({ projectId }: any) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issuesData = await getIssuesByProjectId(projectId);
        setIssues(issuesData);
      } catch (err) {
        setError("Failed to load issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [projectId]);

  return (
    <IssuesContainer>
      <IssueTitle>Project Issues</IssueTitle>
      {loading && <p>Loading issues...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && issues.length === 0 && (
        <p>No issues found for this project.</p>
      )}
      <IssuesList>
        {issues.map((issue: Issue) => (
          <IssueItem key={issue.id}>
            <IssueItemTitle>{issue.title}</IssueItemTitle>
            <IssueDescription>{issue.description}</IssueDescription>
            <IssueDetail>
              <StatusLabel>Status:</StatusLabel> {issue.status}
            </IssueDetail>
            <IssueDetail>
              <StatusLabel>Created by:</StatusLabel> {issue.created_by}
            </IssueDetail>
            <IssueDetail>
              <StatusLabel>Assigned to:</StatusLabel> {issue.assigned_to}
            </IssueDetail>
            <IssueDetail>
              <StatusLabel>Created at:</StatusLabel>{" "}
              {new Date(issue.created_at).toLocaleString()}
            </IssueDetail>
            <IssueDetail>
              <StatusLabel>Updated at:</StatusLabel>{" "}
              {new Date(issue.updated_at).toLocaleString()}
            </IssueDetail>
          </IssueItem>
        ))}
      </IssuesList>
    </IssuesContainer>
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
