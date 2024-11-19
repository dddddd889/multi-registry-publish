const pack = require('libnpmpack')
const { publish } = require('libnpmpublish')
const logger = require('./logger')
const { pureNpmrc } = require('./parseTokenFromNpmrc')

module.exports = async function publishWithoutShell(registry, tag) {
	const tarData = await pack("file:.", {
		// dryRun: false,  // 用于测试是否打包本地目录
		dryRun: true,
		foregroundScripts: true, // 前台运行
		packDestination: process.cwd(),
		ignoreScripts: true,
	})

	try {
		const res = await publish({
			tag,
			name: pkg.name,
			version: pkg.version,
			description: pkg.description,
		}, tarData, {
			gzip: true,
			registry,
			...pureNpmrc(), // 解析token
		})

		if (res.ok) {
			console.log()
			logger.info(`${res.status} ${res.statusText} 发布成功`)
		}
	} catch (error) {
		logger.error(error)
	}
}