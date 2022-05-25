const tail = (content, { count }) => {
  return content.split('\n').slice(-count).join('\n');
};

exports.tail = tail;
