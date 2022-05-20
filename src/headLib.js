const cutElements = (elements, noOfElements) => elements.slice(0, noOfElements);

const head = (text, noOfLines) => {
  const allLines = text.split('\n');
  return cutElements(allLines, noOfLines).join('\n');
};

exports.head = head;
