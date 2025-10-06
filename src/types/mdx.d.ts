import type { JSX } from 'react';

declare module '*.mdx' {
  const MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
}
