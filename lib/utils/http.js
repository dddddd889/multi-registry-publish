const isHttps = require('./isHttps')
const https = require('https')
const http = require('http')
const jsonParseSafe = require('./jsonParseSafe')
const genError = require('./genError')

/**
 * 
 * @param {String | URL} url 
 * @param {http.RequestOptions} opts 
 * @returns 
 */
function fetch(url, opts) {
	return new Promise((resolve, reject) => {
		const requestHandler = isHttps(url) ? https : http
		const req = requestHandler.request(url, {
			...(opts || {}),
			headers: {
				...(opts?.headers || {}),
			}
		}, (res) => {
			const contentType = res.headers['content-type']
			let buf = Buffer.from('')
			res.setEncoding('utf-8');
			res.on('data', (chunk) => {
				buf = Buffer.concat([buf, Buffer.from(chunk)])
			});
			res.on('error', (e) => {
				reject(genError(`${res.url}/${res.statusCode} 响应失败：${res.statusMessage}`))
			})
			res.on('end', () => {
				if (contentType.includes('application/json') && buf.length) {
					resolve(jsonParseSafe(buf.toString()));
				} else {
					resolve();
				}
			});
		})
		req.on('error', (e) => {
			reject(genError(`发请求失败，请检查入参, ${e.message}`))
		});

		// if (data && Object.prototype.toString.call(data) === '[object Object]') {
		// 	req.write(data);
		// }

		req.end();
	})
}

['head', 'get'].map(e =>
	fetch[e] = (url, opts) => fetch(url, { ...(opts || {}), method: e.toUpperCase() })
)

module.exports = fetch