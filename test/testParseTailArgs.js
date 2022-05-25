const assert = require('assert');
const { parseTailArgs } = require('../src/parseTailArgs.js');

describe('parseTailArgs', () => {
  it('Should parse when no options are given', () => {
    const expected = { option: '-n', optionArg: 10 };
    assert.deepStrictEqual(parseTailArgs([]), expected);
  });

  it('Should parse -n option with optionArg', () => {
    const expected = { option: '-n', optionArg: 2 };
    assert.deepStrictEqual(parseTailArgs(['-n', '2']), expected);
  });

  it('Should parse -c option with optionArg', () => {
    const expected = { option: '-c', optionArg: 2 };
    assert.deepStrictEqual(parseTailArgs(['-c', '2']), expected);
  });

});
