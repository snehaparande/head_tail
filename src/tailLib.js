const { parseTailArgs } = require('./parseTailArgs');

const cutText = (content, { separator, start, end }) => {
  const allEles = content.split(separator);
  const requiredEles = allEles.slice(start, end);
  return requiredEles.join(separator);
};

const tail = (content, { option, optionArg }) => {
  const separators = { '-n': '\n', '-c': '' };
  const separator = separators[option];
  return cutText(content, { separator, start: -optionArg });
};

const tailMain = (content, ...args) => {
  const option = parseTailArgs(args);
  return tail(content, option);
};

exports.tail = tail;
exports.tailMain = tailMain;
