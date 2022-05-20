const head = (text, noOfLines) => {
  const allLines = text.split('\n');
  const requiredLines = allLines.slice(0, noOfLines);
  return requiredLines.join('\n');
};

exports.head = head;
