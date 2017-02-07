#!/usr/bin/env node

'use strict';

process.title = 'cloudbridge';

var argv = require('minimist')(process.argv.slice(2));

if (argv._.length > 1) {
	if ((argv._[0] === 'android') && (argv._[1] === 'aar')) {
		var generator = require('./generate_aar');

		generator(argv);
	}
}
//console.log(JSON.stringify(argv, null, 2));