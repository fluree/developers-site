import React from "react";
import type { FC } from "react";
import type { IconProps } from ".";

export const CodeIcon: FC<IconProps> = ({
  height = 24,
  width = 24,
  color = "#00A0D1",
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color}
      style={{ position: "relative", bottom: 8 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  );
};
