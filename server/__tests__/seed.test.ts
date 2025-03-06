import seed from "../app/db/seeds/seed";
import pool from "../app/db/";
import {
  createTables,
  dropTables,
} from "../app/db/seeds/utils/table-management";
import {
  insertUsers,
  insertSkills,
  insertLevels,
  insertCategories,
  insertUserSkills,
  insertUserCategories,
  insertUserLevels,
  insertProject,
  insertProjectSkills,
  insertProjectCategories,
  insertIssues,
  insertContribution,
} from "../app/db/seeds/utils/insert-data";
import { SeedData } from "../app/types/table-data-types";

jest.mock("../app/db/", () => {
  const mockClient = {
    query: jest.fn(),
    release: jest.fn(),
  };
  return {
    connect: jest.fn().mockResolvedValue(mockClient),
  };
});

jest.mock("../app/db/seeds/utils/table-management", () => ({
  createTables: jest.fn(),
  dropTables: jest.fn(),
}));

jest.mock("../app/db/seeds/utils/insert-data", () => ({
  insertUsers: jest.fn(),
  insertSkills: jest.fn(),
  insertLevels: jest.fn(),
  insertCategories: jest.fn(),
  insertUserSkills: jest.fn(),
  insertUserCategories: jest.fn(),
  insertUserLevels: jest.fn(),
  insertProject: jest.fn(),
  insertProjectSkills: jest.fn(),
  insertProjectCategories: jest.fn(),
  insertIssues: jest.fn(),
  insertContribution: jest.fn(),
}));

describe("seed function", () => {
  const mockSeedData: SeedData = {
    users: [
      {
        github_id: "test",
        github_username: "test",
        email: "test@test.com",
        password_hash: "hash",
        role: "developer",
        xp: 0,
        access_token: "token",
        refresh_token: "refresh",
        skills: [],
        categories: [],
      },
    ],
    skills: [{ name: "javascript" }],
    categories: [{ category_name: "education" }],
    userSkillsRelations: [
      { user_github_username: "test", skill_names: ["javascript"] },
    ],
    userCategoriesRelations: [
      { user_github_username: "test", category_names: ["education"] },
    ],
    userLevelRelations: [{ user_github_username: "test", level: 1 }],
    levels: [{ level: 1, name: "Beginner", xp_required: 0 }],
    projectRelations: [
      {
        owner_username: "test",
        project: {
          name: "test",
          github_repo_url: "url",
          status: "active",
          categories: [],
        },
      },
    ],
    projectSkillRelations: [
      { project_name: "test", skill_names: ["javascript"] },
    ],
    issueRelations: [
      {
        project_name: "test",
        created_by_username: "test",
        assigned_to_username: null,
        issue: { title: "test", description: "test", status: "open" },
      },
    ],
    contributionRelations: [
      {
        user_github_username: "test",
        project_name: "test",
        contribution: {
          pull_request_url: "url",
          additions: 0,
          deletions: 0,
          total_changes: 0,
          status: "merged",
        },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PGDATABASE = "test_db";
  });

  it("should call all database functions in the correct order", async () => {
    const mockClient = await pool.connect();

    await seed(mockSeedData);

    expect(mockClient.query).toHaveBeenCalledWith("BEGIN");

    expect(dropTables).toHaveBeenCalled();
    expect(createTables).toHaveBeenCalled();

    expect(insertSkills).toHaveBeenCalledWith(mockSeedData.skills);
    expect(insertCategories).toHaveBeenCalledWith(mockSeedData.categories);
    expect(insertLevels).toHaveBeenCalledWith(mockSeedData.levels);
    expect(insertUsers).toHaveBeenCalledWith(mockSeedData.users);

    expect(insertUserSkills).toHaveBeenCalledWith(
      mockSeedData.userSkillsRelations
    );
    expect(insertUserCategories).toHaveBeenCalledWith(
      mockSeedData.userCategoriesRelations
    );
    expect(insertUserLevels).toHaveBeenCalledWith(
      mockSeedData.userLevelRelations
    );
    expect(insertProject).toHaveBeenCalledWith(mockSeedData.projectRelations);
    expect(insertProjectSkills).toHaveBeenCalledWith(
      mockSeedData.projectSkillRelations
    );
    expect(insertProjectCategories).toHaveBeenCalledWith(
      mockSeedData.projectRelations
    );
    expect(insertIssues).toHaveBeenCalledWith(mockSeedData.issueRelations);
    expect(insertContribution).toHaveBeenCalledWith(
      mockSeedData.contributionRelations
    );

    expect(mockClient.query).toHaveBeenCalledWith("COMMIT");

    expect(mockClient.release).toHaveBeenCalled();
  });

  it("should handle errors correctly", async () => {
    const error = new Error("Database error");
    (dropTables as jest.Mock).mockRejectedValueOnce(error);

    const mockClient = await pool.connect();

    await expect(seed(mockSeedData)).rejects.toThrow("Database error");

    expect(mockClient.query).toHaveBeenCalledWith("BEGIN");
    expect(mockClient.query).not.toHaveBeenCalledWith("COMMIT");

    expect(mockClient.release).toHaveBeenCalled();
  });

  it("should log the correct database name", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    await seed(mockSeedData);

    expect(consoleSpy).toHaveBeenCalledWith("Seeding on test_db");
    expect(consoleSpy).toHaveBeenCalledWith("Database seeded successfully");

    consoleSpy.mockRestore();
  });
});
