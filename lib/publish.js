const prepublishOnly = require('../lib/prepublishOnly.js');
const postpublish = require('./postpublish.js');
const { restorePackage, readAndstorePackage } = require('./utils/storePackage.js');

process.on('exit', (code) => {
	if (code > 0) {
		restorePackage(packCache);
	}
})

const { npm_lifecycle_event: lifeCycleEvent } = process.env;
(async function main () {
	const packCache = readAndstorePackage();
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

		process.exit(1);
	}
})()