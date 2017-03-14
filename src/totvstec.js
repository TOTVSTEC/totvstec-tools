#!/usr/bin/env node
'use strict';

let program = require('commander'),
	pkg = require('./../package.json');

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
