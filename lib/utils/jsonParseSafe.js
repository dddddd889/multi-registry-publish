module.exports = function JsonParseSafe(toBeParsed, defaultValue = '') {
	try {
		return JSON.parse(toBeParsed)
	} catch (error) {
		return defaultValue	
	}
}