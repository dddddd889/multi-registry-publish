const prepublishOnly = require('../lib/prepublishOnly.js');
const postpublish = require('./postpublish.js');
const logger = require('./utils/logger.js');
const { restorePackage, readAndstorePackage } = require('./utils/storePackage.js');

const { npm_lifecycle_event: lifeCycleEvent } = process.env;
(async function main () {
	const packCache = readAndstorePackage();

	process.on('exit', (code) => {
		console.log('退出状态码', code)
		if (code > 0) {
			restorePackage(packCache);
		}
	})
	try {
		if (lifeCycleEvent === 'prepublishOnly') {
			await prepublishOnly(packCache);
		} else if (lifeCycleEvent === 'postpublish') {
			await postpublish(packCache);
		} else if (packCache) { // 如果发布失败可以考虑执行下这个脚本，然后可以恢复package.json
			await restorePackage(packCache);
		}
	} catch (error) {
		if (packCache) {
			await restorePackage(packCache);
		}
		logger.error(error?.message)

		process.exit(1);
	}
})()