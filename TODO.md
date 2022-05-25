## **TAIL:**
  **Todo:**
  - [ ] Change the directory structure
    - [ ] Remove the `head` and `tail` separation

  **Maybe:**


  **Done:**
  - [x] Extract a function from `tail`
  - [x] Make `tail` work for bytes (-c) option
  - [x] Make `tail` function work for count (-n) option
    - [x] Take the option as an object to the `tail`
  - [x] Make `tail` work for more than 10 lines
  - [x] Make `tail` work for 10 or less lines
  - [x] Write test case for tail
  - [x] Make `testTail.js`.
  - [x] Make separate directories for `head` and `tail` in `src` and `test`


## **HEAD:**
  **Todo:**

  **Maybe:**

  **Done:**
  - [x] Return exit code
  - [x] Refactor `headMain`
    - [x] Ectract a function for printing
  - [x] Print the output from `headMain` instead of `main`
  - [x] Make `headMain` work for multiple files
    - [x] Add header for each file
  - [x] Make `head` work for multiple files
  - [x] Validate the arguments of `headMain`
  - [x] Make `getResult` return return error staturn also
    -[x] Change the structure of the return object
  - [x] Make `parseArgs` handle combined options
  - [x] Make `parseArgs` parse `-[number]`
  - [x] Test `getResult`
  - [x] Move validation functions to separate file
  - [x] Make the `parseArgs` show the usage when no file is given
  - [x] Make `parseArgs` work for multiple files
    - [x] Take an array for fileNames
  - [x] Use iterator in `parseArgs` for arguments
  - [x] Make `parseArgs` handle options and option arguments together 
  - [x] Validate options
  - [x] Validate count of lines and bytes
  - [x] Make head.js run from command line
  - [x] Make `parseArgs` handle same options multiple times
  - [x] Test `parseArgs`
  - [x] Make `parseArgs`
    - [x] It takes the arguments and returns the parsed arguments
  - [x] Make a `headMain` function
  - [x] It should take `fileReader` and `arguments` 
  - [x] Should return the head of the given text
  - [x] Make `head` work on file content instade of file
  - [x] Implement the bytes (-c) option for `head` function
  - [x] Make `head` function
    - [x] It takes `text` and `option` as argument and returns the head of `text` based on the `option`
    - [x] `option` argument is an object having `option` and `optionArg` as keys
  - [x] Rename function `head` to `cutText`
  - [x] Take the `seperator` and `count` as object
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
