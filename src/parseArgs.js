const parseArgs = (args) => {
  const fileName = args[args.length - 1];
  const defaultOption = {
    option: '-n',
    optionArg: 10
  };

  if (args[0].match(/^-.$/)) {
    defaultOption.option = args[0];
    defaultOption.optionArg = args[1];
  }

  return { fileName, option: defaultOption };
};
exports.parseArgs = parseArgs;
