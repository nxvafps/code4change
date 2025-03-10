"use client";

import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState, useEffect, ReactElement } from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "../../../server/app/types/table-data-types";
import { fetchUserByUsername } from "../api";
import ProfileCard from "../components/ProfileCard";
import ProgressCard from "../components/ProgressCard";
import UserBadge from "../components/Badges";
import { useRouter } from "next/navigation";
import { Project } from "../../../server/app/types/table-data-types";
import { getAllProjects } from "../api";

interface ProjectWithCategories extends Project {
  categories: string[];
}
import ProjectCard from "../components/ProjectCard";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchUserByUsername(user.github_username)
        .then((userFromAPI) => {
          setUserInfo(userFromAPI);
          setLoading(false);
          if (
            (!userFromAPI.skills || userFromAPI.skills.length === 0) &&
            (!userFromAPI.categories || userFromAPI.categories.length === 0)
          ) {
            router.push("/register");
          }
        })
        .catch(() => {
          setError("Failed to load, please try again");
          setLoading(false);
        });
    }
  }, [user]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!userInfo) return <div>User not found.</div>;

  function filterProjectsByCategory(
    projects: ProjectWithCategories[],
    categories: string[] | undefined
  ): Project[] {
    if (!categories || categories.length === 0) {
      return [];
    }

    return projects.filter((project) =>
      project.categories.some((category) => categories.includes(category))
    );
  }

  const filteredProjects = userInfo?.categories?.length
    ? filterProjectsByCategory(projects, userInfo.categories)
    : [];

  const selectBadge = (xp: number): ReactElement | null => {
    if (xp >= 1000) return <UserBadge color="diamond" />;
    if (xp >= 500) return <UserBadge color="platinum" />;
    if (xp >= 250) return <UserBadge color="gold" />;
    if (xp >= 50) return <UserBadge color="silver" />;
    if (xp >= 0) return <UserBadge color="bronze" />;
    return null;
  };

  const adjustProgress = (xp: number): number => {
    const maxXP = 1500;
    return Math.min(xp, maxXP);
  };

  const actualProgress = adjustProgress(userInfo.xp);

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        <Title>Your Progress Dashboard</Title>
        <ProfileCard userInfo={userInfo} selectBadge={selectBadge} />
        <ProgressCard actualProgress={actualProgress} />
        <Card>
          <ProjectsGrid>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
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
              ))
            ) : (
              <SectionTitle>
                No relevant projects found based on your categories of interest
                and skills.
              </SectionTitle>
            )}
          </ProjectsGrid>
        </Card>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;

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
  height: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Card = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
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
