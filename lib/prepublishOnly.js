const { PKG_NAME, CACHE_NAME } = require('../runtime');
const checkVersionExists = require('./utils/checkVersionExists')
const { jsonWriter } = require('./utils/jsonOp');
const logger = require('./utils/logger');

module.exports = async function prepublishOnly(packCache) {
	let { index } = packCache
	let publishConfigItem 
	const len = packCache?.data?.publishConfig?.length
	const v = `${packCache?.data?.name}@${packCache?.data?.version}`
	let versionExists

	while(index < len) {
		publishConfigItem = packCache?.data?.publishConfig?.[index]
		const r = publishConfigItem?.registry
		// 检查是否登录 版本是否已经存在
		logger.info(`检查${r}镜像，是否已发布过${v}版本`)
		versionExists = await checkVersionExists(r, packCache?.data)
		if (!versionExists) {
			logger.info(`检查${r}镜像站，未发布过${v}版本，可以发布`)
			break;
		} else {
			logger.info(`检查${r}镜像站，已发布过${v}版本`)
		}

		index += 1
	}

	if (index >= len) {
		throw new Error(`所有镜像站已存在当前版本${v}，请更新版本后再发布`)
	}

	const hadCheckedRegistry = publishConfigItem?.registry
	if (packCache.index != index) {
		logger.info(`检测到${hadCheckedRegistry}镜像站，未发布过${v}版本`)
		jsonWriter(CACHE_NAME, {
			...packCache,
			index,
		})
	}

	if (!versionExists) {
		logger.info(`发布到${hadCheckedRegistry}前写入package.json`)
		jsonWriter(PKG_NAME, {
			...(packCache?.data || {}),
			publishConfig: publishConfigItem,
		})
		logger.info(`发布到${publishConfigItem?.registry}前写入package.json 成功`)
	}
}