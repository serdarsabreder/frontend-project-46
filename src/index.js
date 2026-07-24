import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getExtension = (filePath) => path.extname(filePath).toLowerCase();

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath, 'utf8');
  const ext = getExtension(absolutePath);

  if (ext === '.json') {
    return JSON.parse(content);
  }
  if (ext === '.yaml' || ext === '.yml') {
    throw new Error('YAML support will be added in later steps');
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort();

  const lines = allKeys.map((key) => {
    const hasInFirst = Object.prototype.hasOwnProperty.call(obj1, key);
    const hasInSecond = Object.prototype.hasOwnProperty.call(obj2, key);

    // Если ключа нет в первом файле, но есть во втором → добавлен
    if (!hasInFirst && hasInSecond) {
      return `+ ${key}: ${obj2[key]}`;
    }

    // Если ключ есть только в первом → удалён
    if (hasInFirst && !hasInSecond) {
      return `- ${key}: ${obj1[key]}`;
    }

    // Ключ есть в обоих: сравниваем значения
    if (obj1[key] === obj2[key]) {
      // Значения совпадают → просто ключ: значение, без знаков
      return `${key}: ${obj1[key]}`;
    }

    // Значения разные → сначала старое, потом новое
    return [
      `- ${key}: ${obj1[key]}`,
      `+ ${key}: ${obj2[key]}`,
    ];
  });

  return lines.flat().join('\n');
};

export default genDiff;

