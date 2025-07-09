import { type editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';

import { IconButtonProps } from './iconButton';
import { DOMAttributes, StyleProps } from './shared';
import { FocusableElement } from '.';

export interface CodeEditorProps extends Omit<DOMAttributes<FocusableElement>, 'onChange'>, StyleProps {
  defaultValue?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  onValidate?: (markers: editor.IMarker[]) => void;
  isReadOnly?: boolean;
  iconButtonProps?: Omit<IconButtonProps, 'onPress'>
  editorOptionsProps?: monaco.editor.IStandaloneEditorConstructionOptions;
  onMount?: (codeEditor: monaco.editor.IStandaloneCodeEditor) => void;
}

export interface CustomEditorOptions extends monaco.editor.IStandaloneEditorConstructionOptions {
  stickyScroll?: {
    enabled: boolean;
  };
}
