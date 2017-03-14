#!/usr/bin/env node
'use strict';

let program = require('commander'),
	release = require('./release/release'),
	version = require('./util/version');

program
	.arguments('[version]')
	.description('The new version or increment type (patch, minor, major)')
	.option('-N, --npm-publish', 'Publish the release in NPM')
	.option('-T, --target', 'Target Dir')
	.parse(process.argv);

let options = {
	type: 'patch',
	cwd: process.cwd()
};

options.npmPublish = !!program.npmPublish;

if (program.target) {
	options.cwd = program.target;
}

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
