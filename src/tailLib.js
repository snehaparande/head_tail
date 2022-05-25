const cutText = (content, { separator, start, end }) => {
  const allEles = content.split(separator);
  const requiredEles = allEles.slice(start, end);
  return requiredEles.join(separator);
};

const tail = (content, { option, count }) => {
  const separators = { '-n': '\n', '-c': '' };
  const separator = separators[option];
  return cutText(content, { separator, start: -count });
};

const isOption = (option) => {
  return option.startsWith('-');
};

const parseTailArgs = (args) => {
  const defaultOptions = {
    option: '-n',
    count: 10
  };
  if (args.length < 1) {
    return defaultOptions;
  }

  if (isOption(args[0])) {
    defaultOptions.option = args[0];
    defaultOptions.count = args[1];
  }
  return defaultOptions;
};

const tailMain = (content, ...args) => {
  const option = parseTailArgs(args);
  return tail(content, option);
};

exports.tail = tail;
exports.tailMain = tailMain;
