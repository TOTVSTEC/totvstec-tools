#!/usr/bin/env node
'use strict';

var program = require('commander'),
	programName = require('./util/program-name'),
	release = require('./release'),
	version = require('./util/version');

process.title = program._name = programName(__filename);

program
	.arguments('[version]')
	.description('The new version or increment type (patch, minor, major)')
	.option('-N, --npm', 'Release in NPM')
	.option('-T, --target', 'Target Dir')
	.parse(process.argv);

let options = {
	type: 'patch',
	cwd: process.cwd()
};

if (program.npm) {
	options.publishNpm = true;
}

if (program.file) {
	console.log(JSON.stringify(program.file));

	options.file = program.file;
}


//process.exit(0);

if (program.args.length > 0) {
	if (version.valid(program.args[0]))
		options.type = program.args[0];
}

release(options)
	.then(() => {
		console.log('FINISHED!');

		process.exit();
	})
	.catch((err) => {
		console.error(err);

		process.exit(-1);
	});











//console.log(JSON.stringify(program, null, 2));
