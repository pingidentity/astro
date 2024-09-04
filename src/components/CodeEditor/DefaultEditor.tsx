import React, { forwardRef, useEffect, useRef } from 'react';
import { indentWithTab } from '@codemirror/commands';
import { linter, lintGutter } from '@codemirror/lint';
import { Compartment, EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { basicSetup, EditorView } from 'codemirror';

import { Box } from '../../index';
import { CodeEditorProps } from '../../types';

const language = new Compartment();

const DefaultEditor = forwardRef<HTMLElement, CodeEditorProps>((props, ref) => {
  const {
    initialCode,
    editorLanguage,
    onUpdate,
    linterExtension,
    customRules,
    onEditorViewInit,
    ...others
  } = props;

  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    let view: EditorView;
    if (editorRef.current && editorLanguage) {
      const startState = EditorState.create({
        doc: initialCode,
        extensions: [
          basicSetup,
          language.of(editorLanguage),
          keymap.of([indentWithTab]),
          lintGutter(),
          linter(linterExtension !== undefined ? linterExtension : null),
          linter(customRules !== undefined ? customRules : null),
          EditorView.contentAttributes.of({ 'aria-label': 'Code Editor' }),
          EditorView.updateListener.of(update => {
            if (onUpdate) {
              onUpdate(update.state.doc.toString());
            }
          }),
          EditorView.theme({
            '.cm-scroller:focus-visible': {
              outline: '1px solid',
              border: '1px solid',
              borderColor: '#4462ED',
              outlineColor: '#758acd',
              outlineOffset: '0px',
            },
          }),
        ],
      });

      view = new EditorView({ state: startState, parent: editorRef.current });

      viewRef.current = view;

      const scroller = editorRef.current.querySelector('.cm-scroller') as HTMLElement;
      if (scroller) {
        scroller.tabIndex = 0;
      }

      if (onEditorViewInit && viewRef.current) {
        onEditorViewInit(viewRef.current);
      }
    }
    return () => {
      view.destroy();
    };
  }, [
    customRules,
    editorLanguage,
    initialCode,
    linterExtension,
    onEditorViewInit,
    onUpdate,
    viewRef,
  ]);

  return (
    <Box
      {...others}
      ref={ref}
    >
      <Box
        variant="codeEditor.wrapper"
      >
        <Box ref={editorRef} />
      </Box>
    </Box>

  );
});

export default DefaultEditor;
