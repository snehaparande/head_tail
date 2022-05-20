const assert = require('assert');
const { head } = require('../src/headLib.js');

describe('head', () => {
  it('Should return the same line when 1 line is given', () => {
    assert.equal(head('This is line'), 'This is line');
  });

});
