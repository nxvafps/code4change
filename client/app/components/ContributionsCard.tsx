import styled from "styled-components";

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

type Contribution = {
  project_name: string;
  contribution: {
    pull_request_url: string;
    additions: number;
    deletions: number;
    total_changes: number;
    status: string;
  };
};

interface ContributionsCardProps {
  userContributions: Contribution[];
  username: string;
}

export default function ContributionsCard({
  userContributions,
  username,
}: ContributionsCardProps) {
  return (
    <ContributionsContainer>
      <Title>{username}'s contributions</Title>
      {userContributions.length > 0 ? (
        userContributions.map((contribution, index) => (
          <ContributionInfoText key={index}>
            <strong>Project Name: </strong> {contribution.project_name}
            <br />
            <strong>Total Changes: </strong>
            {contribution.contribution.total_changes}
            <br />
            <strong>Additions: </strong>
            {contribution.contribution.additions}
            <br />
            <strong>Deletions: </strong>
            {contribution.contribution.deletions}
            <br />
            <strong>Status: </strong> {contribution.contribution.status}
            <br />
            <strong>Pull Request: </strong>
            <ContributionLink
              href={contribution.contribution.pull_request_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Pull Request
            </ContributionLink>
          </ContributionInfoText>
        ))
      ) : (
        <ContributionInfoText>No contributions yet.</ContributionInfoText>
      )}
    </ContributionsContainer>
  );
}
