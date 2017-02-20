'use strict';

let cli = require('./cli');

class GitRepo {


	static push(flags, options) {
		let args = ['git', 'push'];

		return cli.execCommand(args, flags, options);
	}

	static commit(flags, options) {
		let args = ['git', 'commit'];

		return cli.execCommand(args, flags, options);
	}

	static tag(flags, options) {
		let args = ['git', 'tag'];

		return cli.execCommand(args, flags, options);
	}

	static clone(args, flags, options) {
		args = ['git', 'clone'].concat(args);

		return cli.execCommand(args, flags, options);
	}

	static checkout(flags, options) {
		let args = ['git', 'checkout'];

		return cli.execCommand(args, flags, options);
	}





}

module.exports = GitRepo;
