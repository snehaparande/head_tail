const NEW_LINE = '\n';
const splitLines = (text) => text.split(NEW_LINE);
const joinLines = (requiredLines) => requiredLines.join(NEW_LINE);

const cutElements = (elements, noOfElements) => elements.slice(0, noOfElements);

const head = (text, noOfLines) => {
  const allLines = splitLines(text);
  const requiredLines = cutElements(allLines, noOfLines);
  return joinLines(requiredLines);
};

exports.head = head;
