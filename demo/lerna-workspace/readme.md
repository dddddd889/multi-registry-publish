# lerna发布demo

## 测试代码

```bash
npm i -g lerna
```

## 发布

跳过git校验和版本校验

```bash
npx lerna publish --no-git-tag-version --yes  --bump patch
```
