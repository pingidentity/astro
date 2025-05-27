import React, { forwardRef, useRef } from 'react';
import Editor from '@monaco-editor/react';

import { Box } from '../../index';
import { CodeEditorProps, CustomEditorOptions } from '../../types';


const CodeEditor = forwardRef<HTMLElement, CodeEditorProps>((props, ref) => {
  const {
    value,
    language,
    onChange,
    onValidate,
    height,
    ...others
  } = props;

  const editorRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box
      {...others}
      ref={ref}
    >
      <Box
        variant="codeEditor.wrapper"
        ref={editorRef}
        height={height}
      >
        <Editor
          height="100%"
          language={language}
          value={value}
          theme="vs-light"
          onChange={onChange}
          onValidate={onValidate}
          options={{
            fontSize: 14,
            automaticLayout: true,
            minimap: { enabled: true },
            stickyScroll: { enabled: false },
          } as CustomEditorOptions}
        />
      </Box>
    </Box>

  );
});

export default CodeEditor;
