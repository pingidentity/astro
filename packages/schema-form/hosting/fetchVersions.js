import fetch from 'isomorphic-fetch';
// isomorphic-fetch need a Promise polyfill for older browsers.
// Promise use inside of fetch, fetch should go with Promise to avoid page crashing in IE.
import 'es6-promise'; // eslint-disable-lint;

export const versionToNumber = (version) => {
  const numbers = version.split('.').map((string) => string * 1);
  return (numbers[0] * 1000 * 1000) + (numbers[1] * 1000) + numbers[2];
};

export const sortVersions = (versions) => versions.slice().sort(
  (first, second) => ((versionToNumber(first) < versionToNumber(second)) ? 1 : -1),
);

export const filterVersions = (versions) => versions.filter((version, index, list) => (
  (index <= 0) || (list[index - 1].match(/^[^.]*\.[^.]*/)[0] !== version.match(/^[^.]*\.[^.]*/)[0])
));

export const parseVersions = (versions) => filterVersions(sortVersions(versions))
  .map((version) => ({
    value: version,
    label: version,
  }));

export const fetchVersions = (onSuccess, onError = () => {}) => (versionPath) => {
  fetch(`${versionPath}versions.json?_=${new Date().getTime()}`)
    .then((resp) => {
      if (resp.status >= 400) {
        throw new Error('Could not get versions from server.');
      }
      return resp.json();
    })
    .then((versions) => parseVersions(versions))
    .then((parsedVersions) => {
      onSuccess(parsedVersions);
    })
    .catch((error) => {
      onError(error);
      // eslint-disable-next-line no-console
      console.error(error);
    });
};
