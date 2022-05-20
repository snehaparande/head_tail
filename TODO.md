**Todo:**
- [ ] Make a `headMain` function
- [ ] Implement the bytes (-c) option for `head` function
- [ ] Make `head` work on file content instade of file

**Maybe:**


**Done:**
- [x] Change `assert.equal` to `assert.strictEqual` in tests
- [x] Test `head` for bytes option
- [x] Change `splitLines` and `joinLines` to `splitBy` and `joinBy`
  - [x] `splitBy` and `joinBy` should take the separator as second argument.
- [x] Change the contract of `head` function
  - [x] `head` will take `text`, `separator` and `count` as arguments
- [x] Consider taking options as object to the `head` function
- [x] Extract `splitLines`, `joinLines` and `newline`
- [x] Change the name of function `cutLines` to `cutElements`
- [x] Extract a function from `head` for cutting lines
- [x] Make `head` function work for count (-n) option
- [x] Make `head` function work for more than 10 lines
- [x] Make `head` function work for 10 lines or less
- [x] Verify `mocha`
- [x] Write a test case
- [x] Make `testHead.js`
- [x] Make `test` and `src` directories
- [x] Cerate a readme for contract.
