import React from "react";
import styled from "styled-components";
import Link from "next/link";

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

  const xpRequiredForCurrentLevel = nextLevel
    ? nextLevel.xp_required - (currentLevel?.xp_required || 0)
    : 0;

  const progress = xpRequiredForCurrentLevel
    ? Math.min((xpAtCurrentLevel / xpRequiredForCurrentLevel) * 100, 100)
    : 100;

  return (
    <Card>
      <Title>Your XP Progress and Current Level</Title>

      <Spacer />
      <Spacer />

      {currentLevel && (
        <ProgressTextWrapper>
          <ProgressText>
            Level {currentLevel.level} ({currentLevel.name}): {xpAtCurrentLevel}{" "}
            / {xpRequiredForCurrentLevel} XP
          </ProgressText>
        </ProgressTextWrapper>
      )}

      <ProgressWrapper>
        <ProgressBar $progress={progress}></ProgressBar>
      </ProgressWrapper>

      {nextLevel && (
        <ProgressTextWrapper>
          <NextLevel>
            {xpToNextLevel > 0
              ? `You need ${xpToNextLevel} more XP to reach level ${nextLevel.level} (${nextLevel.name})`
              : `You have reached the highest level! Congratulations`}
            <Spacer></Spacer>
            Learn more about levels on the{" "}
            <StyledLink href="/leaderboard"> leaderboard page</StyledLink>
          </NextLevel>
        </ProgressTextWrapper>
      )}
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

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: 0; /* Remove or reduce the margin here */
  text-align: center;
  color: ${({ theme }) => theme.colors.text.light};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const ProgressTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProgressText = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  padding: ${({ theme }) => theme.spacing.sm};
`;

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: ${({ theme }) => theme.spacing.md};
  height: 40px;
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

const NextLevel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: white;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Spacer = styled.div`
  height: ${({ theme }) => theme.spacing.md};
`;

const StyledLink = styled(Link)`
  color: #1e90ff;
  text-decoration: underline;
  font-weight: bold;
  &:hover {
    color: #0c7cd5;
  }
`;
