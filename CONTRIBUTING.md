# Contributing

## development

1. clone 代码

```bash
git clone <>
```

2. 安装依赖

```bash
cd multi-registry-publish && pnpm install
```

3. 启动用于测试的镜像

```bash
cd docker-file
docker compose up -d # 守护模式启动容器
docker compose down # 删除启动的容器
docker compose up -d --build # 增加重新编译选项，一般修改文件后需要执行此命令
docker ps -a | grep verdaccio # 可以查找运行的容器id

docker logs <container id> # 查看日志，如果想要滚动查看需要attach
docker attach <container id> # 注意这里看不到历史的
# 或者直接docker descktop查看即可
```

podman启动可直接平替docker

登录测试用户

```bash
npm login --registry=http://localhost:4877 # test4877 密码：test4877
npm login --registry=http://localhost:4878 # test4878 密码：test4878
```

4. 调试代码

vscode切换到debugger菜单中，选择“调试代码”，然后运行调试。

## 发布

分为如下版本：

- beta 测试功能
- alpha 功能基本稳定
- latest 稳定版

### 发布beta版

- 确保 package.json 的 version版本符合sevmer规范，例如：0.0.1-beta.1
- 确保git tag 版本为v0.0.1-beta.1
- 确保git push origin master --tags连同tag一起推送

### 发布alpha版

跟beta版相同。

### 不添加任何版本即为latest版

- 确保 package.json 的版本符合sevmer规范，例如：`0.0.1`
- 确保`git tag`为 `v0.0.1`
- 确保`git push origin master`连同`tag`一起推送

## 发布失败如何处理

- 删除本地tag
- 删除远端tag
- 修改好代码后重新打tag

eg.

- 使用`git tag -d v0.0.1-beta.1`删除本地tag
- 使用`git push --delete origin v0.0.1-beta.1`删除远端tag
- `git tag v0.0.1-beta.1`
- `git push origin master --tags`

## UT

借助github action能力支持了多个node版进行测试，确保发布包的稳定。

## 参考

- [npm-registry-sync](https://github.com/privatenumber/npm-registry-sync)
- [npm-multi-publish](https://github.com/privatenumber/npm-multi-publish)