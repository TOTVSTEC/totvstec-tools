'use strict';

let path = require('path');

module.exports = function(file) {
	let name = path.basename(file, '.js');

	return name.replace(/main/ig, 'totvstec').replace(/-/ig, ' ');
};
