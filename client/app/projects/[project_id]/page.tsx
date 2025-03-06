"use client";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import { getProjectById } from "@/app/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
      <div className="container mx-auto p-4">
        {loading && <p>Loading project details...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {project && (
          <div className="p-6 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-gray-700">{project.description}</p>
            <a
              href={project.github_repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              GitHub Repository
            </a>
            <img
              src={project.project_image_url}
              alt={project.name}
              className="w-full mt-4 rounded-lg"
            />
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
  owner_id: number;
  status: string;
  created_at: string;
}
