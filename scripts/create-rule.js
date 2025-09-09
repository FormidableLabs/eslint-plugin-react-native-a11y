#!/usr/bin/env node --harmony
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import minimist from 'minimist';
import jscodeshiftJSON from 'jscodeshift/package.json';
import ruleBoilerplateGenerator from './boilerplate/rule';
import testBoilerplateGenerator from './boilerplate/test';
import docBoilerplateGenerator from './boilerplate/doc';
import jscodeshift from 'jscodeshift';

const argv = minimist(process.argv.slice(2));


const ruleName = argv._[0];
const author = argv.author || '$AUTHOR';
const description = argv.description || '$DESCRIPTION';

const rulePath = path.resolve(`src/rules/${ruleName}.js`);
const testPath = path.resolve(`__tests__/src/rules/${ruleName}-test.js`);
const docsPath = path.resolve(`docs/rules/${ruleName}.md`);
const readmePath = path.resolve(`README.md`);

const jscodeshiftMain = jscodeshiftJSON.main;
const jscodeshiftRoot = jscodeshift.slice(
  0,
  jscodeshift.indexOf(jscodeshiftMain)
);

// Validate
if (!ruleName) {
  throw new Error('Rule name is required');
} else if (fs.existsSync(rulePath)) {
  throw new Error('Rule already exists!');
}

// Generate file boilerplate
const ruleBoilerplate = ruleBoilerplateGenerator(author, description);
const testBoilerplate = testBoilerplateGenerator(ruleName, author, description);
const docBoilerplate = docBoilerplateGenerator(ruleName);

// Create new files
fs.writeFileSync(rulePath, ruleBoilerplate);
fs.writeFileSync(testPath, testBoilerplate);
fs.writeFileSync(docsPath, docBoilerplate);

// Add the rule to the index
exec(
  [
    path.join(jscodeshiftRoot, jscodeshiftJSON.bin.jscodeshift),
    './src/index.js',
    '-t ./scripts/addRuleToIndex.js',
    '--extensions js',
    '--parser flow',
    `--ruleName=${ruleName}`,
    `--rulePath=${rulePath}`,
  ].join(' '),
  (error) => {
    if (error) {
      console.error(`exec error: ${error}`);
    }
  }
);

// Add the rule to README.md
const readme = fs.readFileSync(readmePath);
const lines = readme.toString().split('\n');
const index = lines.findIndex((line) => line === '### Rule Options') - 1;
const newRule = `- [${ruleName}](docs/rules/${ruleName}.md): ${description}`;
lines.splice(index, 0, newRule);
fs.writeFileSync(readmePath, lines.join('\n'));
