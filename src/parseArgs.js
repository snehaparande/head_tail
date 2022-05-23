const { createIterator } = require('./iterator.js');
const { validCount, validOption, validFiles } = require('./validation.js');

const isOption = (option) => {
  return option.startsWith('-');
};

const splitCombinedOptions = (args) => {
  const splittedOptions = args.flatMap(arg => {
    return isOption(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
  });
  return splittedOptions.filter(element => element.length !== 0);
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
