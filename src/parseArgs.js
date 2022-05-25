const { createIterator } = require('./iterator.js');
const {
  validCount,
  validOption,
  validFiles,
  validateCombinedOptions
} = require('./validation.js');

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

const parseArgs = (args) => {
  const splittedArgs = splitCombinedOptions(args);
  validateCombinedOptions(splittedArgs);
  const argsIterator = createIterator(splittedArgs);

  const options = {
    option: '-n',
    optionArg: 10
  };
  while (argsIterator.current() && isOption(argsIterator.current())) {
    options.option = validOption(argsIterator.current());
    options.optionArg = validCount(options.option, argsIterator.next());
    argsIterator.next();
  }

  return {
    files: validFiles(argsIterator.restOf()),
    options
  };
};

exports.parseArgs = parseArgs;
exports.validCount = validCount;
exports.validOption = validOption;
exports.splitCombinedOptions = splitCombinedOptions;
