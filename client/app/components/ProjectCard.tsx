import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import defaultProjectImage from "../../public/default-project.jpg";

interface ProjectCardProps {
  project_id?: number;
  owner?: string;
  name: string;
  description?: string;
  github_repo_url?: string;
  project_image?: string;
  status: string;
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
`;

const ProjectImage = styled(Image)`
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.light};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectOwner = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.light};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-grow: 1;

  /* Handle text overflow */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ViewDetails = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const GithubLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
export default function ProjectCard({
  project_id,
  owner,
  name,
  description,
  github_repo_url,
  project_image,
  status,
}: ProjectCardProps) {
  return (
    <Card>
      <ImageContainer>
        <ProjectImage
          src={project_image || defaultProjectImage}
          alt={name}
          fill
          priority
        />
      </ImageContainer>
      <CardContent>
        <ProjectTitle>{name}</ProjectTitle>
        <ProjectOwner>By {owner || "Anonymous"}</ProjectOwner>
        <StatusBadge status={status} />
        <ProjectDescription>{description}</ProjectDescription>
        <LinksContainer>
          <ViewDetails href={`/projects/${project_id}`}>
            View Details
          </ViewDetails>
          {github_repo_url && (
            <GithubLink
              href={github_repo_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> Code
            </GithubLink>
          )}
        </LinksContainer>
      </CardContent>
    </Card>
  );
}
