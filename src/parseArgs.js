const isValidOption = option => option.match(/^-[nc]$/);

const parseArgs = (args) => {
  if (args.length < 1) {
    throw {
      name: 'InvalidArgument',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }

  const defaultOption = {
    option: '-n',
    optionArg: 10
  };

  for (let index = 0; index < args.length - 1; index = index + 2) {
    if (isValidOption(args[index])) {
      defaultOption.option = args[index];
      defaultOption.optionArg = +args[index + 1];
    }
  }
  const fileName = args[args.length - 1];
  return { fileName, option: defaultOption };
};

exports.parseArgs = parseArgs;
