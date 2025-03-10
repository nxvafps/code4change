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
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  font-weight: bold;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
`;

const ApplyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
  width: 150px;
`;
