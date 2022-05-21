const parseArgs = (args) => {
  const fileName = args[args.length - 1];
  const defaultOption = {
    option: '-n',
    optionArg: 10
  };

  for (let index = 0; index < args.length - 1; index = index + 2) {
    if (args[index].match(/^-.$/)) {
      defaultOption.option = args[index];
      defaultOption.optionArg = args[index + 1];
    }
  }


  return { fileName, option: defaultOption };
};
exports.parseArgs = parseArgs;
