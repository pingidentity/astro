import React, { forwardRef, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';

import { useStatusClasses } from '../../hooks';
import { Box, CopyText, Text } from '../../index';
import { CodeEditorProps, CustomEditorOptions } from '../../types';
import languageMapping from '../../utils/devUtils/constants/languageMapping';

const CodeEditor = forwardRef<HTMLDivElement, CodeEditorProps>((props, ref) => {
  const {
    defaultValue,
    language,
    onChange,
    onValidate,
    height,
    className,
    isReadOnly,
    iconButtonProps,
    ...others
  } = props;

  const { classNames } = useStatusClasses(className, {
    isReadOnly,
  });

  const editorRef = useRef(null);

  const [code, setCode] = useState('');

  const handleChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      if (onChange) {
        onChange(value);
      }
    }
  };

  const languageName = (languageExtension: string) => {
    return languageMapping[languageExtension] || languageExtension;
  };

  return (
    <Box
      {...others}
      ref={ref}
    >
      <Box
        ref={ref}
        className={classNames}
        variant="codeEditor.wrapper"
      >
        <Box isRow justifyContent="space-between" alignItems="center" variant="codeEditor.header">
          <Text mb="0" mr="sm" py="sm">{typeof language === 'string' ? languageName(language) : ''}</Text>
          <CopyText
            ref={ref}
            mode="rightText"
            textToCopy={code || defaultValue}
            iconButtonProps={iconButtonProps}
          />
        </Box>
        <Box
          height={height}
          className={classNames}
          ref={editorRef}
        >
          <Editor
            height="100%"
            language={language}
            defaultValue={defaultValue}
            theme="vs-light"
            onChange={handleChange}
            onValidate={onValidate}
            options={{
              fontSize: 14,
              automaticLayout: true,
              minimap: { enabled: true },
              stickyScroll: { enabled: false },
              readOnly: isReadOnly,
              scrollBeyondLastLine: false,
              padding: {
                top: 13,
                bottom: 13,
              },
            } as CustomEditorOptions}
          />
        </Box>
      </Box>
    </Box>

  );
});

export default CodeEditor;
