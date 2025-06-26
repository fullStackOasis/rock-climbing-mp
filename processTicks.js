"use strict"
const {getCSVContentAsArray} = require(`./lib/readCSV.js`);

const readTicks = async (filename) => {
    console.log(`Hello world!`);
    const arr = await getCSVContentAsArray(filename);
    console.log(`Printing csv results:`);
    console.log(JSON.stringify(arr));
}

const blah = readTicks(`sample.csv`);
console.log(`done`);