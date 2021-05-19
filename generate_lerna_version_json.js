/**
 * @desc Transform a text file with changed versions from Lerna into a readable JSON file. Used for 
 * publishing with Jenkins.
 */
const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.resolve(process.cwd(), "lerna_version.txt"), "UTF-8");
const lines = data.split(/\r?\n/);
const object = lines.reduce((acc, cur) => {
  const packages = cur.match(/^\s-\s(.*)\:/);
  // previous version is [1], new version is [2]
  const versions = cur.match(/.*\:\s(.*)\s=>\s(.*)$/);
  if (packages) {
    return {
      ...acc,
      [packages[1]]: versions[2],
    };
  } else {
    return { ...acc };
  }
}, {});
fs.writeFile('lerna_version.json', JSON.stringify(object), 'utf8', (err) => {
  if (err) {  console.error(err);  return; };
});
