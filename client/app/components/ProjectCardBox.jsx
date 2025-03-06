"use client";

import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import { getAllProjects } from "../api";
import { useEffect, useState } from "react";
export default function ProjectCardBox() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getAllProjects();
        setProjects(projectData);
      } catch (err) {
        setError("Failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>All Projects</h1>

      {loading && <p>Loading projects...</p>}

      {error && <p>{error}</p>}

      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        <Container>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project_id={project.id}
              owner={project.owner_name}
              name={project.name}
              description={project.description}
              github_repo_url={project.github_repo_url}
              project_image={project.project_image_url}
              status={project.status}
            />
          ))}
        </Container>
      )}
    </div>
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
