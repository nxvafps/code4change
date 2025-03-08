import { ProjectRelation } from "../../../types/table-data-types";

const projectRelations: ProjectRelation[] = [
  {
    owner_username: "user1",
    project: {
      name: "EcoTracker",
      description: "An app to track and reduce your carbon footprint",
      github_repo_url: "https://github.com/nxvafps/EcoTracker",
      project_image_url: "",
      status: "active",
      categories: ["climateChange", "education"],
    },
  },
  {
    owner_username: "projectowner",
    project: {
      name: "AccessibilityHelper",
      description: "A toolkit for making websites more accessible",
      github_repo_url: "https://github.com/projectowner/AccessibilityHelper",
      project_image_url: "",
      status: "active",
      categories: ["accessibility", "education"],
    },
  },
  {
    owner_username: "projectowner",
    project: {
      name: "RefugeeConnect",
      description:
        "Platform connecting volunteers with refugee support initiatives",
      github_repo_url: "https://github.com/projectowner/RefugeeConnect",
      project_image_url: "",
      status: "planning",
      categories: ["worldConflict", "disasterRelief"],
    },
  },
];

export default projectRelations;
