const NEW_LINE = '\n';
const splitLines = (text) => text.split(NEW_LINE);
const joinLines = (requiredLines) => requiredLines.join(NEW_LINE);

const cutElements = (elements, noOfElements) => elements.slice(0, noOfElements);

const head = (text, separator, count) => {
  const allLines = splitLines(text);
  const requiredLines = cutElements(allLines, count);
  return joinLines(requiredLines);
};

exports.head = head;
