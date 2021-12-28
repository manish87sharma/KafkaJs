const {parentPort} = require("worker_threads");
const getFib =require('./fibo');

parentPort.on("message", data => {
  parentPort.postMessage({num: data.num, fib: getFib(data.num)});
});

module.exports = getFib;