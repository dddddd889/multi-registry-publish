const genError = require('./genError')
const fetch = require('./http')
const logger = require('./logger')

async function doPing(registry) {
	try {
		logger.info(`${registry} ping`)
		await fetch.head(registry)
		logger.info(`${registry} ping success`)
	} catch (err) {
		throw genError(`${registry} ping 错误 ${err.message}`, )
	}
}

module.exports = function ping(url) {
	return doPing(url).then(
		() => true,
		() => false
	)
}