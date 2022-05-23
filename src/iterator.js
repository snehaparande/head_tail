const current = function () {
  return this.args[this.index];
};

const next = function () {
  this.index++;
  return this.args[this.index];
};

const restOf = function () {
  return this.args.slice(this.index);
};

const createIterator = (args) => {
  const iterator = {
    args,
    index: 0
  };

  iterator.current = current;
  iterator.next = next;
  iterator.restOf = restOf;

  return iterator;
};

exports.createIterator = createIterator;
