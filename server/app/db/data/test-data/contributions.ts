import { Contribution } from "../../../types/table-data-types";

const contributionRelations = [
  {
    user_github_username: "genericuser1",
    project_name: "EcoTracker",
    contribution: {
      pull_request_url: "https://github.com/genericuser1/EcoTracker/pull/12",
      additions: 156,
      deletions: 24,
      total_changes: 180,
      status: "merged",
    },
  },
  {
    user_github_username: "devcontributor",
    project_name: "EcoTracker",
    contribution: {
      pull_request_url: "https://github.com/nxvafps/EcoTracker/pull/15",
      additions: 87,
      deletions: 5,
      total_changes: 92,
      status: "pending",
    },
  },
  {
    user_github_username: "newbie_coder",
    project_name: "AccessibilityHelper",
    contribution: {
      pull_request_url:
        "https://github.com/projectowner/AccessibilityHelper/pull/3",
      additions: 42,
      deletions: 0,
      total_changes: 42,
      status: "merged",
    },
  },
];

export default contributionRelations;
