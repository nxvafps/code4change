import { postissuebyproject, getIssesByProject } from "../api";

export const IssuesMap = async (
  githubUrl: string,
  created_by: number,
  projectId: number
) => {
  try {
    const allissues = await getIssesByProject(githubUrl);
    const posteachissue = allissues.map(
      async (issue: {
        project_id: number;
        title: string;
        body: string;
        state: string;
        created_by: number;
        assignee: number | null;
      }) => {
        const postobject = {
          project_id: projectId,
          title: issue.title,
          description: issue.body || "no description",
          status: issue.state,
          created_by: created_by,
          assigned_to: issue.assignee || null,
        };

        await postissuebyproject(postobject);
      }
    );
    const postallissues = await Promise.all(posteachissue);

    return postallissues;
  } catch (error) {
    console.error("Error mapping issues", error);
    throw error;
  }
};
