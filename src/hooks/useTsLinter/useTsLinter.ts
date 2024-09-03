import { useEffect, useState } from 'react';
import { Diagnostic } from '@codemirror/lint';
import { createDefaultMapFromCDN, createSystem, createVirtualTypeScriptEnvironment } from '@typescript/vfs';
import ts from 'code-editor-typescript';
import { EditorView } from 'codemirror';

const useTsEnvironment = () => {
  const [fsMap, setFsMap] = useState<Map<string, string>>();
  const diagnostics: Diagnostic[] = [];

  useEffect(() => {
    const loadPost = async () => {
      const defaultMap = await createDefaultMapFromCDN(
        { target: ts.ScriptTarget.ES2015 },
        ts.version,
        true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ts,
      );
      setFsMap(defaultMap);
    };
    loadPost();
  }, []);

  /* istanbul ignore next */
  const system = createSystem(fsMap !== undefined ? fsMap : new Map([
    ['', ''],
  ]));

  /* Currently the typescript version we use isn't compatible with @typescript/vfs and needs
   at least v.5.0.0 so when we update it we can remove this. */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const env = createVirtualTypeScriptEnvironment(system, [], ts, {});

  /* istanbul ignore next */
  const tsLinter = (view: EditorView): Diagnostic[] => {
    diagnostics.length = 0;
    env.createFile('index.ts', view.state.doc.toString());
    const tsErrors = env.languageService
      .getSemanticDiagnostics('index.ts')
      .concat(env.languageService.getSyntacticDiagnostics('index.ts'));

    tsErrors.forEach(tsError => {
      diagnostics.push({
        from: Number(tsError.start),
        message: typeof tsError.messageText === 'string'
          ? tsError.messageText
          : tsError.messageText.messageText,
        severity: 'error',
        to: Number(tsError.start) + Number(tsError.length),
      });
    });

    return diagnostics;
  };

  return tsLinter;
};

export default useTsEnvironment;
