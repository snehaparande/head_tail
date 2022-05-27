const { createIterator } = require('./iterator.js');

const usageError = () => {
  return {
    name: 'usageError',
    message: 'usage: tail  [-r] [-q] [-c # | -n #] [file ...]'
  };
};

const illegalOptionError = option => {
  return {
    name: 'illegalOption',
    message: `tail: illegal option -- ${option[1]}\n${usageError().message}`
  };
};

const illegalCountError = (count) => {
  return {
    name: 'illegalCount',
    message: `tail: illegal offset -- ${count}`
  };
};

const validateCombinedOptions = (args) => {
  if (args.includes('-n') && args.includes('-c')) {
    throw usageError();
  }
  return true;
};

const validOption = option => {
  const validOptions = ['-n', '-c'];
  if (validOptions.includes(option)) {
    return option;
  }
  throw illegalOptionError(option);
};

const validCount = (count) => {
  if (+count > 0) {
    return +count;
  }
  throw illegalCountError(count);
};

const validFiles = (files) => {
  if (files.length !== 0) {
    return files;
  }
  throw usageError();
};

const isOption = (option) => {
  return option.startsWith('-');
};

const splitOption = (option) => {
  if (option.match(/^-\d/)) {
    return ['-n', option.slice(1)];
  }
  return [option.slice(0, 2), option.slice(2)];
};

const splitCombinedOptions = (args) => {
  const splittedOptions = args.flatMap(arg => {
    return isOption(arg) ? splitOption(arg) : arg;
  });
  return splittedOptions.filter(element => element.length !== 0);
};

const parseTailArgs = (args) => {
  const splittedArgs = splitCombinedOptions(args);
  validateCombinedOptions(splittedArgs);
  const argsIterator = createIterator(splittedArgs);

  const options = {
    option: '-n',
    optionArg: 10
  };
  while (argsIterator.current() && isOption(argsIterator.current())) {
    options.option = validOption(argsIterator.current());
    options.optionArg = validCount(argsIterator.next());
    argsIterator.next();
  }
  return {
    files: validFiles(argsIterator.restOf()),
    options
  };
};

exports.parseTailArgs = parseTailArgs;
