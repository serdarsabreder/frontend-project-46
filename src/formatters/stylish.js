import _ from 'lodash';

const indent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const entries = Object.entries(value).map(([k, v]) => `${indent(depth + 1)}  ${k}: ${stringify(v, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${indent(depth)}  }`;
};

const formatStylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const prefix = indent(depth);
    switch (node.type) {
      case 'nested':
        return `${prefix}  ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${prefix}  }`;
      case 'added':
        return `${prefix}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${prefix}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return `${prefix}- ${node.key}: ${stringify(node.oldValue, depth)}\n${prefix}+ ${node.key}: ${stringify(node.newValue, depth)}`;
      case 'unchanged':
        return `${prefix}  ${node.key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return lines.join('\n');
};

const renderStylish = (diff) => `{\n${formatStylish(diff)}\n}`;

export default renderStylish;
