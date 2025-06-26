"use strict"
const fs = require('fs');

/**
 * MAX_COLUMNS is the expected number of columns in the csv file.
 */
const MAX_COLUMNS = 15;

// via ChatGPT: a function to split a string that has items separated
// by commas, but also may have quotes used as separators.
// e.g. "2025-06-25","Tipsy Trees","5.4","First pitch, only."
// Notice the last comma is enclosed within quotes and so is not
// considered a separator.
function parseCSV(input) {
    if (input == '') return;
    const regex = /(?:^|,)\s*(?:"([^"]*(?:""[^"]*)*)"|([^",]*))/g;
    const result = [];
    let cols = 0;
    let match;
    while ((match = regex.exec(input)) !== null) {
        // match[1] is the quoted value, match[2] is the unquoted
        let value = match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2];
        result.push(value.trim());
        cols++;
        if (cols > MAX_COLUMNS) { // sanity check.
            console.log(`PROCESS EXIT on input: |${input}|`);
            process.exit();
        }
    }
    return result;
}

/**
 * Given an input file name, read it. Parse each csv-formatted row.
 * Returns an array of arrays. Each item in the top-level array
 * represents a route from Mountain Project.
 * Then each item in the subarray is content associated with that route.
 */
const getCSVContentAsArray = function(filename) {
	return new Promise(function(resolve, reject) {
		var rows = [];
		fs.readFile(filename, 'utf8', function(err, content) {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				rows = content.split(/\r?\n/);
				let results = new Array();
				rows.forEach((row, i) => {
                    try {
                        const items = parseCSV(row);
                        if (items) results.push(items);
                    } catch (e) {
                        console.log(`Exception was thrown:`);
                        console.log(e);
                        reject(e);
                    }
				});
 				resolve(results);
			}
		});
	});
}

if (typeof module !== 'undefined' && module.exports !== null) {
	exports.getCSVContentAsArray = getCSVContentAsArray;
}