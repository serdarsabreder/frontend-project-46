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
  .action((filepath1, filepath2, options) => {
    // На этом шаге игнорируем format, делаем только базовый стиль (как в примере)
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  })
  .parse();

