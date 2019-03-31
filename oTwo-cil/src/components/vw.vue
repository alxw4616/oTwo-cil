<template>
	<div class="hello">
		<h1>如何在Vue项目中使用vw实现移动端适配</h1>

		<div>cnpm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext  --S </div>
		<div>
			接下来在.postcssrc.js文件对新安装的PostCSS插件进行配置：
		</div>
		<pre class="code">
module.exports = {
	"plugins": {
		"postcss-import": {},
		"postcss-aspect-ratio-mini": {},
		"postcss-write-svg": {
			utf8: false
		},
		"postcss-cssnext": {},
		"postcss-px-to-viewport": {
			// 视窗的宽度，对应的是我们设计稿的宽度，一般是750
			viewportWidth: 750,

			// 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
			viewportHeight: 1334,

			// 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
			unitPrecision: 3,

			// 指定需要转换成的视窗单位，建议使用vw
			viewportUnit: 'vw',

			// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
			selectorBlackList: ['.ignore', '.hairlines'],

			// 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
			minPixelValue: 1,

			// 允许在媒体查询中转换`px`
			mediaQuery: false
		}
	}
}

		</pre>
		<h3>编译结果</h3>
		<pre class="code">
.w1[data-v-0cbcd42a] {
	width: 10%
}

h2[data-v-0cbcd42a] {
	font-weight: 400;
	color: red;
	border-radius: .533vw;
	-moz-border-radius: .533vw;
	-webkit-border-radius: .533vw
}

h2[data-v-0cbcd42a]:hover {
	border: 1px solid red
}

.w1[data-v-5717ac36] {
	width: 10%
}

.code[data-v-5717ac36] {
	background: #000;
	color: #fff
}

h1[data-v-5717ac36] {
	height: 4.8vw
}
		</pre>
	</div>
</template>
<script>
import jquery from "jquery";
import T from '@/assets/js/tool.js';
export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: 'HelloWorld',
			checked: true
		};
	},
	components: {
		jquery
	},
	mounted() {
		jquery.get().done(function (d) {
			console.log(d);
		})
		console.log(T.DB);
		console.log(jquery('body'));
	}
};

</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less" scoped>
@import '../assets/css/base.less';
.code{
	background: #000;
	color: #fff;
}
h1{
	height: 36px;
}

</style>
