import styled from "styled-components";

export default function IssuesCard({ issue }) {
  return (
    <IssueContainer>
      <Title>{issue.title}</Title>
      <IssueInfo>
        <InfoRow>
          <Label>Description:</Label>
          <Value>{issue.description}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Status:</Label>
          <Value>{issue.status}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Created_at:</Label>
          <Value>{new Date(issue.created_at).toLocaleString()}</Value>
        </InfoRow>
      </IssueInfo>
    </IssueContainer>
  );
}

const IssueContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-width: 800px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.lg} auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
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

const IssueInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.dark}40;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const InfoRow = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark}40;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accent.main};
  margin-right: ${({ theme }) => theme.spacing.sm};
  min-width: 100px;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
`;

const IssueLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;
