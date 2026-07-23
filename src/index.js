import parseFile from './parser.js';

const genDiff = (filepath1, filepath2, format) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  // Пока возвращаем сырые данные — это нужно, чтобы тесты на чтение прошли
  return {
    before: data1,
    after: data2,
    format,
  };
};

export default genDiff;

