/**
* vue 的基础模板
* 包含 vue 常用的 属性/方法
*/
<template>
	<div class="nav" flex-row-lrc>
		<div class="bars" flex-row-lc @click="$root.isCollapse=!$root.isCollapse">
			<font-awesome-icon :icon="['fas', 'bars']" style="color: #fff"  />
		</div>
		<div class="user" flex-row-rc>
			<img src="@/assets/img/unknown-head.png"  class="user-head">
		<div class="user-name">农垦石油</div></div>
	</div>
</template>
<script>
	// import Lib from 'assets/js/Lib';
	export default {
		// 组件
		components: {},
		data() {
			return {
				msg: 'HelloWorld',
				checked: true
			};
		},
		// 计算属性
		computed: {
			total: {
				get() {},
				set(val) {}
			}
		},
		// 侦听属性
		watch: {},
		filters: {
			// 显示 带*号的身份证号码
			showCert(val) {
				if (!val) {
					return;
				}
				let left = val.slice(0, 6);
				let right = val.slice(-4);
				console.log(left, right);
				return left + '*'.repeat(6) + right;
			},
		},
		methods: {},
		mounted() {},
		// beforeDestroy(){},
		// destroyed(){},
	};

</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less" scoped>
	.nav{
		height: 100%;
		line-height: 100%;
		padding: 0 15px;
	}
	.bars{
		width: 45px;
		height: 100%;
		cursor: pointer;
	}
	.user-head{
		width: 25px;
		height: 25px;
		margin-right: 10px;
	}
	.user-name{
		color: #fff;
	}
</style>
