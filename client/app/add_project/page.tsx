"use client";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 100%;

  height: 40vh;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  gap: 20px;
  padding: 10px;
`;

const StyledButton = styled.button`
  background-color: #4b525e;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 150px;
  height: 30px;
  &:hover {
    background-color: #7e839c;
  }
`;

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

export default function AddProject() {
  return (
    <div>
      <NavBar />
      <LandingPageContainer>
        <FormContainer>
          <form>
            <br></br>
            <input type="text" name="name" placeholder="Project name" />
            <br></br>
            <br></br>
            <input type="text" name="name" placeholder="GitHub Url" />
            <br></br>
            <br></br>
            <input type="text" name="name" placeholder="Project description" />
            <br></br>
            <br></br>
            <input type="text" name="name" placeholder="Category" />
            <br></br>
            <br></br>
            <input type="text" name="name" placeholder="Project_img url" />
            <br></br>
            <br></br>
            <input type="text" name="name" placeholder="Skills" />
            <br></br>
            <br></br>
            <ButtonContainer>
              <StyledButton type="submit">Submit</StyledButton>
            </ButtonContainer>
          </form>
        </FormContainer>
      </LandingPageContainer>
      <Footer />
    </div>
  );
}
