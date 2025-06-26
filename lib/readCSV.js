"use strict"
const fs = require('fs');

/**
 * Given an input file name, read it.
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
				rows.forEach(function (item) {
                    console.log(item);
				});
				resolve(results);
			}
		});
	});
}

if (typeof module !== 'undefined' && module.exports !== null) {
	exports.getCSVContentAsArray = getCSVContentAsArray;
}