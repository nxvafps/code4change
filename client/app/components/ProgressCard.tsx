// ProgressCard.tsx
"use client";

import React from "react";
import styled from "styled-components";

interface ProgressCardProps {
  actualProgress: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ actualProgress }) => {
  return (
    <Card>
      <SectionTitle>Progress Bar - Total XP</SectionTitle>
      <ProgressWrapper>
        <ProgressBar progress={actualProgress * 0.1}>
          <ProgressText>{actualProgress} XP</ProgressText>
        </ProgressBar>
      </ProgressWrapper>
    </Card>
  );
};

export default ProgressCard;

// Styled components for ProgressCard
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
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 40px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.primary.dark}
  );
  width: ${(props) => props.progress}%;
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
