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

exports.tail = tail;
