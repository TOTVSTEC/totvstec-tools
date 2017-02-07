'use strict';

let path = require('path'),
	Q = require('q'),
	semver = require('semver'),
	shelljs = require('shelljs');

const DEFAULT_OPTIONS = {
	cwd: process.cwd(),
	sufix: '',
	increment: 'patch',
	version: ''
};

const INCREMENT_TYPE = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'];

function read(file) {
	let pkg = JSON.parse(shelljs.cat(file));

	return pkg.version;
}

function inc(version, type, prefix) {
	let result;

	result = semver.inc(version, type);

	if (prefix)
		result += '-' + prefix;

	return result;
}

function write(file, version) {
	let content = shelljs.cat(file),
		pkg = JSON.parse(content);

	pkg.version = version;

	content = JSON.stringify(pkg, null, 2) + '\n';
	shelljs.ShellString(content).to(file);
}

function valid(version) {
	let validInc = (INCREMENT_TYPE.indexOf(version) != -1),
		validVersion = (semver.valid(version) !== null);

	return (validInc && validVersion);
}

module.exports = {
	inc: inc,
	read: read,
	write: write,
	valid: valid
};
