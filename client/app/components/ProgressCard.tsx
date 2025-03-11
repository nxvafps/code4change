import React from "react";
import styled from "styled-components";

interface ProgressCardProps {
  userXP: number;
}

interface Level {
  level: number;
  name: string;
  xp_required: number;
}

const levels: Level[] = [
  { level: 1, name: "Beginner", xp_required: 0 },
  { level: 2, name: "Explorer", xp_required: 20 },
  { level: 3, name: "Developer", xp_required: 50 },
  { level: 4, name: "Contributor", xp_required: 100 },
  { level: 5, name: "Champion", xp_required: 200 },
  { level: 6, name: "Expert", xp_required: 350 },
  { level: 7, name: "Master", xp_required: 500 },
  { level: 8, name: "Guru", xp_required: 750 },
  { level: 9, name: "Legend", xp_required: 1000 },
  { level: 10, name: "Visionary", xp_required: 1500 },
];

const ProgressCard: React.FC<ProgressCardProps> = ({ userXP }) => {
  const currentLevel = levels
    .filter((level) => userXP >= level.xp_required)
    .pop();

  const nextLevel = levels.find((level) => userXP < level.xp_required);

  const xpToNextLevel = nextLevel ? nextLevel.xp_required - userXP : 0;

  const xpAtCurrentLevel = currentLevel ? userXP - currentLevel.xp_required : 0;

  const xpRequiredForCurrentLevel = currentLevel
    ? nextLevel
      ? nextLevel.xp_required - currentLevel.xp_required
      : 0
    : 0;

  const progress =
    xpRequiredForCurrentLevel === 0
      ? 100
      : Math.min((xpAtCurrentLevel / xpRequiredForCurrentLevel) * 100, 100);

  return (
    <Card>
      <SectionTitle>Your XP Progress and Current Level</SectionTitle>
      <ProgressWrapper>
        <ProgressBar $progress={progress}></ProgressBar>
      </ProgressWrapper>

      <SectionTitle>
        <ProgressText>
          {userXP} / {nextLevel?.xp_required} XP
        </ProgressText>
        {currentLevel && (
          <CurrentLevel>
            Level: {currentLevel.level} ({currentLevel.name})
          </CurrentLevel>
        )}

        {nextLevel && (
          <NextLevel>
            {xpToNextLevel > 0
              ? `You need ${xpToNextLevel} more XP to reach level ${nextLevel.level} (${nextLevel.name})`
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
  height: 40px; /* Ensure wrapper has a height */
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.primary.dark}
  );
  width: ${(props) => props.$progress}%;
  transition: width ${({ theme }) => theme.transitions.fast};
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
