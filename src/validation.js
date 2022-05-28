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
    fileName
  };
};

const combinedOptionsError = () => {
  return {
    name: 'combinedOptionsError',
    message: 'head: can\'t combine line and byte counts'
  };
};

const validOption = option => {
  const validOptions = ['-n', '-c'];
  if (validOptions.includes(option)) {
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

const validateCombinedOptions = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw combinedOptionsError();
  }
  return true;
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
exports.validateCombinedOptions = validateCombinedOptions;
exports.validFiles = validFiles;
