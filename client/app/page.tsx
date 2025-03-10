"use client";
import styled from "styled-components";
import Footer from "./components/Footer";
import Image from "next/image";
import code4changeLogo from "../public/logo.svg";
import landingPageImage from "../public/code4change_d.jpg";
import { LoginButton, RegisterButton } from "./components/button";
import Link from "next/link";

export default function Home() {
  return (
    <LandingPageContainer>
      <NavContainer>
        <LogoContainer>
          <LogoImage src={code4changeLogo} alt={"image of logo"} />
        </LogoContainer>
        <Title>Code4Change</Title>
      </NavContainer>
      <ContentWrapper>
        <ImageContainer>
          <BannerImage src={landingPageImage} alt="image of the world" />
        </ImageContainer>
        <MissionStatementContainer>
          <MissionStatement>
            Join a global community of developers to drive positive change.
            Contribute to open source projects that tackle real-world
            challenges, from education to disaster relief. Level up your
            expertise, earn recognition and make a lasting difference one commit
            at a time.
          </MissionStatement>
        </MissionStatementContainer>
        <ButtonContainer>
          <Link href="/login">
            <AuthButton>Get Started</AuthButton>
          </Link>
        </ButtonContainer>
      </ContentWrapper>
      <Footer />
    </LandingPageContainer>
  );
}

const AuthButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 200px;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;

const LandingPageContainer = styled.div`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background.dark},
    #151515
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.main`
  display: flex;
  position: relative;
  margin: ${({ theme }) => theme.spacing.lg} auto;
  max-width: 68rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 15vh;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
  max-width: 68rem;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  overflow: visible;
`;

const Title = styled.h1`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.light};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45vh;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
`;

const BannerImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

const LogoImage = styled(Image)`
  height: 70px;
  width: 70px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const MissionStatementContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const MissionStatement = styled.p`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.6;
`;
