import ContributionsCard from "./ContributionsCard";
import ProjectCardForUser from "./ProjectCardForUser";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import {
  Contribution as BaseContribution,
  Project,
} from "../../../server/app/types/table-data-types";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  fetchContributionsByUsername,
  fetchProjectsByUsername,
  fetchUserByUsername,
} from "../api";
import Link from "next/link";
import { User } from "../../../server/app/types/table-data-types";

interface ToggleButtonProps {
  active: boolean;
}

export default function ContributionsList() {
  interface Contribution extends BaseContribution {
    project_name: string;
  }

  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const isOwnProfile =
    currentUser &&
    user &&
    currentUser.github_username === user?.github_username;

  const [contributions, setContributions] = useState<Contribution[] | null>(
    null
  );
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("contributions");

  useEffect(() => {
    Promise.all([
      fetchContributionsByUsername(username),
      fetchProjectsByUsername(username),
      fetchUserByUsername(username),
    ])
      .then(([contributionsFromApi, projectFromApi, userFromApi]) => {
        setContributions(contributionsFromApi);
        setProjects(projectFromApi);
        setUser(userFromApi);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load, please try again");
        setLoading(false);
      });
  }, [username]);

  if (loading) return <LoadingText>Loading contributions...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  const isContributionsActive = view === "contributions";
  return (
    <>
      <ToggleContainer>
        <ToggleButton
          active={view === "contributions"}
          onClick={() => setView("contributions")}
        >
          Contributions
        </ToggleButton>
        <ToggleButton
          active={view === "projects"}
          onClick={() => setView("projects")}
        >
          Projects
        </ToggleButton>
      </ToggleContainer>
      <StyledSection>
        {isContributionsActive ? (
          contributions && contributions.length > 0 ? (
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
              {isOwnProfile ? (
                <>
                  Looks like you don't have any contributions yet. Why not head
                  over to our{" "}
                  <StyledLink href="/projects">projects page</StyledLink> and
                  find a cause worth contributing to!
                </>
              ) : (
                <>This user doesn't have any contributions yet!</>
              )}
            </EmptyMessage>
          )
        ) : projects && projects.length > 0 ? (
          <ListContainer>
            {projects.map((project: Project) => (
              <ProjectCardForUser key={project.id} project={project} />
            ))}
          </ListContainer>
        ) : (
          <EmptyMessage>
            {isOwnProfile ? (
              <>
                Looks like you dont have any projects yet. Why not head over to
                our{" "}
                <StyledLink href="/add_project"> add projects page </StyledLink>
                and upload your first project!
              </>
            ) : (
              <>This user hasn't uploaded any projects yet!</>
            )}
          </EmptyMessage>
        )}
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
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

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
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

const StyledLink = styled(Link)`
  color: #1e90ff;
  text-decoration: underline;
  font-weight: bold;
  &:hover {
    color: #0c7cd5;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const ToggleButton = styled.button`
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
