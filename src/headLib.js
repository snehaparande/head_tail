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
      error: true,
      result: fileNotFoundError(fileName)
    };
  }
  return { fileName, error: false, result: head(content, options) };
};

const headMain = (readFile, consoleError, consoleLog, ...args) => {
  const { files, options } = parseArgs(args);

  const results = files.map(fileName => {
    return getResult(readFile, fileName, options);
  });

  if (results.length === 1) {
    if (results[0].error) {
      consoleError(results[0].result.message);
    } else {
      consoleLog(results[0].result);
    }
    return;
  }

  results.forEach(element => {
    if (element.error) {
      consoleError(element.result.message);
    } else {
      consoleLog(`==> ${element.fileName} <==`);
      consoleLog(element.result);
    }
  });
};

exports.cutText = cutText;
exports.head = head;
exports.headMain = headMain;
exports.getResult = getResult;
