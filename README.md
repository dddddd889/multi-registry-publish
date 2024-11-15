# multi-registry-publish

同时向多个npm镜像站发布npm包

## 安装

```bash
pnpm add multi-registry-publish
npm install multi-registry-publish
yarn install multi-registry-publish
```

## 配置

在需要发布的npm包的package.json中配置

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

在script脚本中添加

```json5
{
  "scripts": {
    "pub": "multi-registry-publish"
  }
}
```

> 注：这里的scripts脚本key最好不是hooks钩子(prepublishOnly、publish、postpublish)

## 支持的node版本

目前仅测试了 node14+环境下可以进行正常发布。

## 如何贡献代码

[CONTRIBUTING](./CONTRIBUTING.md)
