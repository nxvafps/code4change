"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Select, { MultiValue, ActionMeta } from "react-select";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import {
  fetchCategories,
  fetchSkills,
  updateUserCategories,
  updateUserSkills,
} from "../api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

interface Option {
  value: string;
  label: string;
}

const PageWrapper = styled.div`
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
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  max-width: 68rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.light};
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.light};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.light};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.8;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  border: none;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
  }
`;

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: "#2a2a2a",
    borderColor: state.isFocused ? "#6C5CE7" : "#444",
    boxShadow: state.isFocused ? "0 0 0 1px #6C5CE7" : "none",
    "&:hover": {
      borderColor: "#6C5CE7",
    },
    borderRadius: "0.375rem",
    padding: "0.25rem",
  }),
  menu: (base: any) => ({
    ...base,
    background: "#2a2a2a",
    border: "1px solid #444",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
    borderRadius: "0.375rem",
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isFocused ? "#3a3a3a" : "#2a2a2a",
    color: state.isSelected ? "#6C5CE7" : "#fff",
    "&:hover": {
      background: "#3a3a3a",
    },
    cursor: "pointer",
  }),
  multiValue: (base: any) => ({
    ...base,
    background: "#6C5CE780",
    borderRadius: "0.25rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#fff",
    "&:hover": {
      background: "#6C5CE7",
      color: "#fff",
    },
  }),
  input: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#aaa",
  }),
};

export default function Register() {
  const [categories, setCategories] = useState<Option[]>([]);
  const [skills, setSkills] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, skillsData] = await Promise.all([
          fetchCategories(),
          fetchSkills(),
        ]);

        const categoryOptions = categoriesData.map((category: any) => ({
          value: category.category_name,
          label: formatCategoryName(category.category_name),
        }));

        const skillOptions = skillsData.map((skill: any) => ({
          value: skill.name,
          label: formatSkillName(skill.name),
        }));

        setCategories(categoryOptions);
        setSkills(skillOptions);
      } catch (err) {
        setError(
          "Failed to load categories and skills. Please try again later."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCategoryName = (name: string) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str: string) => str.toUpperCase());
  };

  const formatSkillName = (name: string) => {
    if (name.toLowerCase() === "reactjs") return "ReactJS";
    if (name.toLowerCase() === "nextjs") return "NextJS";
    if (name.toLowerCase() === "nodejs") return "NodeJS";

    return name.replace(/^./, (str) => str.toUpperCase());
  };

  const handleCategoryChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    setSelectedCategories([...newValue]);
  };

  const handleSkillChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    setSelectedSkills([...newValue]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to complete registration");
      return;
    }

    const username = user.github_username;
    const skillsList = selectedSkills.map((option) => option.value);
    const categoriesList = selectedCategories.map((option) => option.value);

    try {
      setIsSubmitting(true);
      setError("");

      const [skillsResponse, categoriesResponse] = await Promise.all([
        updateUserSkills(username, skillsList),
        updateUserCategories(username, categoriesList),
      ]);

      console.log("Registration complete:", {
        skills: skillsResponse.skills,
        categories: categoriesResponse.categories,
      });

      router.push("/home");
    } catch (error) {
      console.error("Error submitting registration:", error);
      setError("Failed to save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <NavBar />
      <ContentWrapper>
        <Title>Complete Your Registration</Title>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>Select Your Interests</SectionTitle>
              <SectionDescription>
                Choose categories that align with the causes you care about.
                This helps us recommend relevant projects.
              </SectionDescription>

              {loading ? (
                <p>Loading categories...</p>
              ) : (
                <Select
                  isMulti
                  name="categories"
                  options={categories}
                  className="categories-select"
                  placeholder="Search and select categories..."
                  onChange={handleCategoryChange}
                  styles={selectStyles}
                />
              )}
            </FormSection>

            <FormSection>
              <SectionTitle>Your Skills</SectionTitle>
              <SectionDescription>
                Select technologies and languages you're proficient in. This
                helps match you with projects where your skills are needed.
              </SectionDescription>

              {loading ? (
                <p>Loading skills...</p>
              ) : (
                <Select
                  isMulti
                  name="skills"
                  options={skills}
                  className="skills-select"
                  placeholder="Search and select skills..."
                  onChange={handleSkillChange}
                  styles={selectStyles}
                />
              )}
            </FormSection>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Complete Registration"}
            </SubmitButton>
          </Form>
        </FormContainer>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
}
