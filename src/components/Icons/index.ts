import type { SVGProps } from "react";

export * from "./ArrowPathIcon";
export * from "./ArrowsUpDownIcon";
export * from "./ClockIcon";
export * from "./CodeIcon";
export * from "./SettingsIcon";
export * from "./TableIcon";
export * from "./ArrowTopRightOnBoxIcon";

export type IconProps = Pick<SVGProps<SVGSVGElement>, "height" | "width"> & {
  color?: string;
};
