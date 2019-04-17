<template>
	<div>
		<h1>npm</h1>
		<h3>注册 <a href="https://www.npmjs.com/signup">npm</a></h3>
		<div>
			注意:注册成功后要验证邮箱才能发包
		</div>

		<h3>创建项目</h3>
		<div>D:\t> npm init.然后一路回车到底，你会发现你的项目文件夹多了一个package.json</div>
		<pre class="code">
{
  // 项目名
  "name": "otwo-base",

  //版本号
  "version": "0.0.3",
  "description": "otwo-base",

  //入口文件
  "main": "otwo-base.css",
  "style": "otwo-base.css",

  //文件列表
  "files": [
    "otwo-base.css"
  ],
  "author": "alxw4616",
  "license": "MIT"
}
		</pre>
		<h3>
			然后终端进行npm 登录，如果你以前使用过npm淘宝镜像的下载链接，这个时候要将下载链接设置回来
		</h3>
		<div>
			npm config set registry http://registry.npmjs.org
		</div>

		<h3>使用 npm 登录</h3>
		<div>npm login</div>

		<h3>上传包</h3>
		<div>npm publish</div>

		<h3>下载包</h3>
		<div>npm i otwo-base --S</div>
		<div>注 cnpm 与 npm 下载的结果不同</div>
		<h2>npm</h2>
		<h2>cnpm</h2>

		<h2 class="t">使用</h2>
	</div>

</template>
<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {};
		},
		components: {},
		mounted() {}
	};

</script>
<!-- 用来污染公共css -->
<style lang="less"></style>
<!-- 这里用来写私有的css -->
<style lang="less"
       scoped>
</style>
