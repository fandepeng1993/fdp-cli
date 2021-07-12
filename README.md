# fdp-cli
##一款基于nodeJS快速创建react+typesrcript的构建wepapp项目的手脚架
###简介
#####  1.内置兼容IE8+浏览器。
#####  2.支持多语言i18next。
#####  3.支持多环境打包。
#####  4.搭载redux,redux,react-router,react-redux,redux-saga。
#####  5.集成了antd UI 3.X版本组件库,less定制主题,按需加载。
#####  6.集成了typerscript 类型语法。
#####  7.内置mock数据功能和proxy代理功能。
### 使用
####快速创建语法
```npx @frid/fdp-cli init projectName```
### 注意⚠️
#### 代理模式和mock数据模式
##### 1.在development环境下Proxy会生效，production环境会根据.env文件下的环境变量替换请求axios的BASEURL。
##### 2.mockJS 的开关在package.json的script命令中开启。"node run mock &&...",关闭mockjs只需要去掉mock即可（node run &&...）。因为在run.js中会匹配mock参数。
##### 3.proxy模式 和 MockJS模式 在development环境中优先进入mockJS中拦截匹配，匹配不到url会进入proxy中服务的代理，当然一旦在mockjs中匹配到url则不会进入proxy了。
##### 4.在MockJS中匹配不到当前请求的url地址则会进入proxy模式，代理的服务为当前.env文件中的script命令中REACT_APP_ENV参数的服务。
##### 5.局域网联调，需要后端服务器关闭防火墙，前端在.env文件中配置对应的PC的IP地址，同时在package.json中script加上start命令参数为REACT_APP_ENV=（.env配置的参数key的值【REACT_APP_WEBSITE_"[value]"】）的启动命令。



