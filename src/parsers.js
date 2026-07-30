import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  const ext = path.extname(filepath).toLowerCase();
  if (ext === '.json') {
    return JSON.parse(content);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(content);
  }
  throw new Error(`Unsupported file format: ${ext}`);
};

export default parse;
