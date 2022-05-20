const head = (text) => {
  const allLines = text.split('\n');
  const requiredLines = allLines.slice(0, 10);
  return requiredLines.join('\n');
};

exports.head = head;
