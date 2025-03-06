"use client";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { getProjectById } from "@/app/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IssuesBox } from "@/app/components/projectIssues";

export default function ProjectDetails() {
  const { project_id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        const projectData = await getProjectById(project_id);
        console.log(projectData);

        setProject(projectData);
      } catch (err) {
        setError("Failed ");
      } finally {
        setLoading(false);
      }
    };

    if (project_id) {
      getProject();
    }
  }, [project_id]);

  return (
    <div>
      <NavBar />
      <div>
        {loading && <p>Loading project details...</p>}
        {error && <p>{error}</p>}
        {project && (
          <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <a
              href={project.github_repo_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
            <img src={project.project_image_url} alt={project.name} />
            <p>
              <strong>Owner name:</strong> {project.owner_name}
            </p>
            <p>
              <strong>Status:</strong> {project.status}
            </p>
            <p>
              <strong>Github link:</strong>
              <button
                onClick={() => window.open(project.github_repo_url, "_blank")}
              >
                Go to GitHub
              </button>
            </p>
            <p>
              <strong>Created at:</strong>{" "}
              {new Date(project.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated at:</strong>{" "}
              {new Date(project.updated_at).toLocaleString()}
            </p>
            <IssuesBox projectId={project_id} />
          </div>
        )}
      </div>
      <Footer />
    </div>
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
