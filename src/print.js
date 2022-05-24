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

  let status = 0;
  results.forEach(element => {
    status = status || printWithHeader(element, consoleLog, consoleError);
  });
  return status;
};

exports.print = print;
