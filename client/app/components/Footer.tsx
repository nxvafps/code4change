"use client";
import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(to right, #000000, #1c1c1c); /* Black gradient */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem 0;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CopyrightText = styled.p`
  font-size: 0.875rem;
  color: #ffffff;
  font-weight: 500;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <CopyrightText>Code4Change, 2025. All rights reserved</CopyrightText>
    </FooterContainer>
  );
}
