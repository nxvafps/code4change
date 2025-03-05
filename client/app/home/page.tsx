"use client";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
//import { useState } from "react";

export default function HomePage() {
  /*const [user, setUser] = useState({
    github_id: “23456789”,
    github_username: “devcontributor”,
    email: “devcontributor@example.com”,
    xp: 135,
    role: “developer”,
    profile_picture: “https://randomuser.me/api/portraits/women/42.jpg”,
    skills: [“javascript”, “react”, “node”, “express”],
    categories: [“education”, “accessibility”, “healthcare”],
  });*/
  return (
    <div>
      <NavBar />
      <LandingPageContainer>
        <form>
          <FormContainerUser>
            <div>
              <h3>Hi "User"{}, time to make a difference</h3>
              <br></br>
              <UserInfo>
                <Image src="" alt="bage" />

                <Text>Progress bar</Text>
              </UserInfo>
            </div>
          </FormContainerUser>
          <FormContainer>
            <div>
              <br></br>
              <p>Suggested projects based onskillset</p>
            </div>
          </FormContainer>
        </form>
      </LandingPageContainer>
      <Footer />
    </div>
  );
}

const LandingPageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 40%;
  left: 40%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 10vh;
  padding: 1rem;

  background-color: var(--background);
`;

const FormContainerUser = styled.div`
  width: 100%;

  height: 20vh;
  display: flex;
  max-width: 54rem;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  border: solid 1px purple;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  width: 100%;

  height: 20vh;
  display: flex;
  max-width: 54rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  border-radius: 0.5rem;
  border: solid 1px purple;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: raws;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1px;
`;

const Text = styled.p`
  font-size: 1rem;
`;
