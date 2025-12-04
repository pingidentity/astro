import { matchers } from '@emotion/jest';
import { toHaveNoViolations } from 'jest-axe';
import { format } from 'util';

import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
import 'whatwg-fetch';
import 'regenerator-runtime';

expect.extend(toHaveNoViolations);
expect.extend(matchers);

// Ensure Jest fails tests on console warn and error
// https://github.com/facebook/jest/issues/6121#issuecomment-529591574

global.console.warn = (...args) => {
  throw new Error(format(...args));
};

global.console.error = (...args) => {
  if (typeof args[0] === 'string' && /defaultProps/.test(args[0])) {
    return;
  }
  throw new Error(format(...args));
};
