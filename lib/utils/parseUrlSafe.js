module.exports = function parseUrlSafe(registry) {
	try {
		return new URL(registry)
	} catch (error) {
		return null
	}
}