const { parseArgs } = require('./parseArgs');

const splitBy = (text, separator) => text.split(separator);
const joinBy = (requiredLines, separator) => requiredLines.join(separator);

const cutElements = (elements, noOfElements) => elements.slice(0, noOfElements);

const cutText = (text, { separator, count }) => {
  const allElements = splitBy(text, separator);
  const requiredEles = cutElements(allElements, count);
  return joinBy(requiredEles, separator);
};

const head = (text, { option, optionArg }) => {
  const separators = { '-n': '\n', '-c': '' };
  const separator = separators[option];
  return cutText(text, { separator, count: optionArg });
};

const headMain = (readFile, ...args) => {
  let content;
  const { fileName, option } = parseArgs(args);
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    throw {
      name: 'readFileError',
      message: `head: ${fileName}: No such file or directory`,
      fileName
    };
  }
  return head(content, option);
};

exports.cutText = cutText;
exports.head = head;
exports.headMain = headMain;
