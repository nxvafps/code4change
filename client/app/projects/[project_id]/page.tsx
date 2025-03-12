"use client";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import {
  getProjectById,
  getProjectSkills,
  getProjectCategories,
  addSkillsToProject,
} from "@/app/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IssuesBox } from "@/app/components/projectIssues";
import styled from "styled-components";

const PageWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background.dark},
    #151515
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.main`
  display: flex;
  position: relative;
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  max-width: 68rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
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

const ProjectCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.light};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProjectDetail = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  strong {
    margin-right: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.accent.main};
  }
`;

const GitHubButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const IssuesSection = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export default function ProjectDetails() {
  const { project_id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<CategoryProject[]>([]);
  useEffect(() => {
    const getProject = async () => {
      try {
        const projectData = await getProjectById(project_id);
        setProject(projectData);
        const skillsData = await getProjectSkills(project_id);
        setSkills(skillsData);
        const categoriesData = await getProjectCategories(project_id);
        setCategories(categoriesData);

        console.log(categoriesData);
      } catch (err) {
        setError("Failed to load project details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (project_id) {
      getProject();
    }
  }, [project_id]);

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        {loading && <p>Loading project details...</p>}
        {error && <p>{error}</p>}
        {project && (
          <>
            <Title>{project.name}</Title>
            <ProjectCard>
              <Description>{project.description}</Description>
              <ProjectImage
                src={project.project_image_url || "/default-project.jpg"}
                alt={project.name}
              />

              <ProjectDetail>
                <strong>Owner:</strong> {project.owner_name}
              </ProjectDetail>

              <ProjectDetail>
                <strong>Status:</strong> {project.status}
              </ProjectDetail>

              <ProjectDetail>
                <strong>GitHub repository:</strong>
                <GitHubButton
                  onClick={() => window.open(project.github_repo_url, "_blank")}
                >
                  View on GitHub
                </GitHubButton>
              </ProjectDetail>

              <ProjectDetail>
                <strong>Created:</strong>{" "}
                {new Date(project.created_at).toLocaleString()}
              </ProjectDetail>

              <ProjectDetail>
                <strong>Last updated:</strong>{" "}
                {new Date(project.updated_at).toLocaleString()}
              </ProjectDetail>
              <ProjectDetail>
                <strong>Skills:</strong>
                {skills.length > 0 ? (
                  <TagContainer>
                    {skills.map((skill) => (
                      <Tag key={skill.id}>{skill.name}</Tag>
                    ))}
                  </TagContainer>
                ) : (
                  <p>No skills listed for this project.</p>
                )}
              </ProjectDetail>
              <ProjectDetail>
                <strong>Categories:</strong>
                {categories.length > 0 ? (
                  <TagContainer>
                    {categories.map((category) => (
                      <Tag key={category.id}>{category.category_name}</Tag>
                    ))}
                  </TagContainer>
                ) : (
                  <p>No categories listed for this project.</p>
                )}
              </ProjectDetail>
            </ProjectCard>

            <IssuesSection>
              <IssuesBox projectId={project_id} />
            </IssuesSection>
          </>
        )}
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
}

interface Project {
  id: number;
  name: string;
  description: string;
  github_repo_url: string;
  project_image_url: string;
  owner_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}
interface Skill {
  id: number;
  name: string;
}
export interface CategoryProject {
  id: number;
  category_name: string;
}

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;
