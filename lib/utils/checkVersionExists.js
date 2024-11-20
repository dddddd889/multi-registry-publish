const logger = require('./logger');
const remotePkgInfo = require('./remotePkgInfo');
const whoami = require('./whoami');

module.exports = async function checkVersionExists(registry, pkgConfig) {
	await whoami(registry);

	let versions = {};
	try {
		const res = await remotePkgInfo(registry, pkgConfig.name);
		versions = res?.versions || {};
	} catch (error) {
		logger.info(
			`${registry} 未找到${pkgConfig.name}@${pkgConfig?.version}包`,
		);
	}

	const versionExists = !!versions?.[pkgConfig?.version]
	if (versionExists) {
		logger.info(
			`${registry} 已经存在${pkgConfig.name}@${pkgConfig?.version}包`,
		);
	}

	return versionExists
}