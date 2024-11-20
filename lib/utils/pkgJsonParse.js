const path = require('path')
const fs = require('fs')
const JsonParseSafe = require('./jsonParseSafe');
const pkgDefault = require('../constants/pkgDefault');
const logger = require('./logger');

module.exports = function pkgJsonParse(contextDir) {
	const pkgJsonPath = path.join(contextDir, process.env.CONFIG_JSON || 'package.json')
	if (fs.existsSync(pkgJsonPath)) {
		const toBeParsedBuffer = fs.readFileSync(pkgJsonPath)
		logger.info(`解析package.json：${pkgJsonPath}`)
		return JsonParseSafe(toBeParsedBuffer.toString(), pkgDefault)
	}

	return null
}