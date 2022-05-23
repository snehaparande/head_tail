const validateArguments = (args) => {
  if (args.length < 1) {
    throw {
      name: 'InvalidArgument',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  if (args[0].match(/^-/)) {
    validOption(args[0]);
  }
};

const validOption = option => {
  if (option.match(/^-[nc]$/)) {
    return option;
  }
  throw {
    name: 'illegalOption',
    message: `head: illegal option -- ${option[1]}\nusage: head [-n lines | -c bytes] [file ...]`
  };
};

const validCount = (flag, count) => {
  if (+count > 0) {
    return +count;
  }
  const mapOption = { '-n': 'line', '-c': 'byte' };
  const option = mapOption[flag];
  throw {
    name: 'illegalCount',
    message: `head: illegal ${option} count -- ${count}`
  };
};

const parseArgs = (args) => {
  validateArguments(args);

  const defaultOption = {
    option: '-n',
    optionArg: 10
  };

  for (let index = 0; index < args.length - 1; index = index + 2) {
    defaultOption.option = validOption(args[index]);
    defaultOption.optionArg = validCount(args[index], args[index + 1]);
  }

  const fileName = args[args.length - 1];
  return { fileName, option: defaultOption };
};

exports.parseArgs = parseArgs;
