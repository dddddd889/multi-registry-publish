// const args = process.argv.slice(2)

const pkgJsonParse = require('./utils/pkgJsonParse');
const logger = require('./utils/logger');
const whoami = require('./utils/auth');
const publish = require('./utils/publish');
const remotePkgInfo = require('./utils/remotePkgInfo');

const pwd = process.cwd();

async function main() {
	const pkgConfig = pkgJsonParse(pwd);
	const rgistryConfig = pkgConfig?.publishConfig ?? []

	for (let i = 0; i < rgistryConfig.length; i++) {
		const { registry } = rgistryConfig[i];
		logger.info(`准备向${registry}发布包`)

		// 检查是否登录
		await whoami(registry)
		let versions = {}
		try {
			const res = await remotePkgInfo(registry, pkgConfig.name)
			versions = res?.versions || {}
		} catch (error) {
			logger.info(`${registry} 未找到${pkgConfig.name}@${pkgConfig?.version}包`)
		}
		if (!!versions?.[pkgConfig?.version]) {
			logger.info(`${registry} 已经存在${pkgConfig.name}@${pkgConfig?.version}包`)
			continue
		}
		await publish(pwd, registry)
		logger.info(`向${registry}发布成功`)
	}
}

main()
