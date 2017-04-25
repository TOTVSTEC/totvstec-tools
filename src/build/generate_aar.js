'use strict';

let fs = require('fs'),
	shelljs = require('shelljs'),
	Q = require('q'),
	path = require('path'),
	spawn = require('../util/spawn'),
	directory;

const DEFAULT_OPTIONS = {
	target: process.cwd()
};

const BEGIN_QT = '<!-- BEGIN:QT_METADATA -->';
const END_QT = '<!-- END:QT_METADATA -->';

module.exports = function generate_aar(options) {
	options = Object.assign({}, DEFAULT_OPTIONS, options);

	directory = options.target;

	if (fs.existsSync(directory)) {
		directory = path.resolve(directory);
		let androidBuild = path.join(directory, 'android-build');

		if (fs.existsSync(androidBuild)) {
			directory = androidBuild;
		}
	}

	return prepare()
		.then(() => build())
		.then(() => copy());
};

function prepare() {
	var content = fs.readFileSync(path.join(directory, 'AndroidManifest.xml'), { encoding: 'utf8' });
	var patt = new RegExp(BEGIN_QT + '((.|\n|\r)*?)' + END_QT, "gm");
	var qtMeta = patt.exec(content);
	var temp = '';

	if (qtMeta.length === 3) {
		//trim all lines
		temp = qtMeta[1].replace(/(^\s+)|(\s+$)/gm, '');

		fs.writeFileSync(path.join(directory, 'qt_metadata.txt'), temp);
	}

	//temp = content.replace(/<application(.|\n|\r)*?<\/application>/gm, '');
	temp = content.replace(/(<manifest(?:.|\n|\r)*?>)(.|\n|\r)+(<\/manifest>)/igm, '$1\n$3');

	fs.writeFileSync(path.join(directory, 'AndroidManifest.aar.xml'), temp);

	content = fs.readFileSync(path.join(directory, 'build.gradle'), { encoding: 'utf8' });

	content = content.replace(/apply plugin: 'com\.android\.application'/gm,
		'apply plugin: \'com.android.library\'');

	content = content.replace(/manifest\.srcFile 'AndroidManifest\.xml'/gm,
		'manifest.srcFile \'AndroidManifest.aar.xml\'');


	fs.writeFileSync(path.join(directory, 'build.aar.gradle'), content);

	shelljs.rm('-rf', path.join(directory, 'assets', 'appserver.ini'));
	shelljs.rm('-rf', path.join(directory, 'assets', 'smartclient.ini'));
	shelljs.rm('-rf', path.join(directory, 'assets', '*.rpo'));

	return Q();
}

function build() {
	let command,
		args = [],
		options = {
			cwd: directory,
			stdio: ['ignore', 'pipe', 'pipe']
		},
		proc;

	if (process.platform === 'win32') {
		command = 'cmd.exe';
		args = args.concat(['/c', 'gradlew.bat']);
	}
	else {
		command = './gradlew';
	}

	args = args.concat(['-b', 'build.aar.gradle', 'clean', 'build']);

	return spawn(command, args, options)
		.progress((data) => {
			maybeWrite(data.stdout, 'log');
			maybeWrite(data.stderr, 'error');
		});
}

function maybeWrite(buffer, target) {
	if (buffer) {
		let out = buffer.toString('utf8');

		if (out.trim())
			console[target](out);
	}
}

function copy() {
	var src = path.join(directory, 'build', 'outputs', 'aar');

	shelljs.cp('-Rf',
		path.join(src, 'android-build-debug.aar'),
		path.join(directory, 'com.totvs.smartclient-DEBUG.aar'));

	shelljs.cp('-Rf',
		path.join(src, 'android-build-release.aar'),
		path.join(directory, 'com.totvs.smartclient.aar'));
}
