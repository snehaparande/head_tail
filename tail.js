const fs = require('fs');

const { tailMain } = require('./src/tailLib.js');

const main = (args) => {
  try {
    process.exitCode = tailMain(fs.readFileSync,
      console.error,
      console.log,
      ...args
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main(process.argv.slice(2));
