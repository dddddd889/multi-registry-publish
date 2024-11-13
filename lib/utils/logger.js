const fs = require('fs')
const path = require('path')
const { PassThrough } = require('stream')

const time = () => (new Date()).toLocaleString();

class Logger {
	constructor(directoryPath) {
		fs.mkdirSync('data/logs', { recursive: true });
		const multpass = new PassThrough()
		multpass.pipe(fs.createWriteStream(
			path.join(directoryPath, 'data/logs/info.log'),
			{ flags: 'a' },
		));
		multpass.pipe(process.stdout)
		this.infoLogFile = multpass

		const errorPass = new PassThrough()
		errorPass.pipe(fs.createWriteStream(
			path.join(directoryPath, 'data/logs/error.log'),
			{ flags: 'a' },
		));
		errorPass.pipe(process.stderr)
		this.errorLogFile = errorPass
	}

	info(...messages) {
		this.infoLogFile.write(`${time()} | ${messages.join(' - ')}\n`);
	}

	error(...messages) {
		this.errorLogFile.write(`${time()} | ${messages.join(' - ')}\n`);
	}
}

module.exports = new Logger(process.cwd());
