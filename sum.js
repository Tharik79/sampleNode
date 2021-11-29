console.log("Hello, 🌏 !!! 😀");

const sum = (a,b) => a + b;
console.log(sum(4,5));

console.log(process.argv);

const num1 = process.argv[2];
const num2 = process.argv[3];

console.log(sum(num1 + num2));//we get 67 as result becoz 6 and 7 are strings //[
//     'C:\\Program Files\\nodejs\\node.exe',
//     'D:\\sampleNode\\index.js',
//     '6',
//     '7'
//   ]

console.log(sum(+num1 , +num2));

const [, , num1, num2] = process.argv;
console.log(sum(num1, num2) );
