const { createIterator } = require('./iterator.js');

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

const validOption = option => {
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

const isOption = (option) => {
  return option.startsWith('-');
};

const splitCombinedOptions = (args) => {
  const splitedOptions = args.flatMap(arg => {
    return isOption(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
  });
  return splitedOptions.filter(element => element.length !== 0);
};

const validFiles = (files) => {
  if (files.length !== 0) {
    return files;
  }
  throw usageError();
};

const parseArgs = (args) => {
  const argsIterator = createIterator(splitCombinedOptions(args));

  const option = {
    option: '-n',
    optionArg: 10
  };

  while (argsIterator.current() && isOption(argsIterator.current())) {
    option.option = validOption(argsIterator.current());
    option.optionArg = validCount(option.option, argsIterator.next());
    argsIterator.next();
  }

  return {
    files: validFiles(argsIterator.restOf()),
    option
  };

};

exports.parseArgs = parseArgs;
exports.validCount = validCount;
exports.validOption = validOption;
exports.splitCombinedOptions = splitCombinedOptions;
