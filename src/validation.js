const usageError = () => {
  return {
    name: 'usageError',
    message: 'usage: head [-n lines | -c bytes] [file ...]'
  };
};

const illegalOptionError = option => {
  return {
    name: 'illegalOption',
    message: `head: illegal option -- ${option[1]}\n${usageError().message}`
  };
};

const illegalCountError = (option, count) => {
  return {
    name: 'illegalCount',
    message: `head: illegal ${option} count -- ${count}`
  };
};

const fileNotFoundError = (fileName) => {
  return {
    name: 'readFileError',
    message: `head: ${fileName}: No such file or directory`,
    fileName: fileName
  };
};

const validOption = option => {
  // validOptions.includes(option);
  if (option.match(/^-[nc]$/)) {
    return option;
  }
  throw illegalOptionError(option);
};

const validCount = (flag, count) => {
  if (+count > 0) {
    return +count;
  }
  const mapOption = { '-n': 'line', '-c': 'byte' };
  throw illegalCountError(mapOption[flag], count);
};

const validFiles = (files) => {
  if (files.length !== 0) {
    return files;
  }
  throw usageError();
};

exports.usageError = usageError;
exports.fileNotFoundError = fileNotFoundError;
exports.validCount = validCount;
exports.validOption = validOption;
exports.validFiles = validFiles;
