
declare module 'react-markdown' {
  import React from 'react';

  interface ReactMarkdownOptions {
    children: string;
    className?: string;
    components?: Record<string, React.ComponentType<any>>;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
  }

  const ReactMarkdown: React.FC<ReactMarkdownOptions>;
  export default ReactMarkdown;
}
