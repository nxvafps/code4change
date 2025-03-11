import { Octokit } from "octokit";
import pool from "../db";

class GitHubService {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({
      auth: token,
    });
  }

  private extractOwnerAndRepo(
    url: string
  ): { owner: string; repo: string } | null {
    try {
      const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
      const match = url.match(regex);
      if (match && match.length === 3) {
        return {
          owner: match[1],
          repo: match[2].replace(".git", ""),
        };
      }
      return null;
    } catch (error) {
      console.error("Error extracting owner and repo from URL:", error);
      return null;
    }
  }

  async fetchPullRequests(repoUrl: string): Promise<any[]> {
    try {
      const repoInfo = this.extractOwnerAndRepo(repoUrl);
      if (!repoInfo) {
        return [];
      }

      const { owner, repo } = repoInfo;

      const { data } = await this.octokit.rest.pulls.list({
        owner,
        repo,
        state: "all",
        per_page: 100,
      });

      return data;
    } catch (error) {
      console.error(`Error fetching pull requests for ${repoUrl}:`, error);
      return [];
    }
  }

  async fetchIssues(repoUrl: string): Promise<any[]> {
    try {
      const repoInfo = this.extractOwnerAndRepo(repoUrl);
      if (!repoInfo) {
        return [];
      }

      const { owner, repo } = repoInfo;

      const { data } = await this.octokit.rest.issues.listForRepo({
        owner,
        repo,
        state: "all",
        per_page: 100,
      });

      return data.filter((issue: any) => !issue.pull_request);
    } catch (error) {
      console.error(`Error fetching issues for ${repoUrl}:`, error);
      return [];
    }
  }
}

export default GitHubService;
