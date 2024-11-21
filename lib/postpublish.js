const { spawn } = require('child_process')
const { CACHE_NAME } = require('./constants/var')
const { jsonWriter } = require('./utils/jsonOp')
const { restorePackage } = require('./utils/storePackage')
const logger = require('./utils/logger')

const args = process.argv.slice(2)

module.exports = async function postpublish(packCache) {
	if (packCache?.index < packCache?.data?.publishConfig?.length - 1) {
		packCache.index = packCache.index + 1
		jsonWriter(CACHE_NAME, packCache)
		const childProcess = spawn('npm', ['publish', ...args], { shell: true, stdio: 'inherit' })
		// 启动子进程时监听父进程是否关闭，同步关闭子进程
		process.on('SIGKILL', () => {
			childProcess.kill('SIGKILL')
		})
		process.on("SIGTERM", () => {
			childProcess.kill("SIGTERM")
		})

		// 监听子进程的错误
		child.on('error', (err) => {
			logger.error(`发布失败: ${err?.message}`)
			process.exit(1)
		});

		// 监听子进程的退出事件
		child.on('exit', (code, signal) => {
			if (code !== 0 || signal !== null) {
				logger.error(`子进程异常退出：signal=${signal} code=${code}`)
				process.exit(1)
			}
		});

	} else {
		await restorePackage(packCache);
	}
}
