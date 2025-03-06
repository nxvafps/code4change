"use client";

import { getIssuesByProjectId } from "./../api";
import { useState, useEffect } from "react";

export function IssuesBox({ projectId }: any) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issuesData = await getIssuesByProjectId(projectId);
        setIssues(issuesData);
      } catch (err) {
        setError("Failed");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [projectId]);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h2>Project Issues</h2>
      {loading && <p>Loading issues...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && issues.length === 0 && <p>No issues found.</p>}
      <ul>
        {issues.map((issue: Issue) => (
          <li
            key={issue.id}
            style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
          >
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <p>
              <strong>Status:</strong> {issue.status}
            </p>
            <p>
              <strong>Created by:</strong> {issue.created_by}
            </p>
            <p>
              <strong>Assigned to:</strong> {issue.assigned_to}
            </p>
            <p>
              <strong>Created at:</strong>{" "}
              {new Date(issue.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Updated at:</strong>{" "}
              {new Date(issue.updated_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export interface Issue {
  id?: number;
  project_id?: number;
  title: string;
  description?: string;
  status: string;
  created_by?: number;
  assigned_to?: number;
  created_at: Date;
  updated_at: Date;
}
