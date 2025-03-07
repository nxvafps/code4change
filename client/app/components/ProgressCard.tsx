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
  max-width: 800px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #555;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 40px;
  background: linear-gradient(90deg, #28a745, #1e7e34);
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressText = styled.span`
  color: #fff;
  font-weight: bold;
`;
