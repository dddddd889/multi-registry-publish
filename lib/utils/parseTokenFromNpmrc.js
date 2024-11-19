const rc = require('rc')
const { singleInstance } = require('./singleInstance')

const pureNpmrc = singleInstance(() => {
	return rc('npm')
})

const parseTokenFromNpmrc = singleInstance(() => {
	const npmrcObj = pureNpmrc();
	const reg = /^\/\/([\w.:]*)\/:_authToken/
	return Object.entries(npmrcObj).reduce((t, [k, v]) => {
		if (reg.test(k)) {
			const kk = k.match(reg)?.[1]
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
module.exports = {
	parseToken,
	pureNpmrc,
}