"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchCategories, fetchSkills } from "../api";

interface Category {
  id: number;
  category_name: string;
}

interface Skill {
  id: number;
  name: string;
}

interface SearchBarProps {
  setSelectedCategory: (category: string) => void;
  setSelectedSkill: (skill: string) => void;
}

export default function SearchBar({
  setSelectedCategory,
  setSelectedSkill,
}: SearchBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [localCategory, setLocalCategory] = useState<string>("");
  const [localSkill, setLocalSkill] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesFromAPI = await fetchCategories();
        const skillsFromAPI = await fetchSkills();
        setCategories(categoriesFromAPI);
        setSkills(skillsFromAPI);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    setSelectedCategory(localCategory);
    setSelectedSkill(localSkill);
  };

  return (
    <SearchContainer>
      <FilterLabel>Category:</FilterLabel>
      <Select
        value={localCategory}
        onChange={(e) => setLocalCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </Select>

      <FilterLabel>Skill:</FilterLabel>
      <Select
        value={localSkill}
        onChange={(e) => setLocalSkill(e.target.value)}
      >
        <option value="">Select a skill</option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.name}>
            {skill.name}
          </option>
        ))}
      </Select>
      <ApplyButton onClick={handleSubmit}>Apply Filters</ApplyButton>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 250px;
  margin-top: 165px;
`;

const FilterLabel = styled.label`
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.light};
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border.dark};
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  appearance: none;
  outline: none;
  margin-bottom: 10px;
`;

const ApplyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: none;
  cursor: pointer;
  width: 100%;
`;
