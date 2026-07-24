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
    // Для шага 5 пока можно оставить, но основное требование — плоские JSON
    throw new Error('YAML support will be added in later steps');
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // _.union не мутирует, возвращает новый массив
  const allKeys = _.union(keys1, keys2).sort();

  const lines = allKeys.map((key) => {
    const inFirst = key in obj1;
    const inSecond = key in obj2;

    if (!inFirst && inSecond) {
      // Добавлено
      return `+ ${key}: ${obj2[key]}`;
    }

    if (inFirst && !inSecond) {
      // Удалено
      return `- ${key}: ${obj1[key]}`;
    }

    // Есть в обоих: сравниваем значения
    if (obj1[key] !== obj2[key]) {
      // Изменено: сначала строка из первого файла, потом из второго (как в задании)
      return [
        `- ${key}: ${obj1[key]}`,
        `+ ${key}: ${obj2[key]}`,
      ];
    }

    // Не изменилось
    return `${key}: ${obj1[key]}`;
  });

  // flat() нужен, потому что изменённые ключи возвращают массив из 2 строк
  return lines.flat().join('\n');
};

export default genDiff;

