"use strict"
const {getCSVContentAsArray} = require(`./lib/readCSV.js`);

const readTicks = async (filename) => {
    const arr = await getCSVContentAsArray(filename);
    return arr;
}

readTicks(`sample.csv`).then(result => {
    // TODO further processing.
    try {
        console.log(result);
    } catch (e) {
        console.log(e);
    }
    console.log(`done`);
}).catch((err) => {
    console.error("Error: ", err);
});