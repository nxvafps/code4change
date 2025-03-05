import request from "supertest";
import app from "../app/app";
import pool from "../app/db";
import runSeed from "../app/db/seeds/run-seed";

describe("End to End Tests", () => {
  beforeAll(async () => {
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
        console.log(testProject);
        const response = await request(app)
          .get(`/api/projects/${testProject}`)
          .expect(200);

        expect(response.body).toHaveProperty("project");
        expect(response.body.project.id).toBe(testProject);
        expect(response.body.project).toHaveProperty("description");
        expect(response.body.project).toHaveProperty("github_repo_url");
        expect(response.body.project).toHaveProperty("project_image_url");
        expect(response.body.project).toHaveProperty("status");
        expect(response.body.project).toHaveProperty("owner_id");
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

      it("should return 404 if no issues found for the project", async () => {
        const projectId = 9999;
        const response = await request(app)
          .get(`/api/projects/${projectId}/issues`)
          .expect(404);

        expect(response.body).toHaveProperty(
          "message",
          "No issues found for this project."
        );
      });
    });
  });

  describe("Issues Routes", () => {});

  describe("Contributions Routes", () => {
    describe("GET /contributions", () => {
      it("should return an array of all contributions", async () => {
        const result = await request(app).get("/contributions").expect(200);
        expect(result.body).toHaveProperty("contributions");
        expect(result.body.contributions.length).toBe(3);
        expect(Array.isArray(result.body.contributions)).toBe(true);
      });
      it("should return an array of contribution objects with the following properties", async () => {
        const result = await request(app).get("/contributions").expect(200);
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
