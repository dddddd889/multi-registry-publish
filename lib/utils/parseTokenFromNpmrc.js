const rc = require('rc')
const { singleInstance } = require('./singleInstance')

const parseTokenFromNpmrc = singleInstance(() => {
	const npmrc = rc('npm')
	const reg = /^\/\/([\w.:]*)\/:_authToken/
	return Object.entries(npmrc).reduce((t, [k, v]) => {
		if (reg.test(k)) {
			const kk = k.match(reg)?.[1]
			// console.log("详细日志", kk, v)
			if (kk) {
				return {
					...t,
					[kk]: v
				}
			}
		}	
		return t
	}, {})
})

function parseToken(registry) {
	const u = registry instanceof URL ? registry : new URL(registry);
	const tokenObj = parseTokenFromNpmrc()
	return tokenObj[u.host] // host带端口
}
module.exports = parseToken