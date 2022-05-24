const { parseArgs } = require('./parseArgs');
const { fileNotFoundError } = require('./validation.js');

const cutText = (text, { separator, count }) => {
  const allElements = text.split(separator);
  const requiredEles = allElements.slice(0, count);
  return requiredEles.join(separator);
};

const head = (text, { option, optionArg }) => {
  const separators = { '-n': '\n', '-c': '' };
  const separator = separators[option];
  return cutText(text, { separator, count: optionArg });
};

const getResult = (readFile, fileName, options) => {
  let content;
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    return {
      fileName,
      error: fileNotFoundError(fileName)
    };
  }
  return { fileName, result: head(content, options) };
};

const headMain = (readFile, ...args) => {
  const { files, options } = parseArgs(args);

  return files.map(fileName => {
    return getResult(readFile, fileName, options);
  });
};

exports.cutText = cutText;
exports.head = head;
exports.headMain = headMain;
exports.getResult = getResult;
