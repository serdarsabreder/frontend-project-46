#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'First file path')
  .argument('<filepath2>', 'Second file path')
  .option('-f, --format [type]', 'Output format (stylish, plain, json)')
  .parse();

const options = program.opts();
const filepath1 = program.args[0];
const filepath2 = program.args[1];

// Пока передаём format в функцию, даже если она его ещё не использует
const result = genDiff(filepath1, filepath2, options.format);
console.log(result);

