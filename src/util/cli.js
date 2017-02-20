'use strict';

let path = require('path'),
	Q = require('q'),
	shelljs = require('shelljs');

class CliUtils {

	static execCommand(args, flags, options) {
		let deferred = Q.defer(),
			parsedFlags = CliUtils.parseFlags(flags),
			command = args.concat(parsedFlags).join(' ');

		//console.log(command);

		shelljs.exec(command, options, (code, stdout, stderr) => {
			if (code) {
				return deferred.reject(code);
			}

			deferred.resolve();
		});

		return deferred.promise;
	}

	static parseFlags(args) {
		return Object.keys(args || {}).map((key, index, array) => {
			let value = key.length === 1 ? ('-' + key) : ('--' + key);

			if (args[key] !== true)
				value += ' ' + args[key];

			return value;
		});
	}

}

module.exports = CliUtils;
