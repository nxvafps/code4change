"use client";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 54rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  width: auto;
  min-width: 120px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  height: 48px;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
  }
`;

const LandingPageContainer = styled.div`
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

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.md} 0;
  width: 100%;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.border.dark}50,
      transparent
    );
  }

  &:last-of-type:after {
    display: none;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.light};
`;

const InputField = styled.input`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  color: ${({ theme }) => theme.colors.text.light};
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary.main}30`};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

type User = {
  id: number;
  github_username: string;
  email: string;
  role: string;
  profile_picture?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
};

const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.primary.light};
  margin-top: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => `${theme.colors.primary.dark}30`};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 100%;
  justify-content: center;

  &:before {
    content: "✓";
    font-weight: bold;
  }
`;

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

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


import { useState } from "react";
import { postProject, postissuebyproject } from "@/app/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { IssuesMap } from "../issues_post/issuespost";
export default function AddProject() {
  const { user }: AuthContextType = useAuth();

  const UserId = user?.id;

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    github_repo_url: "",
    project_image_url: "",
    owner_id: 6,
    status: "active",
  });
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newProject = await postProject(projectData);
      await IssuesMap();
      setIsSubmitted(true);
      setProjectData({
        name: "",
        description: "",
        github_repo_url: "",
        project_image_url: "",
        owner_id: 1,
        status: "active",
      });
      setTimeout(() => {
        router.push(`/projects/${newProject.id}`);
      }, 1200);
    } catch (error) {
      console.error("Error submitting project", error);
      alert("Failed to add project.");
    }
  };

  return (
    <PageWrapper>
      <NavBar />
      <LandingPageContainer>
        <Title>Share your amazing project with the community</Title>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <StyledFieldset>
              <FormField>
                <Label htmlFor="projectName">Project Name</Label>
                <InputField
                  id="projectName"
                  type="text"
                  name="name"
                  placeholder="My Awesome Project"
                  required
                  value={projectData.name}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <InputField
                  id="githubUrl"
                  type="text"
                  name="github_repo_url"
                  placeholder="https://github.com/my-project"
                  required
                  value={projectData.github_repo_url}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <Label htmlFor="projectDescription">Project Description</Label>
                <InputField
                  id="projectDescription"
                  type="text"
                  name="description"
                  placeholder="This is a description of my project"
                  required
                  value={projectData.description}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <Label htmlFor="projectImage">Project Image URL</Label>
                <InputField
                  id="projectImage"
                  type="text"
                  name="project_image_url"
                  placeholder="https://example.com/image.jpg"
                  value={projectData.project_image_url}
                  onChange={handleChange}
                />
              </FormField>
              <ButtonContainer>
                <StyledButton type="submit">Submit Project</StyledButton>
              </ButtonContainer>
            </StyledFieldset>
          </form>
          {isSubmitted && (
            <SuccessMessage>Project posted successfully!</SuccessMessage>
          )}
        </FormContainer>
      </LandingPageContainer>
      <Footer />
    </PageWrapper>
  );
}
