const log = (message, context = "") => {
  console.log(`[${new Date().toISOString()}] ${context} => ${message}`);
};

module.exports = log;
