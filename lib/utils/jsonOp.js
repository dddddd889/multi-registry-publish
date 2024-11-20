const { readFileSync, writeFileSync } = require('fs')
const jsonParseSafe = require('./jsonParseSafe')

exports.jsonReader = function jsonReader(p) {
	if (!p) {
		return null
	}
	try {
		const dataBuf = readFileSync(p)
		if (!Buffer.from(dataBuf).length) {
			return null
		}
	return {
		dataBuf,
		data: jsonParseSafe(dataBuf.toString('utf-8')),
	}
	} catch (error) {
		return null	
	}
}

exports.jsonWriter = function jsonWriter(p, data) {
	if (!p) {
		return null
	}

	if (data.type !== 'Buffer' && !Buffer.isBuffer(data)) {
		data = JSON.stringify(data, null, '  ')
	} else { // json.parse 会被解析成{ type: 'Buffer', data: [ 49, 50, 51, 52 ] }这种类型
		data = Buffer.from(data).toString()
	}

	try {
		writeFileSync(p, data, 'utf-8')
	} catch (error) {
		return null	
	}
}