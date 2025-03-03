import { Project } from "../../seeds/utils/table-management";

const projectRelations = [
  {
    owner_username: "nxvafps",
    project: {
      name: "EcoTracker",
      description: "An app to track and reduce your carbon footprint",
      github_repo_url: "https://github.com/nxvafps/EcoTracker",
      project_image_url: "https://example.com/images/ecotracker.jpg",
      status: "active",
    },
  },
  {
    owner_username: "projectowner",
    project: {
      name: "AccessibilityHelper",
      description: "A toolkit for making websites more accessible",
      github_repo_url: "https://github.com/projectowner/AccessibilityHelper",
      project_image_url: "https://example.com/images/accessibility.jpg",
      status: "active",
    },
  },
  {
    owner_username: "projectowner",
    project: {
      name: "RefugeeConnect",
      description:
        "Platform connecting volunteers with refugee support initiatives",
      github_repo_url: "https://github.com/projectowner/RefugeeConnect",
      project_image_url: "https://example.com/images/refugee-connect.jpg",
      status: "planning",
    },
  },
];

export default projectRelations;
