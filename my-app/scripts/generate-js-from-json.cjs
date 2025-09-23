/*
  Regenerates data/*.js files from data/*.json so the app can continue importing named exports.
*/
const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');

function readDirectoryFiles(directoryPath) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.json'))
    .map((dirent) => path.join(directoryPath, dirent.name));
}

function createJsModuleFromJson(jsonPath, jsonObject) {
  const lines = ['/* This file is auto-generated from the matching .json file. Do not edit manually. */'];
  Object.keys(jsonObject).forEach((key) => {
    const value = jsonObject[key];
    const serialized = JSON.stringify(value, null, 2);
    lines.push(`export const ${key} = ${serialized};`);
  });
  lines.push('');
  const content = lines.join('\n');
  const jsPath = jsonPath.replace(/\.json$/, '.js');
  fs.writeFileSync(jsPath, content, 'utf8');
  return jsPath;
}

function main() {
  if (!fs.existsSync(dataDir)) {
    console.error('data directory not found at', dataDir);
    process.exit(1);
  }
  const files = readDirectoryFiles(dataDir);
  files.forEach((jsonPath) => {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const obj = JSON.parse(raw);
    const out = createJsModuleFromJson(jsonPath, obj);
    console.log('Generated', path.relative(process.cwd(), out));
  });
}

main();


