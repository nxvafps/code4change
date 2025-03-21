import request from "supertest";
import app from "../app/app";
import pool from "../app/db";
import runSeed from "../app/db/seeds/run-seed";
import categories from "../app/db/data/development-data/categories";
import { log } from "console";

describe("End to End Tests", () => {
  beforeEach(async () => {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Tests should only run in test environment");
    }
    await runSeed();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("User Routes", () => {
    describe("GET /api/users", () => {
      it("should return all users", async () => {
        const response = await request(app).get("/api/users").expect(200);

        expect(response.body).toHaveProperty("users");
        expect(Array.isArray(response.body.users)).toBe(true);

        expect(response.body.users.length).toBeGreaterThan(0);

        const user = response.body.users[0];
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("github_username");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("profile_picture");
        expect(user).toHaveProperty("role");
        expect(user).toHaveProperty("xp");
      });
    });

    describe("GET /api/users/:username", () => {
      it("should return a user when valid username is provided", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .get(`/api/users/${testUser}`)
          .expect(200);

        expect(response.body).toHaveProperty("user");
        expect(response.body.user.github_username).toBe(testUser);
        expect(response.body.user).toHaveProperty("email");
        expect(response.body.user).toHaveProperty("profile_picture");
        expect(response.body.user).toHaveProperty("role");
        expect(response.body.user).toHaveProperty("xp");
      });

      it("should return 404 when username is not found", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist_" + Date.now();

        const response = await request(app)
          .get(`/api/users/${nonExistentUser}`)
          .expect(404);

        expect(response.body).toHaveProperty("message", "User not found");
      });
    });

    describe("GET /api/users/:username/profile", () => {
      it("should return user profile with skills and categories", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .get(`/api/users/${testUser}/profile`)
          .expect(200);

        expect(response.body).toHaveProperty("user");
        expect(response.body.user.github_username).toBe(testUser);

        expect(response.body.user).toHaveProperty("skills");
        expect(Array.isArray(response.body.user.skills)).toBe(true);

        expect(response.body.user).toHaveProperty("categories");
        expect(Array.isArray(response.body.user.categories)).toBe(true);

        expect(response.body.user).toHaveProperty("level");
        expect(response.body.user).toHaveProperty("contributions");
        expect(Array.isArray(response.body.user.contributions)).toBe(true);
      });

      it("should return 404 when profile is not found", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist_" + Date.now();

        const response = await request(app)
          .get(`/api/users/${nonExistentUser}/profile`)
          .expect(404);

        expect(response.body).toHaveProperty("message", "User not found");
      });
    });

    describe("GET /api/users/:username/projects", () => {
      it("should return all projects for a user", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .get(`/api/users/${testUser}/projects`)
          .expect(200);

        expect(response.body).toHaveProperty("projects");
        expect(Array.isArray(response.body.projects)).toBe(true);

        if (response.body.projects.length > 0) {
          const project = response.body.projects[0];
          expect(project).toHaveProperty("id");
          expect(project).toHaveProperty("name");
          expect(project).toHaveProperty("description");
          expect(project).toHaveProperty("github_repo_url");
          expect(project).toHaveProperty("project_image_url");
          expect(project).toHaveProperty("owner_id");
          expect(project).toHaveProperty("status");
          expect(project).toHaveProperty("created_at");
          expect(project).toHaveProperty("updated_at");
          expect(project).toHaveProperty("owner_username");
          expect(project.owner_username).toBe(testUser);
          expect(project).toHaveProperty("skills");
          expect(Array.isArray(project.skills)).toBe(true);
          expect(project).toHaveProperty("categories");
          expect(Array.isArray(project.categories)).toBe(true);
        }
      });

      it("Should return an empty project array if the user has no projects", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser =
          allUsersResponse.body.users[allUsersResponse.body.users.length - 1]
            .github_username;

        const response = await request(app)
          .get(`/api/users/${testUser}/projects`)
          .expect(200);

        expect(response.body).toHaveProperty("projects");
        expect(Array.isArray(response.body.projects)).toBe(true);
      });

      it("Should return a 404 when the username is not found", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist" + Date.now();
        const response = await request(app)
          .get(`/api/users/${nonExistentUser}/projects`)
          .expect(404);
        expect(response.body).toHaveProperty("message", "User not found");
      });
    });

    describe("GET /api/users/:username/projects/:project_id", () => {
      it("should return a specific project for a user", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const projectsResponse = await request(app)
          .get(`/api/users/${testUser}/projects`)
          .expect(200);

        if (projectsResponse.body.projects.length > 0) {
          const testProject = projectsResponse.body.projects[0];

          const response = await request(app)
            .get(`/api/users/${testUser}/projects/${testProject.id}`)
            .expect(200);

          expect(response.body).toHaveProperty("project");
          expect(response.body.project.id).toBe(testProject.id);
          expect(response.body.project.name).toBe(testProject.name);
          expect(response.body.project.github_repo_url).toBe(
            testProject.github_repo_url
          );
          expect(response.body.project.owner_username).toBe(testUser);
          expect(response.body.project).toHaveProperty("skills");
          expect(Array.isArray(response.body.project.skills)).toBe(true);
          expect(response.body.project).toHaveProperty("categories");
          expect(Array.isArray(response.body.project.categories)).toBe(true);
        }
      });

      it("should return 404 when project is not found for user", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const nonExistentProjectId = 99999;
        const response = await request(app)
          .get(`/api/users/${testUser}/projects/${nonExistentProjectId}`)
          .expect(404);

        expect(response.body).toHaveProperty(
          "message",
          "Project not found for this user"
        );
      });

      it("should return 404 when user is not found", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist" + Date.now();
        const response = await request(app)
          .get(`/api/users/${nonExistentUser}/projects/1`)
          .expect(404);

        expect(response.body).toHaveProperty("message", "User not found");
      });

      it("should return 400 when project_id is not a number", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .get(`/api/users/${testUser}/projects/not-a-number`)
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Invalid project ID format"
        );
      });
    });

    describe("GET /api/users/:username/projects/:project_id/contributions", () => {
      it("should return an array of contributions for a specific project", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const projectsResponse = await request(app)
          .get(`/api/users/${testUser}/projects`)
          .expect(200);

        if (projectsResponse.body.projects.length > 0) {
          const testProject = projectsResponse.body.projects[0];

          const response = await request(app)
            .get(
              `/api/users/${testUser}/projects/${testProject.id}/contributions`
            )
            .expect(200);

          expect(response.body).toHaveProperty("contributions");
          expect(Array.isArray(response.body.contributions)).toBe(true);

          if (response.body.contributions.length > 0) {
            const contribution = response.body.contributions[0];
            expect(contribution).toHaveProperty("id");
            expect(contribution).toHaveProperty("user_id");
            expect(contribution).toHaveProperty("project_id");
            expect(contribution).toHaveProperty("pull_request_url");
            expect(contribution).toHaveProperty("additions");
            expect(contribution).toHaveProperty("deletions");
            expect(contribution).toHaveProperty("total_changes");
            expect(contribution).toHaveProperty("status");
            expect(contribution).toHaveProperty("created_at");
            expect(contribution).toHaveProperty("updated_at");
            expect(contribution).toHaveProperty("user_github_username");
          }
        }
      });

      it("should return an empty array if project exists but has no contributions", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const projectsResponse = await request(app)
          .get(`/api/users/${testUser}/projects`)
          .expect(200);

        if (projectsResponse.body.projects.length > 0) {
          const testProject =
            projectsResponse.body.projects[
              projectsResponse.body.projects.length - 1
            ];

          const response = await request(app)
            .get(
              `/api/users/${testUser}/projects/${testProject.id}/contributions`
            )
            .expect(200);

          expect(response.body).toHaveProperty("contributions");
          expect(Array.isArray(response.body.contributions)).toBe(true);
        }
      });

      it("should return 404 when project is not found for user", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const nonExistentProjectId = 99999;
        const response = await request(app)
          .get(
            `/api/users/${testUser}/projects/${nonExistentProjectId}/contributions`
          )
          .expect(404);

        expect(response.body).toHaveProperty(
          "message",
          "Project not found for this user"
        );
      });

      it("should return 404 when user is not found", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist" + Date.now();
        const response = await request(app)
          .get(`/api/users/${nonExistentUser}/projects/1/contributions`)
          .expect(404);

        expect(response.body).toHaveProperty("message", "User not found");
      });

      it("should return 400 when project_id is not a number", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .get(`/api/users/${testUser}/projects/not-a-number/contributions`)
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Invalid project ID format"
        );
      });
    });

    describe("GET /api/users/:username/contributions", () => {
      it("should return all contributions for a user", async () => {
        const allUserResponse = await request(app).get("/api/users");
        const testUser = allUserResponse.body.users[0].github_username;

        const response = await request(app)
          .get(`/api/users/${testUser}/contributions`)
          .expect(200);

        expect(response.body).toHaveProperty("contributions");
        expect(Array.isArray(response.body.contributions)).toBe(true);

        if (response.body.contributions.length > 0) {
          const contribution = response.body.contributions[0];
          expect(contribution).toHaveProperty("id");
          expect(contribution).toHaveProperty("user_id");
          expect(contribution).toHaveProperty("project_id");
          expect(contribution).toHaveProperty("pull_request_url");
          expect(contribution).toHaveProperty("additions");
          expect(contribution).toHaveProperty("deletions");
          expect(contribution).toHaveProperty("total_changes");
          expect(contribution).toHaveProperty("status");
          expect(contribution).toHaveProperty("created_at");
          expect(contribution).toHaveProperty("user_github_username");
          expect(contribution).toHaveProperty("project_name");
        }
      });

      it("it should return 404 when user is not found", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist" + Date.now();
        const response = await request(app)
          .get(`/api/users/${nonExistentUser}/contributions`)
          .expect(404);

        expect(response.body).toHaveProperty("message", "User not found");
      });
    });

    describe("POST api/users/:username/categories", () => {
      it("shoult add a category to user", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const categoryResponse = await request(app).get("/api/categories");
        const testCategories = categoryResponse.body.categories
          .slice(0, 2)
          .map((cat: any) => cat.category_name);

        const response = await request(app)
          .post(`/api/users/${testUser}/categories`)
          .send({ categories: testCategories })
          .expect(201);

        expect(response.body).toHaveProperty(
          "message",
          "Category is added successfully"
        );
        expect(response.body).toHaveProperty("categories");
        expect(Array.isArray(response.body.categories)).toBe(true);

        const profileResponse = await request(app)
          .get(`/api/users/${testUser}/profile`)
          .expect(200);

        testCategories.forEach((category: any) => {
          expect(profileResponse.body.user.categories).toContain(category);
        });
      });

      it("should return 400 when invalid category data is provided", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .post(`/api/users/${testUser}/categories`)
          .send({ categories: "not an array" })
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Bad request: categories must be an array"
        );

        const responseNoCategories = await request(app)
          .post(`/api/users/${testUser}/categories`)
          .send({})
          .expect(400);

        expect(responseNoCategories.body).toHaveProperty(
          "message",
          "Bad request: categories must be an array"
        );
      });

      it("should return 404 when user does not exist", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist_" + Date.now();

        const response = await request(app)
          .post(`/api/users/${nonExistentUser}/categories`)
          .send({ categories: ["Education", "Environment"] })
          .expect(404);

        expect(response.body).toHaveProperty("message", "User not found");
      });

      it("should return 400 when invalid category names are provided", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .post(`/api/users/${testUser}/categories`)
          .send({
            categories: ["NonexistentCategory1", "NonexistentCategory2"],
          })
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Invalid category names provided"
        );
      });
    });

    describe("POST api/users/:username/skills", () => {
      it("should add a skill to user", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const skillResponse = await request(app).get("/api/skills");

        const testSkills = skillResponse.body.skills
          .slice(0, 2)
          .map((sk: any) => sk.name);

        const response = await request(app)
          .post(`/api/users/${testUser}/skills`)
          .send({ skills: testSkills })
          .expect(201);

        expect(response.body).toHaveProperty(
          "message",
          "Skill is added successfully"
        );
        expect(response.body).toHaveProperty("skills");
        expect(Array.isArray(response.body.skills)).toBe(true);

        const profileResponse = await request(app)
          .get(`/api/users/${testUser}/profile`)
          .expect(200);

        testSkills.forEach((skill: any) => {
          expect(profileResponse.body.user.skills).toContain(skill);
        });
      });

      it("should return 400 when invalid skill data is provided", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .post(`/api/users/${testUser}/skills`)
          .send({ skills: "not an array" })
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Bad request: skills must be an array"
        );

        const responseNoSkills = await request(app)
          .post(`/api/users/${testUser}/skills`)
          .send({})
          .expect(400);

        expect(responseNoSkills.body).toHaveProperty(
          "message",
          "Bad request: skills must be an array"
        );
      });

      it("should return 404 when user does not exist", async () => {
        const nonExistentUser =
          "this_user_definitely_doesnt_exist_" + Date.now();

        const response = await request(app)
          .post(`/api/users/${nonExistentUser}/skills`)
          .send({ skills: ["JavaScript", "React"] })
          .expect(404);

        expect(response.body).toHaveProperty("message", "User not found");
      });

      it("should return 400 when invalid skill names are provided", async () => {
        const allUsersResponse = await request(app).get("/api/users");
        const testUser = allUsersResponse.body.users[0].github_username;

        const response = await request(app)
          .post(`/api/users/${testUser}/skills`)
          .send({
            skills: ["NonexistentSkill1", "NonexistentSkill2"],
          })
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Invalid skill name provided"
        );
      });
    });
  });

  describe("PATCH api/users/:username/categories", () => {
    it("should update a category to user", async () => {
      const allUsersResponse = await request(app).get("/api/users");
      const testUser = allUsersResponse.body.users[0].github_username;

      const categoryResponse = await request(app).get("/api/categories");
      const testCategories = categoryResponse.body.categories
        .slice(0, 2)
        .map((cat: any) => cat.category_name);

      const response = await request(app)
        .patch(`/api/users/${testUser}/categories`)
        .send({ categories: testCategories })
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Category updated successfully"
      );

      expect(response.body).toHaveProperty("categories");
      expect(Array.isArray(response.body.categories)).toBe(true);

      const profileResponse = await request(app)
        .get(`/api/users/${testUser}/profile`)
        .expect(200);

      testCategories.forEach((category: any) => {
        expect(profileResponse.body.user.categories).toContain(category);
      });
    });

    it("should return 400 when invalid category data is provided", async () => {
      const allUsersResponse = await request(app).get("/api/users");
      const testUser = allUsersResponse.body.users[0].github_username;

      const response = await request(app)
        .patch(`/api/users/${testUser}/categories`)
        .send({ categories: "not an array" })
        .expect(400);

      expect(response.body).toHaveProperty(
        "message",
        "Bad request: categories must be an array"
      );

      const responseNoCategories = await request(app)
        .patch(`/api/users/${testUser}/categories`)
        .send({})
        .expect(400);

      expect(responseNoCategories.body).toHaveProperty(
        "message",
        "Bad request: categories must be an array"
      );
    });
  });

  describe("PATCH api/users/:username/skills", () => {
    it("should update a skill to user", async () => {
      const allUsersResponse = await request(app).get("/api/users");
      const testUser = allUsersResponse.body.users[0].github_username;

      const skillResponse = await request(app).get("/api/skills");
      const testSkills = skillResponse.body.skills
        .slice(0, 2)
        .map((cat: any) => cat.name);

      const response = await request(app)
        .patch(`/api/users/${testUser}/skills`)
        .send({ skills: testSkills })
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Skills updated successfully"
      );

      expect(response.body).toHaveProperty("skills");
      expect(Array.isArray(response.body.skills)).toBe(true);

      const profileResponse = await request(app)
        .get(`/api/users/${testUser}/profile`)
        .expect(200);

      testSkills.forEach((skill: any) => {
        expect(profileResponse.body.user.skills).toContain(skill);
      });
    });

    it("should return 400 when invalid skill data is provided", async () => {
      const allUsersResponse = await request(app).get("/api/users");
      const testUser = allUsersResponse.body.users[0].github_username;

      const response = await request(app)
        .patch(`/api/users/${testUser}/skills`)
        .send({ categories: "not an array" })
        .expect(400);

      expect(response.body).toHaveProperty(
        "message",
        "Bad request: skills must be an array"
      );

      const responseNoSkills = await request(app)
        .patch(`/api/users/${testUser}/skills`)
        .send({})
        .expect(400);

      expect(responseNoSkills.body).toHaveProperty(
        "message",
        "Bad request: skills must be an array"
      );
    });
  });

  describe("Project Routes", () => {
    describe("GET /api/projects", () => {
      it("should return all projects", async () => {
        const response = await request(app).get("/api/projects").expect(200);
        expect(response.body).toHaveProperty("projects");
        expect(Array.isArray(response.body.projects)).toBe(true);
        expect(response.body.projects.length).toBeGreaterThan(0);

        const project = response.body.projects[0];

        expect(project).toHaveProperty("id");
        expect(project).toHaveProperty("name");
        expect(project).toHaveProperty("description");
        expect(project).toHaveProperty("github_repo_url");
        expect(project).toHaveProperty("project_image_url");
        expect(project).toHaveProperty("status");
      });
    });

    describe("GET /api/projects/:project_id", () => {
      it("should return a project when a valid project id is provided", async () => {
        const allProjects = await request(app).get("/api/projects").expect(200);
        const testProject = allProjects.body.projects[0].id;

        const response = await request(app)
          .get(`/api/projects/${testProject}`)
          .expect(200);

        expect(response.body).toHaveProperty("project");
        expect(response.body.project.id).toBe(testProject);
        expect(response.body.project).toHaveProperty("description");
        expect(response.body.project).toHaveProperty("github_repo_url");
        expect(response.body.project).toHaveProperty("project_image_url");
        expect(response.body.project).toHaveProperty("status");
        expect(response.body.project).toHaveProperty("owner_name");
      });

      it("should return 404 when project name is not found", async () => {
        const nonExistentProject = 9999;

        const response = await request(app)
          .get(`/api/projects/${nonExistentProject}`)
          .expect(404);

        expect(response.body).toHaveProperty("message", "project not found");
      });
    });
    describe("POST /api/projects", () => {
      it("should create a new project successfully", async () => {
        const projectData = {
          name: "EcoTracker",
          description: "An app to track and reduce your carbon footprint",
          github_repo_url: "https://github.com/genericuser1/Ecoker",
          project_image_url: "https://example.com/images/ecotracker.jpg",
          owner_id: 1,
          status: "active",
        };

        const response = await request(app)
          .post("/api/projects")
          .send(projectData)
          .expect(201);

        expect(response.body).toHaveProperty("project");
        expect(response.body.project).toHaveProperty("id");
        expect(response.body.project.name).toBe(projectData.name);
        expect(response.body.project.description).toBe(projectData.description);
        expect(response.body.project.github_repo_url).toBe(
          projectData.github_repo_url
        );
        expect(response.body.project.project_image_url).toBe(
          projectData.project_image_url
        );
        expect(response.body.project.owner_id).toBe(projectData.owner_id);
        expect(response.body.project.status).toBe(projectData.status);
      });

      it("should return 400 if the project data is incomplete", async () => {
        const incompleteData = {
          name: "EcoTracker",
          description: "test carbon footprint",
          github_repo_url: "https://github.com/genericuser1/EcoTracker",
          project_image_url: "https://example.com/images/ecotracker.jpg",
        };

        const response = await request(app)
          .post("/api/projects")
          .send(incompleteData)
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Bad request: missing fields"
        );
      });
      describe("GET /projects/:project_id/skills", () => {
        it("should return an array of skills for a valid project_id", async () => {
          const projectId = 1;
          const response = await request(app)
            .get(`/api/projects/${projectId}/skills`)
            .expect(200);

          expect(response.body).toHaveProperty("skills");
          expect(Array.isArray(response.body.skills)).toBe(true);
          expect(response.body.skills.length).toBeGreaterThan(0);

          const skill = response.body.skills[0];
          expect(skill).toHaveProperty("id");
          expect(skill).toHaveProperty("name");
        });
        it("should return 404 if the project has no  skills", async () => {
          const projectId = 99999;

          const response = await request(app)
            .get(`/api/projects/${projectId}/skills`)
            .expect(404);

          expect(response.body).toHaveProperty(
            "message",
            "No skills found for this project"
          );
        });

        it("should return 400 if project_id is not a number", async () => {
          const invalidProjectId = "abc";

          const response = await request(app)
            .get(`/api/projects/${invalidProjectId}/skills`)
            .expect(400);

          expect(response.body).toHaveProperty("message", "Bad request");
        });
      });
    });
    describe("GET /projects/:project_id/issues", () => {
      it("should return issues for a project", async () => {
        const projectId = 1;
        const response = await request(app)
          .get(`/api/projects/${projectId}/issues`)
          .expect(200);

        expect(response.body).toHaveProperty("issues");
        expect(Array.isArray(response.body.issues)).toBe(true);
      });

      it("should return an empty array for projects with no issues", async () => {
        const projectId = 9999;
        const response = await request(app)
          .get(`/api/projects/${projectId}/issues`)
          .expect(200);

        expect(response.body).toHaveProperty("issues");
        expect(Array.isArray(response.body.issues)).toBe(true);
        expect(response.body.issues.length).toBe(0);
      });
    });
    describe("GET /projects/:project_id/contributions", () => {
      it("should return all contributions for a project", async () => {
        const projectId = 1;
        const response = await request(app)
          .get(`/api/projects/${projectId}/contributions`)
          .expect(200);
        expect(response.body).toHaveProperty("contributions");
        expect(Array.isArray(response.body.contributions)).toBe(true);
      });
    });
    describe("DELETE /api/projects/:project_id", () => {
      it("should successfully delete the requested project and all associated issues", async () => {
        await request(app).delete("/api/projects/1").expect(204);
      });
      it("should return an error if the project does not exist", async () => {
        const response = await request(app)
          .delete("/api/projects/999")
          .expect(404);
        expect(response.body.error.message).toBe("Project not found");
      });
      it("should return a 404 if invalid data is given", async () => {
        const response = await request(app)
          .delete("/api/projects/eco")
          .expect(400);

        expect(response.body.error.message).toBe("Bad request");
      });
    });
  });
  describe("POST /api/projects/:projectName/skills", () => {
    it("should add skills to a project successfully and return the added skills", async () => {
      const projectName = "EcoTracker";
      const skillData = {
        skill_names: ["javascript", "typescript", "nodejs"],
      };

      const response = await request(app)
        .post(`/api/projects/${projectName}/skills`)
        .send(skillData)
        .expect(201);

      // Assert the response
      expect(response.body).toHaveProperty("skills");
      expect(response.body.skills).toEqual(skillData.skill_names);
    });

    it("should return 400 if skill_names is not an array", async () => {
      const projectName = "EcoTracker";
      const invalidSkillData = {
        skill_names: "javascript",
      };

      const response = await request(app)
        .post(`/api/projects/${projectName}/skills`)
        .send(invalidSkillData)
        .expect(400);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        "skill_names must be an array of skill names"
      );
    });
  });
  describe("Issues Routes", () => {
    describe("GET /api/issues", () => {
      it("should return an array of all issue objects", async () => {
        const response = await request(app).get("/api/issues").expect(200);

        expect(response.body).toHaveProperty("issues");
        expect(Array.isArray(response.body.issues)).toBe(true);
        expect(response.body.issues.length).toBeGreaterThan(0);

        const issue = response.body.issues[0];
        expect(issue).toHaveProperty("id");
        expect(issue).toHaveProperty("project_id");
        expect(issue).toHaveProperty("title");
        expect(issue).toHaveProperty("description");
        expect(issue).toHaveProperty("status");
        expect(issue).toHaveProperty("created_by");
        expect(issue).toHaveProperty("created_at");
        expect(issue).toHaveProperty("updated_at");
      });

      it("should return an empty array when there are no issues", async () => {
        const response = await request(app).get("/api/issues").expect(200);

        expect(response.body).toHaveProperty("issues");
        expect(Array.isArray(response.body.issues)).toBe(true);
        if (response.body.issues.length === 0) {
          expect(response.body.issues.length).toBe(0);
        }
      });
    });
    describe("Issues Routes", () => {
      describe("GET /api/issues/:id", () => {
        it("should return a single issue when a valid ID is provided", async () => {
          const allIssuesResponse = await request(app)
            .get("/api/issues")
            .expect(200);
          const testIssue = allIssuesResponse.body.issues[0];

          const response = await request(app)
            .get(`/api/issues/${testIssue.id}`)
            .expect(200);

          expect(response.body).toHaveProperty("issue");
          expect(response.body.issue).toHaveProperty("id", testIssue.id);
          expect(response.body.issue).toHaveProperty(
            "project_id",
            testIssue.project_id
          );
          expect(response.body.issue).toHaveProperty("title", testIssue.title);
          expect(response.body.issue).toHaveProperty(
            "description",
            testIssue.description
          );
          expect(response.body.issue).toHaveProperty(
            "status",
            testIssue.status
          );
          expect(response.body.issue).toHaveProperty("created_by_name");
          expect(response.body.issue).toHaveProperty("created_at");
          expect(response.body.issue).toHaveProperty("updated_at");
        });

        it("should return 404 when issue ID does not exist", async () => {
          const nonExistentId = 999999;

          const response = await request(app)
            .get(`/api/issues/${nonExistentId}`)
            .expect(404);

          expect(response.body).toHaveProperty("message", "Issue not found");
        });

        it("should return 400 when an invalid issue ID is provided", async () => {
          const invalidId = "abc";

          const response = await request(app)
            .get(`/api/issues/${invalidId}`)
            .expect(400);

          expect(response.body).toHaveProperty("message", "Invalid issue ID");
        });
      });
    });
    describe("POST /api/issues", () => {
      it("should create a new issue and return 201", async () => {
        const newIssue = {
          project_id: 1,
          title: "Fix login bug",
          description: "Users cannot log in with valid credentials.",
          status: "open",
          created_by: 1,
          assigned_to: 2,
        };

        const response = await request(app)
          .post("/api/issues")
          .send(newIssue)
          .expect(201);

        expect(response.body).toHaveProperty("issue");
        expect(response.body.issue).toHaveProperty("id");
        expect(response.body.issue.title).toBe(newIssue.title);
        expect(response.body.issue.status).toBe(newIssue.status);
      });

      it("should return 400 when missing required fields", async () => {
        const incompleteIssue = {
          title: "Incomplete issue",
          description: "This issue is missing required fields",
        };

        const response = await request(app)
          .post("/api/issues")
          .send(incompleteIssue)
          .expect(400);

        expect(response.body).toHaveProperty(
          "message",
          "Missing required fields"
        );
      });

      it("should return 400 when project_id is not a number", async () => {
        const invalidIssue = {
          project_id: "invalid_id",
          title: "Invalid ID test",
          description: "Testing with a non-numeric project_id",
          status: "open",
          created_by: 1,
        };

        const response = await request(app)
          .post("/api/issues")
          .send(invalidIssue)
          .expect(400);

        expect(response.body).toHaveProperty("message", "Invalid project_id");
      });

      it("should return 400 when created_by is not a number", async () => {
        const invalidIssue = {
          project_id: 1,
          title: "Invalid creator ID test",
          description: "Testing with a non-numeric created_by",
          status: "open",
          created_by: "not_a_number",
        };

        const response = await request(app)
          .post("/api/issues")
          .send(invalidIssue)
          .expect(400);

        expect(response.body).toHaveProperty("message", "Invalid created_by");
      });
    });
  });

  describe("Contributions Routes", () => {
    describe("GET api/contributions", () => {
      it("should return an array of all contributions", async () => {
        const result = await request(app).get("/api/contributions").expect(200);
        expect(result.body).toHaveProperty("contributions");
        expect(result.body.contributions.length).toBe(3);
        expect(Array.isArray(result.body.contributions)).toBe(true);
      });
      it("should return an array of contribution objects with the following properties", async () => {
        const result = await request(app).get("/api/contributions").expect(200);
        const contribution = result.body.contributions[0];
        expect(contribution).toHaveProperty("id");
        expect(contribution).toHaveProperty("user_id");
        expect(contribution).toHaveProperty("project_id");
        expect(contribution).toHaveProperty("pull_request_url");
        expect(contribution).toHaveProperty("additions");
        expect(contribution).toHaveProperty("deletions");
        expect(contribution).toHaveProperty("total_changes");
        expect(contribution).toHaveProperty("status");
        expect(contribution).toHaveProperty("created_at");
        expect(contribution).toHaveProperty("updated_at");
      });
    });
  });

  describe("Skills Routes", () => {
    describe("GET /api/skills", () => {
      it("should return an array of all skill objects", () => {
        return request(app)
          .get("/api/skills")
          .expect(200)
          .then((response) => {
            expect(response.body).toHaveProperty("skills");
            expect(Array.isArray(response.body.skills)).toBe(true);
            expect(response.body.skills.length).toBe(14);
          });
      });
      it("should return skills object with the correct properties", () => {
        return request(app)
          .get("/api/skills")
          .expect(200)
          .then((response) => {
            const skill = response.body.skills[0];
            expect(skill).toHaveProperty("id");
            expect(skill).toHaveProperty("name");
            expect(skill).toHaveProperty("created_at");
            expect(skill).toHaveProperty("updated_at");
          });
      });
    });
  });

  describe("Categories Routes", () => {
    describe("GET /api/categories", () => {
      it("should return an array of all category objects", async () => {
        const response = await request(app).get("/api/categories").expect(200);
        expect(response.body).toHaveProperty("categories");
        expect(Array.isArray(response.body.categories)).toBe(true);
        expect(response.body.categories.length).toBe(8);
      });
      it("should return an error if a non-exsistent path is requested", async () => {
        const response = await request(app).get("/api/categoriez").expect(404);
        expect(response.body.message).toBe("Route not found");
      });
    });
  });

  describe("Leaderboard Routes", () => {});
});

// describe("DELETE /api/users/:username", () => {
//   test("should respond with a 204 and delete the user, returning an empty body", () => {
//     const username = "genericuser1";

//     return request(app)
//       .delete(`/api/users/${username}`)
//       .expect(204)
//       .then((response) => {
//         expect(response.body).toEqual({});
//       });
//   });

// test("should respond with a 404 when user does not exist, and return message 'user not found'", () => {
//   const nonExistentGithubId = "999";

//   return request(app)
//     .delete(`/api/users/${nonExistentGithubId}`)
//     .expect(404)
//     .then((response) => {
//       expect(response.body).toEqual({ error: "user not found" });
//     });
// });

// test("should respond with a 204 and delete the user, and ensure the user no longer exists", () => {
//   const github_id = "50117659";

//   return request(app)
//     .delete(`/api/users/${github_id}`)
//     .expect(204)
//     .then(() => {
//       return pool.query("SELECT * FROM users WHERE github_id = $1", [
//         github_id,
//       ]);
//     })
//     .then(({ rows: userRows }) => {
//       expect(userRows.length).toBe(0);
//     });
// });
// });
