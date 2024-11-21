const path = require('path')
const { jsonReader } = require('./lib/utils/jsonOp')

const pkgName = 'package.json'


const { data: cliPkg } = jsonReader(path.resolve(__dirname, pkgName))

exports.PKG_NAME = pkgName
exports.cliName = cliPkg?.name
exports.CACHE_NAME = `.${cliPkg?.name}`
