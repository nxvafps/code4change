import cron from "node-cron";
import pool from "../db";
import GitHubService from "./github-service";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

async function fetchAndStoreGitHubData() {
  console.log("Starting GitHub data fetch job...");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const projectsResult = await client.query(`
      SELECT p.id, p.github_repo_url, u.access_token 
      FROM projects p
      JOIN users u ON p.owner_id = u.id
      WHERE p.github_repo_url IS NOT NULL AND p.github_repo_url != ''
    `);

    const projects = projectsResult.rows;
    console.log(`Found ${projects.length} projects to process`);

    for (const project of projects) {
      const {
        id: projectId,
        github_repo_url: repoUrl,
        access_token: token,
      } = project;

      if (!token) {
        console.log(
          `Skipping project ${projectId} - no access token available`
        );
        continue;
      }

      const githubService = new GitHubService(token);

      const pullRequests = await githubService.fetchPullRequests(repoUrl);
      console.log(
        `Fetched ${pullRequests.length} pull requests for project ${projectId}`
      );

      for (const pr of pullRequests) {
        if (pr.merged_at) {
          const userId = await getUserIdFromGithubUsername(
            client,
            pr.user.login
          );

          if (userId) {
            await client.query(
              `
              INSERT INTO contributions 
              (user_id, project_id, pull_request_url, additions, deletions, total_changes, status)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (pull_request_url) 
              DO UPDATE SET 
                status = $7,
                additions = $4,
                deletions = $5,
                total_changes = $6,
                updated_at = NOW()
            `,
              [
                userId,
                projectId,
                pr.html_url,
                pr.additions || 0,
                pr.deletions || 0,
                (pr.additions || 0) + (pr.deletions || 0),
                pr.merged_at
                  ? "merged"
                  : pr.state === "closed"
                  ? "rejected"
                  : "pending",
              ]
            );
          }
        }
      }

      const issues = await githubService.fetchIssues(repoUrl);
      console.log(`Fetched ${issues.length} issues for project ${projectId}`);

      for (const issue of issues) {
        const createdByUserId = await getUserIdFromGithubUsername(
          client,
          issue.user.login
        );
        let assignedToUserId = null;

        if (issue.assignee) {
          assignedToUserId = await getUserIdFromGithubUsername(
            client,
            issue.assignee.login
          );
        }

        if (!createdByUserId) continue;

        const existingIssueResult = await client.query(
          `SELECT id FROM issues WHERE title = $1 AND project_id = $2`,
          [issue.title, projectId]
        );

        if (existingIssueResult.rows.length > 0) {
          await client.query(
            `
            UPDATE issues 
            SET status = $1, description = $2, assigned_to = $3, updated_at = NOW()
            WHERE id = $4
          `,
            [
              issue.state,
              issue.body || "",
              assignedToUserId,
              existingIssueResult.rows[0].id,
            ]
          );
        } else {
          await client.query(
            `
            INSERT INTO issues 
            (project_id, title, description, status, created_by, assigned_to)
            VALUES ($1, $2, $3, $4, $5, $6)
          `,
            [
              projectId,
              issue.title,
              issue.body || "",
              issue.state,
              createdByUserId,
              assignedToUserId,
            ]
          );
        }
      }
    }

    await client.query("COMMIT");
    console.log("GitHub data fetch job completed successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in GitHub data fetch job:", error);
  } finally {
    client.release();
  }
}

async function getUserIdFromGithubUsername(client: any, username: string) {
  try {
    const result = await client.query(
      "SELECT id FROM users WHERE github_username = $1",
      [username]
    );

    return result.rows.length > 0 ? result.rows[0].id : null;
  } catch (error) {
    console.error(
      `Error finding user ID for GitHub username ${username}:`,
      error
    );
    return null;
  }
}

export function startCronJobs() {
  console.log("Setting up GitHub data fetch cron job");
  cron.schedule("0 0 * * *", fetchAndStoreGitHubData);
}

export { fetchAndStoreGitHubData };
