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
import { getAllProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import Link from "next/link";

export interface Project {
  id?: number;
  name: string;
  owner_id: number;
  owner_name?: string;
  description?: string;
  github_repo_url: string;
  project_image_url?: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  categories?: string[];
  skills?: string[];
}

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
          if (
            (!userFromAPI.skills || userFromAPI.skills.length === 0) &&
            (!userFromAPI.categories || userFromAPI.categories.length === 0)
          ) {
            router.push("/register");
          }
        })
        .catch(() => {
          setError("Failed to load user, please try again");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
      try {
        const projectData = await getAllProjects();
        setProjects(projectData);
      } catch (err) {
        setError("Failed to load projects, please try again");
      } finally {
        if (!user) {
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  function filterProjects(
    projects: Project[],
    categories: string[],
    skills: string[]
  ): Project[] {
    const calculateMatchScore = (project: Project): number => {
      const categoryMatches =
        project.categories?.filter((category) => categories.includes(category))
          .length || 0;

      const skillMatches =
        project.skills?.filter((skill) => skills.includes(skill)).length || 0;

      return categoryMatches + skillMatches;
    };

    return projects
      .filter((project) => {
        const matchesCategory =
          categories.length === 0 ||
          project.categories?.some((category) => categories.includes(category));
        const matchesSkill =
          skills.length === 0 ||
          project.skills?.some((skill) => skills.includes(skill));

        return matchesCategory && matchesSkill;
      })
      .sort((a, b) => {
        const scoreA = calculateMatchScore(a);
        const scoreB = calculateMatchScore(b);

        return scoreB - scoreA;
      });
  }

  const filteredProjects = userInfo
    ? filterProjects(projects, userInfo.categories || [], userInfo.skills || [])
    : [];

  const selectBadge = (xp: number): ReactElement | null => {
    let badgeColor = "";

    if (xp >= 1500) {
      badgeColor = "diamond";
    } else if (xp >= 1000) {
      badgeColor = "platinum";
    } else if (xp >= 750) {
      badgeColor = "gold";
    } else if (xp >= 500) {
      badgeColor = "silver";
    } else if (xp >= 200) {
      badgeColor = "bronze";
    } else if (xp >= 50) {
      badgeColor = "emerald";
    } else if (xp >= 20) {
      badgeColor = "sapphire";
    } else {
      badgeColor = "amethyst";
    }

    if (badgeColor) {
      return (
        <BadgeWrapper>
          <UserBadge color={badgeColor} />
        </BadgeWrapper>
      );
    }

    return null;
  };

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        {loading && <LoadingText>Loading user...</LoadingText>}

        {!loading && !error && userInfo ? (
          <>
            <Title>Your Progress Dashboard</Title>

            <ProfileCard userInfo={userInfo} selectBadge={selectBadge} />

            <ProgressCard userXP={userInfo.xp} />

            <Card>
              <SectionTitle>
                Here are some projects that match your interests and skills:
              </SectionTitle>

              <ProjectsGrid>
                {filteredProjects.map((project, index) => (
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
            </Card>

            {filteredProjects.length === 0 && (
              <SectionTitle>
                Looks like there are no projects that match your interests and
                skills. Why not have a look at the{" "}
                <StyledLink href="/projects">projects page</StyledLink> for
                other projects that may be of interest.
              </SectionTitle>
            )}
          </>
        ) : !loading && error ? (
          <ErrorText>User not found.</ErrorText>
        ) : null}
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
  margin-bottom: 0; /* Remove or reduce the margin here */
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
const BadgeWrapper = styled.div`
  text-align: center; /* Centers the text and the badge */
  margin-top: 10px;
  p {
    margin: 0; /* Removes default margin on paragraphs */
    font-size: 16px; /* Customize text size */
  }
  br {
    margin: 5px 0; /* Adjust the space between the two lines of text */
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
  text-align: center;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;
const StyledLink = styled(Link)`
  color: #1e90ff;
  text-decoration: underline;
  font-weight: bold;
  &:hover {
    color: #0c7cd5;
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
