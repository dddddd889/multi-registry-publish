const path = require('path')
const { jsonReader } = require('./lib/utils/jsonOp')

const { data: cliPkg } = jsonReader(path.resolve(__dirname, PKG_NAME))

exports.cliName = cliPkg?.name
exports.PKG_NAME = 'package.json'
exports.CACHE_NAME = `.${cliPkg?.name}`
