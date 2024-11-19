const pkgJsonParse = require("./utils/pkgJsonParse");
const logger = require("./utils/logger");
const whoami = require("./utils/auth");
const remotePkgInfo = require("./utils/remotePkgInfo");
const { buildTarballData } = require('./utils/buildTarballData');
const publishWithoutShell = require('./utils/publishWithoutShell');

const pwd = process.cwd();

async function main() {
  const pkgConfig = pkgJsonParse(pwd);
  const rgistryConfig = pkgConfig?.publishConfig ?? [];

	logger.info(`生成压缩包...`)
  const tarballData = await buildTarballData(pwd)
	logger.info(`生成压缩包 成功`)

  for (let i = 0; i < rgistryConfig.length; i++) {
    const { registry } = rgistryConfig[i];
    logger.info(`准备向${registry}发布包`);

    // 检查是否登录
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
    if (!!versions?.[pkgConfig?.version]) {
      logger.info(
        `${registry} 已经存在${pkgConfig.name}@${pkgConfig?.version}包`,
      );
      continue;
    }
    const flag = await publishWithoutShell(tarballData, { registry, tag })
    logger.info(`向${registry}${flag ? '发布成功' : '发布失败'}`);
  }
}

main();
