import { postissuebyproject, getIssesByProject } from "../api";

export const IssuesMap = async () => {
  try {
    const allissues = await getIssesByProject();
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
          project_id: 2,
          title: issue.title,
          description: issue.body || "no description",
          status: issue.state,
          created_by: 6,
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
