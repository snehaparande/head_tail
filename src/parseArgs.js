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
