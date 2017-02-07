'use strict';

let path = require('path'),
	Q = require('q'),
	shelljs = require('shelljs'),
	git = require('./util/git'),
	npm = require('./util/npm'),
	version = require('./util/version');

const DEFAULT_OPTIONS = {
	type: 'patch',
	cwd: process.cwd(),
	publishNpm: false
};
const SUPORTED_FILES = ['package.json', 'bower.json'];

function release(options) {
	options = Object.assign({}, DEFAULT_OPTIONS, options);

	let files = readFiles(options.cwd, options.files || SUPORTED_FILES);

	if (files.length === 0) {
		return Q.reject(new Error('No project files found!'));
	}
	else if (files.length > 1) {
		if (!checkFiles(files)) {
			return Q.reject(new Error('Project files version not match!'));
		}
	}

	let curentVersion = version.read(files[0]),
		releaseVersion = version.inc(curentVersion, options.type),
		devVersion = version.inc(releaseVersion, 'patch', 'SNAPSHOT');

	return npm.version(releaseVersion)
		.then(() => {
			if (options.publishNpm) {
				return npm.publish();
			}
		})
		.then(() => {
			return git.push({ tags: true });
		})
		.then(() => {
			return files.reduce((promise, file, index) => {
				return promise.then(() => {
					return version.write(file, devVersion);
				});
			}, Q());
		})
		.then(() => {
			return git.commit({ all: true, message: '"Version ' + devVersion + '"' });
		})
		.then(() => {
			return git.push();
		});
}

function readFiles(cwd, files) {
	let result = [];

	files.forEach((filename) => {
		let file = path.join(cwd, filename);

		if (shelljs.test('-e', file)) {
			result.push(file);
		}
	});

	return result;
}

function checkFiles(files) {
	let first = version.read(files[0]);

	for (var i = 1; i < files.length; i++) {
		let current = version.read(files[i]);

		if (current !== first) {
			return false;
		}
	}

	return true;
}

module.exports = release;
