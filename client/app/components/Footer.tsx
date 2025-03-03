"use client";
import styled from "styled-components";

const FooterContainer = styled.footer`
  border: solid 1px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const CopyrightText = styled.p`
  font-size: 14px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <CopyrightText>Code4Change, 2025. All rights reserved</CopyrightText>
    </FooterContainer>
  );
}
