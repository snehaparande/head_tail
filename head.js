// console.log('usage: head [-n lines | -c bytes] [file ...]');
const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = () => {
  let exitStatus = 0;
  try {
    exitStatus = headMain(fs.readFileSync,
      console.error,
      console.log,
      ...process.argv.slice(2)
    );
  } catch (error) {
    console.error(error.message);
    exitStatus = 1;
  }
  return exitStatus;
};

process.exit(main());
