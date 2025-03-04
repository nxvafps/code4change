import styled from "styled-components";
import Link from "react";

export default function ProjectCard({
  project_id,
  owner,
  name,
  description,
  github_repo_url,
  project_image,
  status,
}) {
  return (
    <Card>
      <ProjectImage src={project_image} />
      <MetaContainer>
        <MetaBox>{name}</MetaBox>
        <MetaBox>{owner}</MetaBox>
        <MetaBox>Category</MetaBox>
        <MetaBox>{status}</MetaBox>
      </MetaContainer>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  padding: 10px;
  gap: 10px;
`;

const ProjectImage = styled.img`
  height: 50px;
  width: 50px;
`;

const MetaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  padding: 10px;
  gap: 10px;
`;

const MetaBox = styled.div`
  border: solid 1px;
  border-radius: 10px;
  padding: 10px;
  min-width: 120px;
`;
