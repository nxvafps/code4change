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

  return (
    <SearchContainer>
      <FilterLabel>Category:</FilterLabel>
      <Select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.category_name}>
            {category.category_name}
          </option>
        ))}
      </Select>

      <FilterLabel>Skill:</FilterLabel>
      <Select onChange={(e) => setSelectedSkill(e.target.value)}>
        <option value="">Select a skill</option>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.name}>
            {skill.name}
          </option>
        ))}
      </Select>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
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
