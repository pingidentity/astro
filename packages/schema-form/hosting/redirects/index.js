import { fetchVersions } from '../fetchVersions';

const originPath = window.location.origin;
const packagePath = '/schema-form';

const redirect = fetchVersions((versions) => {
  const subpath = window.location.pathname.split('/').filter((i) => i)[1];
  let redirectPath = originPath + packagePath;
  switch (subpath) {
    case 'latest':
    case 'stable':
      redirectPath += `/${versions[0].value}/`;
      break;
    default:
      break;
  }
  window.location.href = redirectPath;
}, () => {
  window.location.href = originPath;
})('../');

redirect();
