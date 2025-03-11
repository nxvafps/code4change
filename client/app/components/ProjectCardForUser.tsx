import styled from "styled-components";
import { Project } from "../../../server/app/types/table-data-types";

interface ExtendedProject extends Project {
  skills: string[];
  categories: string[];
}

interface ProjectCardForUserProps {
  project: ExtendedProject;
}
const ProjectCardForUser = ({ project }: ProjectCardForUserProps) => {
  const timeCreated = project.created_at
    ? new Date(project.created_at).toLocaleDateString()
    : "unknown";
  return (
    <ProjectsContainer>
      <Title>{project.name}</Title>
      <ProjectInfo>
        <InfoRow>
          <Label>Description:</Label>
          <Value>{project.description}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Created:</Label>
          <Value>{timeCreated}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Status:</Label>
          <Value>{project.status}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Github repo:</Label>
          <ContributionLink
            href={project.github_repo_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </ContributionLink>
        </InfoRow>
        <InfoRow>
          <Label>Categories:</Label>
          <Value>
            {project.categories.length > 0 ? project.categories : "N/A"}
          </Value>
        </InfoRow>
        <InfoRow>
          <Label>Skills:</Label>
          <Value>{project.skills.length > 0 ? project.skills : "N/A"}</Value>
        </InfoRow>
      </ProjectInfo>
    </ProjectsContainer>
  );
};

const ProjectsContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-width: 800px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.lg} auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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

const ProjectInfo = styled.div`
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

const ContributionLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

export default ProjectCardForUser;
