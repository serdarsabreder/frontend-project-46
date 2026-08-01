import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (...parts) => path.join(__dirname, '..', '__fixtures__', ...parts);
const readFixture = (...parts) => fs.readFileSync(getFixturePath(...parts), 'utf-8').trim();

describe('genDiff', () => {
  test('stylish format with JSON files', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    const expected = readFixture('expectedStylish.txt');
    expect(result).toBe(expected);
  });

  test('stylish format with YAML files', () => {
    const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
    const expected = readFixture('expectedStylish.txt');
    expect(result).toBe(expected);
  });

  test('plain format', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
    const expected = readFixture('expectedPlain.txt');
    expect(result).toBe(expected);
  });

  test('json format', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
    const expected = readFixture('expectedJson.txt');
    expect(result).toBe(expected);
  });

  test('mixed file formats', () => {
    const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
    const expected = readFixture('expectedStylish.txt');
    expect(result).toBe(expected);
  });

  test('flat JSON files', () => {
    const result = genDiff(
      getFixturePath('step3', 'file1.json'),
      getFixturePath('step3', 'file2.json'),
    );
    const expected = readFixture('step3', 'expected.txt');
    expect(result).toBe(expected);
  });

  test('flat YAML files (.yml)', () => {
    const result = genDiff(
      getFixturePath('step6', 'file1.yml'),
      getFixturePath('step6', 'file2.yml'),
    );
    const expected = readFixture('step6', 'expected.txt');
    expect(result).toBe(expected);
  });

  test('flat YAML files (.yaml)', () => {
    const result = genDiff(
      getFixturePath('step6', 'file1.yaml'),
      getFixturePath('step6', 'file2.yaml'),
    );
    const expected = readFixture('step6', 'expected.txt');
    expect(result).toBe(expected);
  });

  test('flat mixed JSON and YAML files', () => {
    const result = genDiff(
      getFixturePath('step6', 'file1.json'),
      getFixturePath('step6', 'file2.yml'),
    );
    const expected = readFixture('step6', 'expected.txt');
    expect(result).toBe(expected);
  });
});
