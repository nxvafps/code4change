"use client";

import { useState } from "react";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";

export default function ProjectCardBox() {
  return (
    <Container>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project_id={project.project_id}
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
  align-items: stretch;
  gap: 10px;
  width: 100vw;
  padding: 20px;
`;
