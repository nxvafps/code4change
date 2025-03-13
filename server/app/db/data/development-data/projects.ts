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
  {
    owner_username: "refactor-ninja",
    project: {
      name: "PawHelp",
      description:
        "PawHelp is dedicated to reuniting lost pets with their owners. The project connects pet owners, local communities, shelters, and volunteers to help locate and recover missing animals. By utilizing technology and community-driven efforts, PawHelp seeks to reduce the number of lost pets and ensure they return home safely.",
      github_repo_url: "https://github.com/refactor-ninja/PawHelp",
      project_image_url: "",
      status: "active",
      categories: ["animalWelfare"],
    },
  },
  {
    owner_username: "refactor-ninja",
    project: {
      name: "EduBridge",
      description:
        "EduBridge is dedicated to providing accessible, inclusive, and supportive educational resources for LGBTQIA+ individuals. The project aims to bridge the gap in educational opportunities and help foster a safe and empowering learning environment for people of all sexual orientations and gender identities.",
      github_repo_url: "https://github.com/refactor-ninja/EduBridge",
      project_image_url: "",
      status: "active",
      categories: ["education", "lgbtqia", "accessibility"],
    },
  },
  {
    owner_username: "refactor-ninja",
    project: {
      name: "ReliefNet",
      description:
        "ReliefNe provides real-time alerts, critical information, and humanitarian aid coordination for disaster zones worldwide. By leveraging live data sources, AI-driven analytics, and community-driven reporting, ReliefNet ensures that affected individuals, first responders, and relief organizations receive timely, accurate, and actionable information to improve disaster response efforts.",
      github_repo_url: "https://github.com/refactor-ninja/ReliefNet",
      project_image_url: "",
      status: "active",
      categories: ["healthcare", "worldConflict", "disasterRelief"],
    },
  },
];

export default projectRelations;
