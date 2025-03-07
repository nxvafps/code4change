"use client";
import styled from "styled-components";
import Footer from "./components/Footer";
import Image from "next/image";
import code4changeLogo from "../public/newlogo.png";
import landingPageImage from "../public/Code4Change.webp";
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
      <ImageContainer>
        <BannerImage src={landingPageImage} alt="image of the world" />
      </ImageContainer>
      <MissionStatementContainer>
        <MissionStatement>
          Join a global community of developers to drive positive change.
          Contribute to open source projects that tackle real-world challenges,
          from education to disaster relief. Level up your expertise, earn
          recognition and make a lasting difference one commit at a time.
        </MissionStatement>
      </MissionStatementContainer>
      <ButtonContainer>
        <Link href="/login">
          <LoginButton />
        </Link>
        <Link href="/register">
          <RegisterButton />
        </Link>
      </ButtonContainer>
      <Footer />
    </LandingPageContainer>
  );
}

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
`;

const NavContainer = styled.div`
  display: flex;
  height: 12vh;
  width: 100%;
  margin-bottom: 30px;
`;

const LogoContainer = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35vh;
  padding-bottom: 15px;
  margin-bottom: 10px;
`;

const BannerImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

const LogoImage = styled(Image)`
  height: 100%;
  width: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  width: 100%;
  gap: 20px;
  padding: 10px;
`;

const MissionStatementContainer = styled.div`
  width: 100%;
  height: 20vh;
  max-width: 54rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 10px;
`;

const MissionStatement = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #4b5563;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;
