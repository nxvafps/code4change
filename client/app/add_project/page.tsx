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
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  border: solid 1px purple;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 10px;
`;

const StyledButton = styled.button`
  background-color: #4b525e;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 150px;
  height: 40px;
  &:hover {
    background-color: #7e839c;
  }
`;

const LandingPageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 1rem;
  background-color: var(--background);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-right: 1rem;
  width: 150px;
  text-align: right;
`;

const InputField = styled.input`
  padding: 0.8rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
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
import { useState } from "react";
import { postProject, postissuebyproject } from "@/app/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { IssuesMap } from "../issues_post/issuespost";
export default function AddProject() {
  const { user }: AuthContextType = useAuth();
  const userId = user?.id;

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    github_repo_url: "",
    project_image_url: "",
    owner_id: userId || 1,
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
      await IssuesMap(projectData.github_repo_url, newProject.id, userId || 1);
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
    <div>
      <NavBar />
      <LandingPageContainer>
        <Title>Share your amazing project with the community below!</Title>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <FormField>
                <Label htmlFor="projectName">Project Name:</Label>
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
                <Label htmlFor="githubUrl">GitHub URL:</Label>
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
                <Label htmlFor="projectDescription">Project Description:</Label>
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
                <Label htmlFor="projectImage">Project Image URL:</Label>
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
                <StyledButton type="submit">Submit</StyledButton>
              </ButtonContainer>
            </fieldset>
          </form>
          {isSubmitted && <>Project posted successfully!</>}
        </FormContainer>
      </LandingPageContainer>
      <Footer />
    </div>
  );
}
