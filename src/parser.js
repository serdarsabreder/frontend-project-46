import fs from 'fs';
import path from 'path';
import { load } from 'js-yaml';

const getExtension = (filePath) => path.extname(filePath).toLowerCase();

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = fs.readFileSync(absolutePath, 'utf8');
  const ext = getExtension(absolutePath);

  if (ext === '.json') {
    return JSON.parse(content);
  }
  if (ext === '.yaml' || ext === '.yml') {
    return load(content);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export default parseFile;

