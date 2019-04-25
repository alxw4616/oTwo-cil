<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	data(){
		return {
		}
	},
	mounted(){
		// console.log(this.$root.user);
	}
};

</script>

<style lang="less">
// 这样引用会使 esbase.css参与编译.
// 自动补全前缀等,px转vw等
// 全局样式只在入口文件引用一次
// @import 'esbase/assets/css/esbase.css';
// @import '~vux/src/styles/reset.less';

</style>
