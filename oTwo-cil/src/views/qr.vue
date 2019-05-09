/**
* vue 的基础模板
* 包含 vue 常用的 属性/方法
*/
<template>
	<div class="hello">
		<img :src="src"
		     alt="">
	</div>
</template>
<script>
	// npm install --save qrcode
	import QRCode from 'qrcode'
	export default {
		// 组件
		components: {},
		data() {
			return {
				src: ''
			};
		},
		// 计算属性
		computed: {},
		// 侦听属性
		watch: {},
		filters: {},
		methods: {},
		mounted() {
			QRCode.toDataURL('http://192.168.1.25:8080/#/qr', {
				width: 300,
				margin:1
			}).then(url => {
				this.src = url;
				console.log(url)
			}).catch(err => {
				console.error(err)
			})
		}
		// beforeDestroy(){}
		// destroyed(){}
	};

</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less"
       scoped>
	// @import '../assets/css/base.less';
	// @import '~otwo-base/otwo-base.less';

	// h2 {
	// 	font-weight: normal;
	// 	color: @c;
	// 	.border-radius(4px);
	// }

</style>
