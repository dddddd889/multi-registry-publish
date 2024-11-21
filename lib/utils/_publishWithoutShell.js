const { publish } = require('libnpmpublish')
const logger = require('./logger')
const { pureNpmrc } = require('./parseTokenFromNpmrc')

module.exports = async function publishWithoutShell(tarData, { registry, tag } = {}, pkg = {}) {
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
			logger.info(`${res.status} ${res.statusText} 发布成功`)
		}
		return true
	} catch (error) {
		logger.error(`发布异常 ${error?.message}`)
		return false
	}
}