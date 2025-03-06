import styled from "styled-components";
import { Contribution as BaseContribution } from "../../../server/app/types/table-data-types";

interface Contribution extends BaseContribution {
  project_name: string;
}

interface ContributionsCardProps {
  contribution: Contribution;
}

export default function ContributionsCard({
  contribution,
}: ContributionsCardProps) {
  return (
    <ContributionsContainer>
      <ContributionInfoText>
        <strong>Project Name: </strong> {contribution.project_name}
        <strong>Total Changes: </strong>
        {contribution.total_changes}
        <strong>Additions: </strong>
        {contribution.additions}
        <strong>Deletions: </strong>
        {contribution.deletions}
        <strong>Status: </strong> {contribution.status}
        <strong>Pull Request: </strong>
        <ContributionLink
          href={contribution.pull_request_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Pull Request
        </ContributionLink>
      </ContributionInfoText>
    </ContributionsContainer>
  );
}

const ContributionsContainer = styled.section`
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 1.5rem auto;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ContributionInfoText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #333;
  border: solid 1px purple;
  border-radius: 20px;
  padding: 1rem;
`;

const ContributionLink = styled.a`
  color: #0070f3;
  text-decoration: none;
`;
