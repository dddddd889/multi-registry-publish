const logger = require('./logger')
const parseUrlSafe = require('./parseUrlSafe')

module.exports = async function remotePkgInfo(registry, name) {
	const newUrl = parseUrlSafe(registry)
	newUrl.pathname = `${newUrl.pathname}${name}`
	logger.info(`获取${name}远端pkg配置`)
	const res = await fetch.get(newUrl)
	logger.info(`获取${name}远端pkg配置 成功`)
	return res
}