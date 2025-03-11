import React from "react";
import styled from "styled-components";

interface ProgressCardProps {
  actualProgress: number;
}

const LEVELS = [
  { level: "Contributor", xp: 1 },
  { level: "Active Contributor", xp: 50 },
  { level: "Top Contributor", xp: 250 },
  { level: "Open Source Champion", xp: 500 },
  { level: "Code4Change Legend", xp: 1000 },
];

const ProgressCard: React.FC<ProgressCardProps> = ({ actualProgress }) => {
  actualProgress = 100;
  const currentLevel = LEVELS.find((level) => actualProgress >= level.xp);

  const nextLevel = LEVELS.find((level) => actualProgress < level.xp);

  const xpToNextLevel = nextLevel ? nextLevel.xp - actualProgress : 0;

  const progress = Math.min(actualProgress * 0.1, 100);

  return (
    <Card>
      <SectionTitle>Your XP Progress and Current Level </SectionTitle>
      <ProgressWrapper>
        <ProgressBar $progress={progress}></ProgressBar>
      </ProgressWrapper>

      <SectionTitle>
        <ProgressText>{actualProgress} / 1000 XP</ProgressText>
        {currentLevel && (
          <CurrentLevel>Level: {currentLevel.level}</CurrentLevel>
        )}

        {nextLevel && (
          <NextLevel>
            {xpToNextLevel > 0
              ? `You need ${xpToNextLevel} more XP to reach ${nextLevel.level}`
              : `You have reached the highest level! Congratulations`}
          </NextLevel>
        )}
      </SectionTitle>
    </Card>
  );
};

export default ProgressCard;
const Card = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 40px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.primary.dark}
  );
  width: ${(props) => props.$progress}%;
  transition: width ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressText = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const CurrentLevel = styled.p`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const NextLevel = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: white;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
