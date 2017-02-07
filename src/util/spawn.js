'use strict';

let Q = require('q'),
	child_process = require('child_process');

module.exports = function spawn(command, args, options) {
	let deferred = Q.defer(),
		child = child_process.spawn(command, args, options),
		capturedOut = '',
		capturedErr = '';

	if (child.stdout) {
		child.stdout.on('data', function(data) {
			capturedOut += data;
			deferred.notify({ 'stdout': data });
		});
	}

	if (child.stderr) {
		child.stderr.on('data', function(data) {
			capturedErr += data;
			deferred.notify({ 'stderr': data });
		});
	}

	child.on('close', whenDone);
	child.on('error', whenDone);

	function whenDone(arg) {
		child.removeListener('close', whenDone);
		child.removeListener('error', whenDone);

		let code = typeof arg == 'number' ? arg : arg && arg.code;

		if (code === 0) {
			deferred.resolve(capturedOut.trim());
		}
		else {
			let errMsg = command + ': Command failed with exit code ' + code;
			if (capturedErr) {
				errMsg += ' Error output:\n' + capturedErr.trim();
			}
			let err = new Error(errMsg);
			err.code = code;
			err.stdout = capturedOut;
			err.stderr = capturedErr;

			deferred.reject(err);
		}
	}

	return deferred.promise;
};
