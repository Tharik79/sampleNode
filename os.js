//how to find computer OS details.

const os = require("os");// os is in-built package

console.log("Os version:", os.version());
console.log("Free memory", os.freemem());
console.log("Total Memory", os.totalmem());
console.log("CPU", os.cpus());
console.log("Host Name", os.hostname());