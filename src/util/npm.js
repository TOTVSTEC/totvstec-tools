'use strict';

let cli = require('./cli');

class NPM {

	static version(value, flags, options) {
		let args = ['npm', 'version', value];

		return cli.execCommand(args, flags, options);
	}

	static publish(flags, options) {
		let args = ['npm', 'publish'];

		return cli.execCommand(args, flags, options);
	}

}

module.exports = NPM;
