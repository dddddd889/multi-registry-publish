const { spawn } = require('child_process')
const genError = require('./genError')
const logger = require('./logger')

module.exports = function publish(cwd, registry, ...args) {
	return new Promise((resolve, reject) => {
		const command = 'npm'
		const argv = ['publish', `--registry=${registry}`, '--verbose', ...args]
		logger.info(`${command} ${args.join(' ')}`)
		const child = spawn(command, argv, { shell: true, cwd, stdio: 'inherit' })

		// 监听中断信号
		// kill -15 <pid> or kill -SIGTERM <pid>
		// <ctrl-c> || kill -2  <pid> || kill -SIGINT <pid>
		process.on('SIGINT', () => {
			child.kill('SIGINT');
		})

		// 监听进程终止信号
		// kill -15 <pid> or kill -SIGTERM <pid>
		process.on('SIGTERM', () => {
			child.kill('SIGTERM');
		})

		child.on('error', (e) => {
			reject(genError(`发布${registry}失败 ${e.message}`))
		})

		child.on('exit', (code, signal) => {
			if (signal || code > 0) {
				reject(genError(`发布${registry} 中断。信号值：${signal} 退出码：${code}`))
			} else {
				resolve();
			}
		})
	})
}
