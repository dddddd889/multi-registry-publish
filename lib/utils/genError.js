const logger = require('./logger')

	module.exports = function genError(msg) {
		logger.error(msg)
		return new Error(msg)
	}