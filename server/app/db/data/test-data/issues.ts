import { Issue } from "../../../types/table-data-types";

const issueRelations = [
  {
    project_name: "EcoTracker",
    created_by_username: "nxvafps",
    assigned_to_username: "genericuser1",
    issue: {
      title: "Carbon calculation bug",
      description:
        "The carbon calculation shows incorrect values for public transport",
      status: "open",
    },
  },
  {
    project_name: "EcoTracker",
    created_by_username: "nxvafps",
    assigned_to_username: "devcontributor",
    issue: {
      title: "Add cycling tracking feature",
      description:
        "Implement functionality to track cycling as a green transport option",
      status: "in_progress",
    },
  },
  {
    project_name: "AccessibilityHelper",
    created_by_username: "projectowner",
    assigned_to_username: null,
    issue: {
      title: "Screen reader compatibility",
      description: "Improve compatibility with common screen readers",
      status: "open",
    },
  },
];

export default issueRelations;
