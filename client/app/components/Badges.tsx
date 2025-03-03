"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const colorMap: Record<string, string> = {
  gold: "gold",
  silver: "silver",
  bronze: "#cd7f32",
  platinum: "#e5e4e2",
  diamond: "#b9f2ff",
};

const BadgeIcon = styled.div`
  color: ${(props) => props.color};
`;

type BadgeProps = {
  color: string;
};

const UserBadge = ({ color }: BadgeProps) => {
  const badgeColor = colorMap[color];
  const size = "fa-4x";
  return (
    <BadgeIcon color={badgeColor}>
      <FontAwesomeIcon icon={faShieldAlt} className={size} />
    </BadgeIcon>
  );
};

export default UserBadge;
