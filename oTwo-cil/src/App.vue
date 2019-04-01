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
		console.log(this.$root.user);
	}
};

</script>

<style lang="less">
// @import '~vux/src/styles/reset.less';

</style>
