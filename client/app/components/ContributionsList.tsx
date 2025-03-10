import ContributionsCard from "./ContributionsCard";
import styled from "styled-components";
import { Contribution as BaseContribution } from "../../../server/app/types/table-data-types";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchContributionsByUsername } from "../api";

export default function ContributionsList() {
  interface Contribution extends BaseContribution {
    project_name: string;
  }

  const { username } = useParams<{ username: string }>();

  const [contributions, setContributions] = useState<Contribution[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContributionsByUsername(username)
      .then((contributionsFromApi) => {
        setContributions(contributionsFromApi);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load, please try again");
        setLoading(false);
      });
  }, [username]);

  if (loading) return <LoadingText>Loading contributions...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;
  if (!contributions || contributions.length === 0)
    return <EmptyMessage>No contributions found</EmptyMessage>;

  return (
    <ContributionsSection>
      <SectionTitle>Contributions</SectionTitle>
      <ListContainer>
        {contributions.map((contribution) => (
          <ContributionsCard
            key={contribution.id}
            contribution={contribution}
          />
        ))}
      </ListContainer>
    </ContributionsSection>
  );
}

const ContributionsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const LoadingText = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ErrorText = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.background.dark}40;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;
