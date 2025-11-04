import React from "react";
import { Mermaid } from "mdx-mermaid/Mermaid";
import { mermaidTheme } from "./mermaidTheme";

export const FlureeMermaid = ({ chart }) => {
	return <Mermaid config={mermaidTheme} chart={chart} />;
};
