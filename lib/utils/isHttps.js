/**
 * 
 * @param {String | URL} url 
 * @returns 
 */
module.exports = function isHTTPS(url = '') {
	let u = url
	if (url instanceof URL) {
		u = url.toString()
	}
	return u.startsWith('https://')
}