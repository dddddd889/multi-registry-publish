const { spawn } = require('child_process')
const { jsonWriter } = require('./utils/jsonOp')
const { restorePackage } = require('./utils/storePackage')
const genError = require('./utils/genError')
const { CACHE_NAME } = require('../runtime')
const logger = require('./utils/logger')

module.exports = async function postpublish(packCache) {
	if (packCache?.index < packCache?.data?.publishConfig?.length - 1) {
		packCache.index = packCache.index + 1
		jsonWriter(CACHE_NAME, packCache)
		const argsCompose = ['publish'].concat(packCache?.args ?? [])
		logger.info('发布镜像脚本：npm ', argsCompose.join(' '))
		const childProcess = spawn('npm', argsCompose, { shell: true, stdio: 'inherit' })
		// 启动子进程时监听父进程是否关闭，同步关闭子进程

		// 监听子进程的错误
		childProcess.on('error', (err) => {
			throw genError(`发布失败: ${err?.message}`)
		});

		// 监听子进程的退出事件
		childProcess.on('exit', (code, signal) => {
			if (code !== 0 || signal !== null) {
				throw genError(`子进程异常退出：signal=${signal} code=${code}`)
			}
		});
	} else {
		logger.info("发布结束")
		await restorePackage(packCache);
	}
}
