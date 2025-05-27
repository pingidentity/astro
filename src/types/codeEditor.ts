import { type editor } from 'monaco-editor';
import * as monaco from 'monaco-editor';

import { DOMAttributes, StyleProps } from './shared';
import { FocusableElement } from '.';

export interface CodeEditorProps extends Omit<DOMAttributes<FocusableElement>, 'onChange'>, StyleProps {
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  onValidate?: (markers: editor.IMarker[]) => void;
}

export interface CustomEditorOptions extends monaco.editor.IStandaloneEditorConstructionOptions {
  stickyScroll?: {
    enabled: boolean;
  };
}
