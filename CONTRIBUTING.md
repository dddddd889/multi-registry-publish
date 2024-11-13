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

登录测试用户

```bash
npm login --registry=http://localhost:4877 # test4877 密码：test4877
npm login --registry=http://localhost:4878 # test4878 密码：test4878
```

4. 调试代码

vscode切换到debugger菜单中，选择“调试代码”，然后运行调试。

## 参考

- [npm-registry-sync](https://github.com/privatenumber/npm-registry-sync)
- [npm-multi-publish](https://github.com/privatenumber/npm-multi-publish)