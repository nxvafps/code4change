"use client";

import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { getAllProjects } from "../api";
import { ReactElement, useEffect, useState } from "react";

// Define interface for project data structure
interface Project {
  id: number | string;
  owner_name: string;
  name: string;
  description: string;
  github_repo_url: string;
  project_image_url: string;
  status: string;
}

// Define theme props for styled components (assumes your theme has this structure)
interface ThemeProps {
  theme: {
    spacing: {
      md: string;
      lg: string;
      xl: string;
    };
    colors: {
      text: {
        light: string;
      };
      status: {
        error: string;
      };
      background: {
        dark: string;
      };
    };
    typography: {
      fontSize: {
        md: string;
        lg: string;
      };
    };
    borderRadius: {
      medium: string;
    };
  };
}

export default function ProjectCardBox(): ReactElement {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
      try {
        const projectData = await getAllProjects();
        setProjects(projectData);
      } catch (err) {
        setError("Failed to load projects, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContainer>
      {loading && <LoadingText>Loading projects...</LoadingText>}

      {error && <ErrorText>{error}</ErrorText>}

      {!loading && projects.length === 0 ? (
        <EmptyMessage>No projects available</EmptyMessage>
      ) : (
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project_id={project.id}
              owner={project.owner_name}
              name={project.name}
              description={project.description}
              github_repo_url={project.github_repo_url}
              project_image={project.project_image_url}
              status={project.status}
            />
          ))}
        </ProjectsGrid>
      )}
    </ProjectsContainer>
  );
}

const ProjectsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectsGrid = styled.div<ThemeProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const LoadingText = styled.div<ThemeProps>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ErrorText = styled.div<ThemeProps>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const EmptyMessage = styled.div<ThemeProps>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.background.dark}40;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;
