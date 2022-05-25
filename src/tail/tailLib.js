const tail = (content, { option, count }) => {
  const separators = { '-n': '\n', '-c': '' };
  const separator = separators[option];
  return content.split(separator).slice(-count).join(separator);
};

exports.tail = tail;
