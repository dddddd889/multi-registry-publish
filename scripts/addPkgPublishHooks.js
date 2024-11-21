const { PKG_NAME } = require('../lib/constants/var')
const { jsonReader, jsonWriter } = require('../lib/utils/jsonOp')
const path = require('path')
const logger = require('../lib/utils/logger')

function suffixCli(postpublish) {
	return `${postpublish ? `${postpublish} && ` : ``}multi-registry-publish`
}

function addPkgPublishHooks() {
	logger.info("postinstall in addPkgPublishHooks")
	const hostPath = process.env.INIT_CWD
	logger.info(`检查宿主环境为：${hostPath}，当前执行环境为：${process.cwd()}`)
	if (process.cwd() === hostPath) {
		return
	}
	
	if (!hostPath) {
		logger.error(`请手动添加指令到项目环境中
"prepublishOnly": "multi-registry-publish",
"postpublish": "multi-registry-publish"`)
		return
	}
	const pkgPath = path.resolve(hostPath, PKG_NAME)
	const { data: pkg } = jsonReader(pkgPath)
	if (!pkg?.scripts) {
		pkg.scripts = {}
	}

	pkg.scripts.prepublishOnly = suffixCli(pkg?.scripts?.prepublishOnly)
	pkg.scripts.postpublish = suffixCli(pkg?.scripts?.postpublish)
	jsonWriter(pkgPath, pkg)
	logger.info(`写入${pkgPath} prepublishOnly postpublish 钩子成功`)
}
addPkgPublishHooks()
