#!/usr/bin/env node
'use strict';

let program = require('commander'),
	pkg = require('./../package.json');

program
	.option('-t, --target', 'Target platform')
	.option('--aar', 'Generate android AAR');

program.parse(process.argv);


if (program.aar) {
	var generate_aar = require('./build/generate_aar'),
		options = {};

	//if (program.target) {
	//	options.target = program.target;
	//}

	generate_aar(options);
}
