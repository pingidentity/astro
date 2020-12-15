import { format } from 'util';
import '@testing-library/jest-dom/extend-expect';
import { matchers } from 'jest-emotion';
import 'mutationobserver-shim';
import 'whatwg-fetch';
import 'regenerator-runtime';

expect.extend(matchers);

// Ensure Jest fails tests on console warn and error
// https://github.com/facebook/jest/issues/6121#issuecomment-529591574

global.console.warn = (...args) => {
  throw new Error(format(...args));
};

global.console.error = (...args) => {
  throw new Error(format(...args));
};

