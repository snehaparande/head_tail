const splitBy = (text, separator) => text.split(separator);
const joinBy = (requiredLines, separator) => requiredLines.join(separator);

const cutElements = (elements, noOfElements) => elements.slice(0, noOfElements);

const cutText = (text, { separator, count }) => {
  const allElements = splitBy(text, separator);
  const requiredEles = cutElements(allElements, count);
  return joinBy(requiredEles, separator);
};

exports.cutText = cutText;
