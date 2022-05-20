const cutLines = (lines, noOfLines) => lines.slice(0, noOfLines);

const head = (text, noOfLines) => {
  const allLines = text.split('\n');
  return cutLines(allLines, noOfLines).join('\n');
};

exports.head = head;
