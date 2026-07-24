import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => resolve(__dirname, '../__fixtures__', filename);

test('flat JSON diff: shows added/removed/changed with +/-', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const expectedOutput = fs.readFileSync(
    getFixturePath('expected-plain.txt'),
    'utf8'
  ).trim();

  // Убираем лишние переносы строк и пробелы в конце для надёжного сравнения
  const actualOutput = genDiff(filepath1, filepath2).trim();

  expect(actualOutput).toBe(expectedOutput);
});

