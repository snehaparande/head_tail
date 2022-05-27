const { parseHeadArgs } = require('./parseHeadArgs.js');
const { print } = require('./print.js');
const { fileNotFoundError } = require('./validation.js');

const firstNLines = (text, count) => {
  const allElements = text.split('\n');
  const requiredEles = allElements.slice(0, count);
  return requiredEles.join('\n');
};

const firstNBytes = (text, count) => {
  const allElements = text.split('');
  const requiredEles = allElements.slice(0, count);
  return requiredEles.join('');
};

const slicer = (option) => {
  switch (option) {
    case '-n':
      return firstNLines;
    case '-c':
      return firstNBytes;
    default:
      break;
  }
};

const head = (text, { option, optionArg }) => {
  const sliceText = slicer(option);
  return sliceText(text, optionArg);
};

const getResult = (readFile, fileName, options) => {
  let content;
  try {
    content = readFile(fileName, 'utf8');
  } catch (error) {
    return {
      fileName,
      error: true,
      result: fileNotFoundError(fileName)
    };
  }
  return { fileName, error: false, result: head(content, options) };
};

const headMain = (readFile, consoleError, consoleLog, ...args) => {
  const { files, options } = parseHeadArgs(args);

  const results = files.map(fileName => {
    return getResult(readFile, fileName, options);
  });

  return print(results, consoleLog, consoleError);
};

exports.head = head;
exports.headMain = headMain;
exports.getResult = getResult;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
