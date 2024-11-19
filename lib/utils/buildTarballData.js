const pack = require('libnpmpack');

/**
 * @returns {Promise<Buffer>}
 */
exports.buildTarballData = (pwd) => {
	return pack("file:.", {
		// dryRun: false,  // 用于测试是否打包本地目录
		dryRun: true,
		foregroundScripts: true, // 前台运行
		packDestination: pwd,
		ignoreScripts: true,
	})
}