import parse from './parsers.js';
import buildDiff from './diffTree.js';
import renderStylish from './formatters/stylish.js';
import renderPlain from './formatters/plain.js';
import renderJson from './formatters/json.js';

const formatters = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const diff = buildDiff(data1, data2);
  const render = formatters[format] || renderStylish;
  return render(diff);
};

export default genDiff;
