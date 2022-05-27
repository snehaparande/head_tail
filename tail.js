// console.log('usage: tail [-c # | -n #] [file ...]');

const fs = require('fs');

const { tailMain } = require('./src/tailLib.js');

const main = () => {
  try {
    return tailMain(fs.readFileSync,
      console.error,
      console.log,
      ...process.argv.slice(2)
    );
  } catch (error) {
    console.error(error.message);
    return 1;
  }
};

process.exit(main());
