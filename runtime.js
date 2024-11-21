const path = require('path')
const { jsonReader } = require('./lib/utils/jsonOp')

exports.PKG_NAME = 'package.json'

const { data: cliPkg } = jsonReader(path.resolve(__dirname, PKG_NAME))
exports.cliName = cliPkg?.name
exports.CACHE_NAME = `.${cliPkg?.name}`
