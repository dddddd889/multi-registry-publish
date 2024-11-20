// const jsonReader = require('./jsonOp');
const { CACHE_NAME, PKG_NAME } = require('../constants/Var')
const { jsonReader, jsonWriter } = require('./jsonOp')
const logger = require('./logger')
const { unlinkSync } = require('fs')

exports.readAndstorePackage = function readOrStorePackageFn() {
  let packCache
  // > 读取.multi-registry-publish
  logger.info('读取缓存文件 .multi-registry-publish')
  packCache = jsonReader(CACHE_NAME)?.data
  // 在发布中了
  if (packCache) {
    return packCache
  }
  // 表明是第一次发布
  // >读取package.json
  logger.info('缓存文件 .multi-registry-publish 为空')
  logger.info('读取package.json')
  packCache = jsonReader(PKG_NAME)
  logger.info('读取package.json成功')
  packCache.index = 0
  logger.info('重制发布下标index=0')

  logger.info('检测publishConfig是否为有效数组')
  if (!Array.isArray(packCache?.data?.publishConfig)) {
    logger.info('检测publishConfig为非有效数组，将使用默认值覆盖该选项')
    packCache.data.publishConfig = publishConfigDefault
  } else {
    logger.info('检测publishConfig为有效数组')
  }
  logger.info('publishConfig值为', JSON.stringify(packCache.data.publishConfig || {}))
  logger.info('缓存package.json到.multi-registry-publish')
  jsonWriter(CACHE_NAME, packCache)
  return packCache
}

exports.restorePackage = function restorePackageFn({ dataBuf }) {
  unlinkSync('.multi-registry-publish')
  jsonWriter(PKG_NAME, dataBuf)
}
