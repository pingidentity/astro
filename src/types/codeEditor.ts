import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { LintSource } from '@codemirror/lint';
import { EditorView } from 'codemirror';

import { DOMAttributes, StyleProps } from './shared';

export interface CodeEditorProps extends DOMAttributes, StyleProps {
  initialCode?: string;
  editorLanguage?: LanguageSupport | LRLanguage;
  linterExtension?: LintSource ;
  customRules?: LintSource;
  onEditorViewInit?: (editorView: EditorView) => void;
  onUpdate?: (content: string) => void;
  supportedLanguage?: 'typescript' | 'javascript' | 'json';
  customEslintConfig?: object;
}
