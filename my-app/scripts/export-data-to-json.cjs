/*
  Converts each file in data/*.js that uses `export const ...` into a JSON file next to it.
  This evaluator is safe for these files because they only contain object/array/string/number literals.
*/
const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');

function readDirectoryFiles(directoryPath) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.js'))
    .map((dirent) => path.join(directoryPath, dirent.name));
}

function extractExports(sourceCode, filePath) {
  // Inline JSON imports like: import heroJson from './hero.json'
  // We replace them with: const heroJson = { ...contents of hero.json... };
  const dir = path.dirname(filePath);
  let code = sourceCode.replace(/\bimport\s+(\w+)\s+from\s+['"](.+?\.json)['"];?/g, (m, varName, relPath) => {
    try {
      const jsonPath = path.resolve(dir, relPath);
      const jsonText = fs.readFileSync(jsonPath, 'utf8');
      // Use the raw JSON text as a literal assignment
      return `const ${varName} = ${jsonText};`;
    } catch (e) {
      // If anything goes wrong, fall back to removing the import to avoid breaking
      return '';
    }
  });

  // Remove remaining ESM imports including multiline blocks
  code = code
    .replace(/^\s*import[\s\S]*?;\s*$/gm, '')
    .replace(/^\s*import[\s\S]*?from\s+['"][^'"]+['"][\s]*$/gm, '');
  // Replace JSX icon tags like <Users .../> with "Users"
  code = code.replace(/<([A-Za-z_][\w]*)\b[^>]*\/>/g, (_m, tag) => `"${tag}"`);
  // Replace object property icon: Identifier, with string name
  code = code.replace(/(icon:\s*)([A-Za-z_][\w]*)(\s*,)/g, (_m, pre, ident, post) => `${pre}"${ident}"${post}`);
  // Replace enum-like references ProjectType.X with string
  code = code.replace(/ProjectType\.(\w+)/g, (_m, key) => `"${key}"`);

  const exportConstRegex = /export\s+const\s+(\w+)\s*=\s*/g;
  const exportedNames = [];
  let transformed = code;

  transformed = transformed.replace(exportConstRegex, (_m, name) => {
    exportedNames.push(name);
    return `const ${name} = `;
  });

  return { transformed, exportedNames };
}

function evaluateModule(transformedCode, exportedNames) {
  const wrapped = `"use strict";\n${transformedCode}\nreturn { ${exportedNames.join(', ')} };`;
  const fn = new Function(wrapped);
  return fn();
}

function writeJson(targetPath, dataObject) {
  const json = JSON.stringify(dataObject, null, 2);
  fs.writeFileSync(targetPath, json, 'utf8');
}

function main() {
  if (!fs.existsSync(dataDir)) {
    console.error('data directory not found at', dataDir);
    process.exit(1);
  }

  const files = readDirectoryFiles(dataDir);
  files.forEach((filePath) => {
    const src = fs.readFileSync(filePath, 'utf8');
    const { transformed, exportedNames } = extractExports(src, filePath);
    if (exportedNames.length === 0) {
      return;
    }
    const result = evaluateModule(transformed, exportedNames);
    const outPath = filePath.replace(/\.js$/, '.json');
    writeJson(outPath, result);
    console.log('Wrote', path.relative(process.cwd(), outPath));
  });
}

main();


