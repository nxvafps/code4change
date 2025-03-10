"use client";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-top: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CopyrightText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export default function Footer() {
  return (
    <FooterContainer>
      <CopyrightText>Code4Change, 2025. All rights reserved</CopyrightText>
    </FooterContainer>
  );
}
