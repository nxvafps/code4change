"use client";
import styled from "styled-components";
import Footer from "./components/Footer";
import Image from "next/image";
import coverImage from "../public/Code4Change.webp";
import { LoginButton, RegisterButton } from "./components/button";
import Link from "next/link";

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: var (--background);
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35vh;
  padding-bottom: 15px;
`;

const BannerImage = styled(Image)`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
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
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MissionStatement = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #4b5563;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const ProjectsCarouselContainer = styled.div`
  border: solid 1px red;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 25vh;
  width: 100%;
`;

export default function Home() {
  return (
    <LandingPageContainer>
      <ImageContainer>
        <BannerImage src={coverImage} alt="image of the world" />
      </ImageContainer>
      <ButtonContainer>
        <Link href="/login">
          <LoginButton />
        </Link>
        <Link href="/register">
          <RegisterButton />
        </Link>
      </ButtonContainer>
      <MissionStatementContainer>
        <MissionStatement>
          Join a global community of developers using their skills to drive
          positive change. Contribute to open source projects that tackle
          real-world challenges, from education to disaster relief. Level up
          your expertise, earn recognition and make a lasting difference one
          commit at a time.
        </MissionStatement>
      </MissionStatementContainer>
      <ProjectsCarouselContainer>Project Carousel</ProjectsCarouselContainer>

      <Footer />
    </LandingPageContainer>
  );
}
