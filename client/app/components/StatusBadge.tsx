import styled from "styled-components";

interface BadgeProps {
  status?: string;
}

const Badge = styled.span<BadgeProps>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  ${({ status, theme }) => {
    switch (status) {
      case "active":
        return `
          background-color: rgba(${theme.colors.status.success}, 0.6);
          color: ${theme.colors.status.success};
        `;
      case "completed":
        return `
          background-color: rgba(${theme.colors.primary.main}, 0.2);
          color: ${theme.colors.primary.main};
        `;
      case "on-hold":
        return `
          background-color: rgba(${theme.colors.status.warning}, 0.2);
          color: ${theme.colors.status.warning};
        `;
      case "planning":
        return `
          background-color: rgba(${theme.colors.status.info}, 0.2);
          color: ${theme.colors.status.info};
        `;
      default:
        return `
          background-color: rgba(${
            theme.colors.text.secondary || theme.colors.text.light
          }, 0.2);
          color: ${theme.colors.text.secondary || theme.colors.text.light};
        `;
    }
  }}
`;

interface StatusBadgeProps {
  status?: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge status={status}>{status || "Unknown"}</Badge>;
}
