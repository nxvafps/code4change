"use client";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import styled from "styled-components";

const FormContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 54rem;
  display: flex;
  flex-direction: column;
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
  height: 40px;
  &:hover {
    background-color: #7e839c;
  }
`;

const LandingPageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 1rem;
  background-color: var(--background);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-right: 1rem;
  width: 150px;
  text-align: right;
`;

const InputField = styled.input`
  padding: 0.8rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
`;

export default function AddProject() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <NavBar />
      <LandingPageContainer>
        <Title>Share your amazing project with the community below!</Title>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <FormField>
                <Label htmlFor="projectName">Project Name:</Label>
                <InputField
                  id="projectName"
                  type="text"
                  name="projectName"
                  placeholder="My Awesome Project"
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="githubUrl">GitHub URL:</Label>
                <InputField
                  id="githubUrl"
                  type="text"
                  name="githubUrl"
                  placeholder="https://github.com/my-project"
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="projectDescription">Project Description:</Label>
                <InputField
                  id="projectDescription"
                  type="text"
                  name="projectDescription"
                  placeholder="This is a description of my project"
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="category">Category:</Label>
                <InputField
                  id="category"
                  type="text"
                  name="category"
                  placeholder="Accessibility"
                  required
                />
              </FormField>
              <FormField>
                <Label htmlFor="projectImage">Project Image URL:</Label>
                <InputField
                  id="projectImage"
                  type="text"
                  name="projectImage"
                  placeholder="https://example.com/image.jpg"
                />
              </FormField>
              <FormField>
                <Label htmlFor="skills">Skills:</Label>
                <InputField
                  id="skills"
                  type="text"
                  name="skills"
                  placeholder="JavaScript, React"
                  required
                />
              </FormField>
              <ButtonContainer>
                <StyledButton type="submit">Submit</StyledButton>
              </ButtonContainer>
            </fieldset>
          </form>
        </FormContainer>
      </LandingPageContainer>
      <Footer />
    </div>
  );
}
