const fs = require("fs"); // in-built oackage
// fs is called file system
// fs.readFile("./welcome.txt", "utf-8", (err,data) => {
//     console.log(data);
// } 
// );


// const quote = "No beauty shines briter than that of a good heart";
// fs.writeFile("./awesome.txt", quote, (err) => {
//     console.log("completed writing !!!");
// });

// const quote2 = "live and let live";
// //Task  part -1 create 10 nos .txt files 
// for(i=1; i<= 10; i++){
//     fs.writeFile(`./backup/text-${i}.txt`, quote2, (err) => {
//         console.log("completed writing !!!", i);
//     });
// }



// const quote2 = "live and let live";
// //Task  part -2 create n no of Files as per wish.

// function createQuotes(noOfFiles, quote2){
//     for(i=1; i<= noOfFiles; i++){
//         fs.writeFile(`./backup/text-${i}.txt`, quote2, (err) => {
//             console.log("completed writing !!!", i);
//         });
//     }

// }
// const [, , noOfFiles] = process.argv;
// createQuotes(noOfFiles, quote2); // can excecute node file.js 20 or 30 40 to create more files.

const quote = "No beauty shines briter than that of a good heart";
const quote3 = "\n make everyday a little lessOrdinarily" // \n gives line break and appendfile adds another quote in the existing file.

fs.appendFile("./awesome.txt", quote3, (err) => {
    console.log("completed writing!!!");
});








