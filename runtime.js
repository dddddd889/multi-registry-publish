const { jsonReader } = require('../utils/jsonOp')
const path = require('path')

const { data: cliPkg } = jsonReader(path.resolve(__dirname, PKG_NAME))

exports.cliName = cliPkg?.name
exports.PKG_NAME = 'package.json'
exports.CACHE_NAME = `.${cliPkg?.name}`
