const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    process.exitCode = headMain(fs.readFileSync,
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
