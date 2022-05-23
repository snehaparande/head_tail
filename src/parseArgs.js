const { createIterator } = require('./iterator.js');

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

const isOption = (option) => {
  return option.startsWith('-');
};

const structureArgs = (args) => {
  return args.flatMap(arg => {
    return isOption(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
  }).filter(element => element.length !== 0);
};

const parseArgs = (args) => {
  const argsIterator = createIterator(structureArgs(args));

  const option = {
    option: '-n',
    optionArg: 10
  };

  while (isOption(argsIterator.current())) {
    option.option = validOption(argsIterator.current());
    option.optionArg = validCount(option.option, argsIterator.next());
    argsIterator.next();
  }

  return {
    fileName: argsIterator.restOf(),
    option
  };

};

exports.parseArgs = parseArgs;
