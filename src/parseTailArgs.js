const isOption = (option) => {
  return option.startsWith('-');
};

const parseTailArgs = (args) => {
  const defaultOptions = {
    option: '-n',
    optionArg: 10
  };
  if (args.length < 1) {
    return defaultOptions;
  }

  if (isOption(args[0])) {
    defaultOptions.option = args[0];
    defaultOptions.optionArg = +args[1];
  }
  return defaultOptions;
};

exports.parseTailArgs = parseTailArgs;
