'use strict';

let spawn = require('./spawn'),
	shelljs = require('shelljs');

const npmExe = shelljs.which('npm').stdout;

class NPM {

	static version(newVersion, options) {
		var promise = spawn(npmExe, ['version', newVersion], options);

		promise.progress((data) => {
			if (data.stdout)
				console.log(data.stdout.toString('utf8'));

			if (data.stderr)
				console.error(data.stderr.toString('utf8'));
		});

		return promise;
	}

}

module.exports = NPM;
