export interface User {
  id?: number;
  github_id: string;
  github_username: string;
  email: string;
  password_hash: string;
  profile_picture?: string;
  role: string;
  xp: number;
  created_at?: Date;
  updated_at?: Date;
  access_token: string;
  refresh_token: string;
  skills: string[];
  categories: string[];
  projectSkills?: ProjectSkill[];
  userLevels?: UserLevel[];
}

export interface Category {
  id?: number;
  category_name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Skill {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Level {
  id?: number;
  level: number;
  name: string;
  xp_required: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Project {
  id?: number;
  name: string;
  owner_id: number;
  description?: string;
  github_repo_url: string;
  project_image_url?: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCategory {
  id?: number;
  user_id: number;
  category_id: number;
  created_at?: Date;
}

export interface UserSkill {
  id?: number;
  user_id: number;
  skill_id: number;
  created_at?: Date;
}

export interface Issue {
  id?: number;
  project_id: number;
  title: string;
  description?: string;
  status: string;
  created_by: number;
  assigned_to?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Contribution {
  id?: number;
  user_id?: number;
  project_id?: number;
  pull_request_url: string;
  additions: number;
  deletions: number;
  total_changes: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProjectSkill {
  id?: number;
  project_id: number;
  skill_id: number;
  created_at?: Date;
}

export interface UserLevel {
  id?: number;
  user_id: number;
  level_id: number;
  achieved_at?: Date;
}
export interface UserSkillsRelation {
  user_github_username: string;
  skill_names: string[];
}

export interface UserCategoriesRelation {
  user_github_username: string;
  category_names: string[];
}

export interface UserLevelRelation {
  user_github_username: string;
  level: number;
}

export interface ProjectRelation {
  owner_username: string;
  project: {
    name: string;
    description?: string;
    github_repo_url: string;
    project_image_url?: string;
    status: string;
  };
}

export interface ProjectSkillRelation {
  project_name: string;
  skill_names: string[];
}

export interface ContributionRelation {
  user_github_username: string;
  project_name: string;
  contribution: {
    pull_request_url: string;
    additions: number;
    deletions: number;
    total_changes: number;
    status: string;
  };
}

export interface IssueRelation {
  project_name: string;
  created_by_username: string;
  assigned_to_username: string | null;
  issue: {
    title: string;
    description: string;
    status: string;
  };
}

export interface SeedData {
  users: User[];
  skills: Skill[];
  categories: Category[];
  userSkillsRelations: UserSkillsRelation[];
  userCategoriesRelations: UserCategoriesRelation[];
  userLevelRelations: UserLevelRelation[];
  levels: Level[];
  projectRelations: ProjectRelation[];
  projectSkillRelations: ProjectSkillRelation[];
  issueRelations: IssueRelation[];
  contributionRelations: ContributionRelation[];
}
