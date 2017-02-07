#!/usr/bin/env node
'use strict';

let program = require('commander'),
	pkg = require('./../package.json'),
	programName = require('./util/program-name');

process.title = program._name = programName(__filename);

program
	.option('-t, --target', 'Target platform');


program.parse(process.argv);
