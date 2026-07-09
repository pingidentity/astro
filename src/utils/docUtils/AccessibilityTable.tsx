import React from 'react';
import Markdown from 'markdown-to-jsx';
import { v4 as uuid } from 'uuid';

import { AccessibilityTableProps } from '../../types';

const AccessibilityTable = ({
  keyboardRows,
  keyboardDescription,
  screenReaderRows,
}: AccessibilityTableProps) => {
  const hasKeyboard = Array.isArray(keyboardRows) && keyboardRows.length > 0;
  const hasScreenReader = Array.isArray(screenReaderRows) && screenReaderRows.length > 0;

  if (!hasKeyboard && !hasScreenReader) {
    return null;
  }

  return (
    <>
      {hasKeyboard && (
        <>
          <h4>Keyboard Navigation</h4>
          <p>{keyboardDescription || 'These keys provide additional functionality to the component.'}</p>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Function</th>
              </tr>
            </thead>
            <tbody>
              {keyboardRows.map(row => (
                <tr key={row.key + uuid()}>
                  <td><span>{row.key}</span></td>
                  <td>
                    <Markdown options={{ forceInline: true }}>{row.description}</Markdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {hasScreenReader && (
        <>
          <h4>Screen Readers</h4>
          <p>This component uses the following attributes to assist screen readers:</p>
          <ul>
            {screenReaderRows.map(item => (
              <li key={item + uuid()}>
                <Markdown>{item}</Markdown>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default AccessibilityTable;
