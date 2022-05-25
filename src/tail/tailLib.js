const tail = (content) => {
  return content.split('\n').slice(-10).join('\n');
};

exports.tail = tail;
