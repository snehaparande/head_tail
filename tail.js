const fs = require('fs');

const { tailMain } = require('./src/tailLib.js');

const main = () => {
  try {
    process.exitCode = tailMain(fs.readFileSync,
      console.error,
      console.log,
      ...process.argv.slice(2)
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main();
