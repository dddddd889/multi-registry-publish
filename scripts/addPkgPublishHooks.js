const { PKG_NAME } = require('../lib/constants/var')
const { jsonReader, jsonWriter } = require('../lib/utils/jsonOp')
const { data: pkg } = jsonReader(PKG_NAME)

function suffixCli(postpublish) {
	return `${postpublish ? `${postpublish} && ` : ``}multi-registry-publish`
}

function addPkgPublishHooks() {
	if (!pkg?.scripts) {
		pkg.scripts = {}
	}

	pkg.scripts.prepublishOnly = suffixCli(pkg?.scripts?.prepublishOnly)
	pkg.scripts.postpublish = suffixCli(pkg?.scripts?.postpublish)
	jsonWriter(PKG_NAME, pkg)
}
addPkgPublishHooks()
