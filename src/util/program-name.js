'use strict';

var path = require('path');

module.exports = function(file) {
	var name = path.basename(file, '.js');

	return name.replace(/main/ig, 'totvstec').replace(/-/ig, ' ');
};
