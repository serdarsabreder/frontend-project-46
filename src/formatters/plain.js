import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const fullKey = path ? `${path}.${node.key}` : node.key;
    switch (node.type) {
      case 'nested':
        return formatPlain(node.children, fullKey);
      case 'added':
        return `Property '${fullKey}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${fullKey}' was removed`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return lines.join('\n');
};

export default formatPlain;
