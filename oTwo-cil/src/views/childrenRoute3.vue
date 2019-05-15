/**
* vue 的基础模板
* 包含 vue 常用的 属性/方法
*/
<template>
	<div class="hello">
		<h1>第三层</h1>
	</div>
</template>
<script>
	// import Lib from 'assets/js/Lib';
	export default {
		// 组件
		components: {},
		data() {
			return {
			};
		},
		// 计算属性
		computed: {
		},
		// 侦听属性
		watch: {},
		filters: {
		},
		methods: {},
		mounted() {}
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
