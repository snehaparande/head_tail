// console.log('usage: head [-n lines | -c bytes] [file ...]');
const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    console.log(headMain(fs.readFileSync, ...process.argv.slice(2)));
  } catch (error) {
    console.error(error.message);
  }
};

main();
