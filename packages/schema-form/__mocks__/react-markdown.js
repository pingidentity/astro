import React from 'react';

// https://github.com/remarkjs/react-markdown/issues/635
function ReactMarkdown({ children }){
  return <span data-testid="react-markdown">{children}</span>;
}

export default ReactMarkdown;