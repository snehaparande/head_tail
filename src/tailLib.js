const { parseTailArgs } = require('./parseTailArgs');
const { print } = require('./print.js');

const fileNotFoundError = (fileName) => {
  return {
    name: 'readFileError',
    message: `tail: ${fileName}: No such file or directory`,
    fileName: fileName
  };
};

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
  return { fileName, error: false, result: tail(content, options) };
};

const tailMain = (readFile, consoleError, consoleLog, ...args) => {
  const { files, options } = parseTailArgs(args);

  const results = files.map(fileName => {
    return getResult(readFile, fileName, options);
  });

  return print(results, consoleLog, consoleError);
};

exports.tail = tail;
exports.tailMain = tailMain;
