const printWithoutHeader = (result, consoleLog, consoleError) => {
  if (result.error) {
    consoleError(result.result.message);
    return;
  }
  consoleLog(result.result);
};

const printWithHeader = (result, consoleLog, consoleError) => {
  if (result.error) {
    consoleError(result.result.message);
    return;
  }
  consoleLog(`==> ${result.fileName} <==`);
  consoleLog(result.result);
};

const print = (results, consoleLog, consoleError) => {
  if (results.length === 1) {
    printWithoutHeader(results[0], consoleLog, consoleError);
    return;
  }

  results.forEach(element => {
    printWithHeader(element, consoleLog, consoleError);
  });
};

exports.print = print;
