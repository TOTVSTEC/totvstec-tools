'use strict';

let cli = require('./cli');

class GitRepo {
	/*
	constructor(options) {
		this.cwd = options.cwd;	// || path.join(__basedir, 'build', 'release', options.name);
		this.url = options.url; // || GITHUB_PREFIX + this.repo + '.git';
	}

	checkout() {
		let home = process.cwd();

		shelljs.rm('-rf', this.cwd);
		shelljs.mkdir('-p', this.cwd);
		shelljs.cd(this.cwd);

		this.exec('git clone -b master ' + this.url + ' .');
		this.exec('git checkout -B master');

		shelljs.cd(home);
	}

	tag(tag, comment) {
		let home = process.cwd();

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
	*/

	static push(flags, options) {
		let args = ['git', 'push'];

		return cli.execCommand(args, flags, options);
	}

	static commit(flags, options) {
		let args = ['git', 'commit'];

		return cli.execCommand(args, flags, options);
	}

}

module.exports = GitRepo;
