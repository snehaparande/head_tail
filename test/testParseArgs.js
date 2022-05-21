const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('Should parse only file name ', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), {
      fileName: 'a.txt',
      option: { option: '-n', optionArg: 10 }
    });
  });

  it('Should parse -n option along with file name ', () => {
    assert.deepStrictEqual(parseArgs(['-n', 5, 'a.txt']), {
      fileName: 'a.txt',
      option: { option: '-n', optionArg: 5 }
    });
  });

  it('Should parse -c option along with file name ', () => {
    assert.deepStrictEqual(parseArgs(['-c', 5, 'a.txt']), {
      fileName: 'a.txt',
      option: { option: '-c', optionArg: 5 }
    });
  });

});
