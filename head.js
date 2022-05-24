// console.log('usage: head [-n lines | -c bytes] [file ...]');
const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    headMain(fs.readFileSync,
      console.error,
      console.log,
      ...process.argv.slice(2)
    );
  } catch (error) {
    console.error(error.message);
  }
};

main();
