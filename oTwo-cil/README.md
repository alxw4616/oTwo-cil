# otwocil

> vue 开发 脚手架模板.
> 分支 	mobile 	移动开发
> 分支	pc		pc开发

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

目录说明
项目根目录
│  README.txt 项目说明文档
│
├─vue
│  │  .babelrc
│  │  .editorconfig
│  │  .gitignore
│  │  .postcssrc.js
│  │  dev.bat		vue本地调试,启动快捷方式
│  │  build.bat		vue编译,启动快捷方式
│  │  copy.bat		复制到发布目,启动快捷方式
│  │  note			项目笔记
│  │  package.json
│  │  README.md
│  │
│  ├─build			webpack 配置
│  │      build.js
│  │      check-versions.js
│  │      dev-server.js
│  │      utils.js
│  │      vue-loader.conf.js
│  │      webpack.base.conf.js
│  │      webpack.dev.conf.js
│  │      webpack.prod.conf.js
│  │
│  ├─config			webpack 配置
│  │      dev.env.js
│  │      index.js 	webpack 配置,主要配置开代理解决ajax联调
│  │      prod.env.js
│  │
│  ├─dist			编译后输出目录.需要将其复制到发布目中再上传到服务器
│  │
│  └─src
│      │  App.vue 		入口文件.页面布局框架
│      │  index.html 	入口文件.挂载cdn库文件.网站标题,ico等
│      │  app.js 		入口文件.挂载全局引入
│      │
│      ├─assets 		资源
│      │  ├─css
│      │  │      base.css
│      │  │      base.less
│      │  │
│      │  ├─img
│      │  │      cnpm.png
│      │  │      npm.png
│      │  │      use-otwo-base.png
│      │  │
│      │  └─js 			主要用来放置没有通过npm引入的库文件,这些文件一般不在本项目中维护
│      │          tool.js
│      │
│      ├─components 	公共组件.被其它页面多次引用的组件应放在这里
│      │      HelloFromVux.vue
│      │      HelloWorld.vue
│      │      less.vue
│      │      npm.vue
│      │      vw.vue
│      │
│      ├─config 		配置.
│      │      router.js 路由配置.
│      │      pay-menu.js 消费菜单配置.
│      │
│      ├─test 			测试用文档
│      │  └─api
│      │          t.json
│      │          t.php
│      │
│      └─views 			页面.应该与路由路径同名.(不在限制必须使用文件夹)
└─www	发布目录.其内的文件应与服务器部署的文件完全对应
    │  indxt.html
    │
    ├─api
    └─static
        ├─css
        ├─img
        └─js