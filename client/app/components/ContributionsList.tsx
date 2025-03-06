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
  }, []);

  return (
    <ListContainer>
      {contributions?.map((contribution) => (
        <ContributionsCard key={contribution.id} contribution={contribution} />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  border: solid 1px green;
  width: 90%;
  margin-top: 10px;
`;
