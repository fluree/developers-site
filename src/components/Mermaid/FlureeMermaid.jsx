import React from 'react';
import { Mermaid } from 'mdx-mermaid/Mermaid';
import { mermaidTheme } from './mermaidTheme';

let didInit = false;

export const FlureeMermaid = ({ chart }) => {
  const config = didInit ? undefined : mermaidTheme;
  didInit = true;

  return <Mermaid config={config} chart={chart} />;
};
