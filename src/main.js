#!/usr/bin/env node
'use strict';

var program = require('commander'),
	pkg = require('./../package.json'),
	programName = require('./util/program-name');

process.title = program._name = programName(__filename);

program
	.usage('<command> [options]')
	.version(pkg.version);

program
	.command('build', 'Build the package')
	.command('release', 'Release the package');

	/*
	.action(() => {
		console.log("TESTEEEE!");
	})*/

program.parse(process.argv);

//console.log(program);


/*
process.title = 'cloudbridge';

var argv = require('minimist')(process.argv.slice(2));

if (argv._.length > 1) {
	if ((argv._[0] === 'android') && (argv._[1] === 'aar')) {
		var generator = require('./generate_aar');

		generator(argv);
	}
}
//console.log(JSON.stringify(argv, null, 2));
*/
