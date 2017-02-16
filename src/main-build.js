#!/usr/bin/env node
'use strict';

let program = require('commander'),
	pkg = require('./../package.json'),
	programName = require('./util/program-name');

process.title = program._name = programName(__filename);

program
	.option('-t, --target', 'Target platform')
	.option('--aar', 'Generate android AAR');

program.parse(process.argv);


if (program.aar) {
	var generate_aar = require('./generate_aar'),
		options = {};

	//if (program.target) {
	//	options.target = program.target;
	//}

	generate_aar(options);
}
