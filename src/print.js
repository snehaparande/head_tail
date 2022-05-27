const printWithoutHeader = (result, consoleLog, consoleError) => {
  if (result.error) {
    consoleError(result.result.message);
    return 1;
  }
  consoleLog(result.result);
  return 0;
};

const printWithHeader = (result, consoleLog, consoleError) => {
  if (result.error) {
    consoleError(result.result.message);
    return 1;
  }
  consoleLog(`==> ${result.fileName} <==`);
  consoleLog(result.result);
  return 0;
};

const print = (results, consoleLog, consoleError) => {
  if (results.length === 1) {
    return printWithoutHeader(results[0], consoleLog, consoleError);
  }

  results.forEach(element => {
    printWithHeader(element, consoleLog, consoleError);
  });
  return results.some(result => result.error) ? 1 : 0;
};

exports.print = print;
