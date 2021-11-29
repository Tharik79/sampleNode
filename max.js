console.log("max !!!!");
// string to array => JSON.parse
console.log(process.argv);

const [,, nums] = process.argv;
console.log(nums);

console.log("input string:", nums);
const arr = JSON.parse