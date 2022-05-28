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

const getExitCode = (results) => results.some(result => result.error) ? 1 : 0;

const headMain = (readFile, consoleError, consoleLog, ...args) => {
  const { files, options } = parseHeadArgs(args);

  const results = files.map(fileName => {
    return getResult(readFile, fileName, options);
  });

  print(results, consoleLog, consoleError);
  return getExitCode(results);
};

exports.head = head;
exports.headMain = headMain;
exports.getResult = getResult;
exports.getExitCode = getExitCode;
exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.slicer = slicer;
