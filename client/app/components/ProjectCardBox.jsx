"use client";

import { useState } from "react";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";

export default function ProjectCardBox() {
  const [projects, setProjects] = useState([
    {
      owner_username: "nxvafps",
      project: {
        name: "EcoTracker",
        description: "An app to track and reduce your carbon footprint",
        github_repo_url: "https://github.com/nxvafps/EcoTracker",
        project_image_url: "https://example.com/images/ecotracker.jpg",
        status: "active",
      },
    },
    {
      owner_username: "projectowner",
      project: {
        name: "AccessibilityHelper",
        description: "A toolkit for making websites more accessible",
        github_repo_url: "https://github.com/projectowner/AccessibilityHelper",
        project_image_url: "https://example.com/images/accessibility.jpg",
        status: "active",
      },
    },
    {
      owner_username: "projectowner",
      project: {
        name: "RefugeeConnect",
        description:
          "Platform connecting volunteers with refugee support initiatives",
        github_repo_url: "https://github.com/projectowner/RefugeeConnect",
        project_image_url: "https://example.com/images/refugee-connect.jpg",
        status: "planning",
      },
    },
  ]);

  return (
    <Container>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project_id={project.id}
          owner={project.owner_username}
          name={project.project.name}
          description={project.project.description}
          github_repo_url={project.project.github_repo_url}
          project_image={project.project.project_image_url}
          status={project.project.status}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100vw;
  padding: 20px;
`;
