# version-publish
该rep为版本发布前端代码,后端代码请访问[链接](https://github.com/DonyWan/springboot-jpa-querydsl-sqlite)
## 环境
安装[nodejs](https://nodejs.org/en/)，并配置环境变量,请参考[文档](https://nodejs.org/en/download/package-manager/#windows)
## 配置
打开`./config/axios.config.js`
```
export default{
    // 该地址为后端提供api接口地址
    baseURL: 'http://127.0.0.1:8089/',
}
```
## 执行
安装依赖包
```
npm install
```
开发环境请使用
```
npm run serve
```
or
```
vue ui
```
编译项目用于生产环境
```
npm run build
```
输出到`resources/static`目录下

## 参考
- [VUE](https://cn.vuejs.org/v2/guide/)
- [ElementUI](https://element.eleme.cn/2.0/#/zh-CN/component/installation)
- [AXIOS](https://github.com/axios/axios)
## 联系
- [issues](https://github.com/DonyWan/version-publish/issues)
## License
Copyright (c) 2019 [donywan](https://github.com/DonyWan/) by [BSD](LICENSE)