const parseToken = require('./parseTokenFromNpmrc');
const logger = require('./logger');
const genError = require('./genError');
const parseUrlSafe = require('./parseUrlSafe');
const ping = require('./ping');
const fetch = require('./http');

/**
 * 
 * @param {import('URL').URL} registry 
 * @returns 
 */
module.exports = async function whoami(registry) {
	const pingSucess = await ping(registry)
	if (!pingSucess) {
		throw genError(`${registry} 链接失败`)
	}

	const url = parseUrlSafe(registry)
	if (!url) {
		throw genError(`${registry} 解析为URL，解析失败`)
	}

	logger.info(`${registry} 解析token`)
	const token = parseToken(url)
	if (!token) {
		throw genError(`${registry} 无效的token`)
	}

	try {
		url.pathname = `/-/whoami`
		logger.info(`${registry} 当前用户是`)
		const res = await fetch.get(url, {
			headers: {
				authorization: `Bearer ${token}`
			}
		})
		logger.info(`${registry} ${res?.username}`)
		// process.env.CI
		if (!res?.username) {
			throw genError(`${registry} whoami 未知用户`, )
		}
		return res?.username
	} catch (err) {
		throw genError(`${registry} whoami 错误 ${err.message}`, )
	}
}
