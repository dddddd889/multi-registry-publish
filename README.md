# multi-registry-publish

同时向多个npm镜像站发布npm包

## 安装

```bash
pnpm add multi-registry-publish
npm install multi-registry-publish
yarn install multi-registry-publish
```

注：安转过程中会生成prepublishOnly、postpublish两个钩子

## 配置

注：不配置才会走默认配置，以下是默认配置。

在需要发布的npm包的package.json中配置，这次默认配置，不配置

```json5
{
  "publishConfig": [
    {
      "registry": "http://localhost:4877"
    },
    {
      "registry": "http://localhost:4878"
    }
  ]
}
```

默认安装时会触发一次自动注入：

```json5
{
  "scripts": {
    "prepublishOnly": "multi-registry-publish",
    "postpublish": "multi-registry-publish"
  }
}
```

> 注：这里的scripts脚本key最好不使用hooks钩子(prepublishOnly、publish、postpublish)

### 已经测过发布时的命令行参数

```bash
npm publish --tag beta
```

会向所有镜像站发布指定dist-tag为beta的包

目前只测试了`--tag`、`--verbose`能正常被publishConfig里面配置的镜像站共享，其他情况需自行测试

## 存在的问题

1. 内部启用了子进程调用了`npm publish`，这样会存在多次触发publish相关钩子函数。

## 支持的node版本

目前仅测试了node14+环境下可以进行正常发布。

## 日志打印

会生成日志文件：/data/logs/error.log、/data/logs/info.log

## 如何贡献代码

[CONTRIBUTING](./CONTRIBUTING.md)
