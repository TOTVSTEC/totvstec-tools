'use strict';

var path = require('path'),
	Q = require('q'),
	shelljs = require('shelljs'),
	GITHUB_PREFIX = 'https://github.com/TOTVSTEC/',
	FILES = ['package.json', 'bower.json'];

class GitRepo {

	constructor(options) {
		this.cwd = options.cwd;	// || path.join(__basedir, 'build', 'release', options.name);
		this.url = options.url; // || GITHUB_PREFIX + this.repo + '.git';
	}

	checkout() {
		var home = process.cwd();

		shelljs.rm('-rf', this.cwd);
		shelljs.mkdir('-p', this.cwd);
		shelljs.cd(this.cwd);

		this.exec('git clone -b master ' + this.url + ' .');
		this.exec('git checkout -B master');

		shelljs.cd(home);
	}
	/*
		commit(comment) {
			var home = process.cwd();

			shelljs.cd(this.cwd);

			this.exec('git commit -m "' + comment + '" --all', 'Committed');
			this.exec('git push', 'Pushed to remote');

			shelljs.cd(home);
		}
	*/
	tag(tag, comment) {
		var home = process.cwd();

		shelljs.cd(this.cwd);

		this.exec('git tag -a ' + tag + ' -m "' + comment + '"', 'Tag ' + tag + ' created');
		this.exec('git push --tags', 'Pushed new tag ' + tag + ' to remote');

		shelljs.cd(home);
	}

	exec(command, desc) {
		console.log('> ' + command);

		if (desc)
			console.log(desc);

		shelljs.exec(command);
	}

	static push(args, options) {
		return GitRepo.execCommand('push', args, options);
	}

	static commit(args, options) {
		return GitRepo.execCommand('commit', args, options);
	}

	static execCommand(subCommand, args, options) {
		let deferred = Q.defer(),
			parsedArgs = GitRepo.parseArgs(args),
			command = ['git', subCommand].concat(parsedArgs).join(' ');

		shelljs.exec(command, (code, stdout, stderr) => {
			if (code) {
				return deferred.reject(code);
			}

			deferred.resolve();
		});

		return deferred.promise;
	}

	static parseArgs(args) {
		return Object.keys(args || {}).map((key, index, array) => {
			let value = '--' + key;

			if (args[key] !== true)
				value += '=' + args[key];

			return value;
		});
	}


}

module.exports = GitRepo;
