<template>
	<div id="app">
		<div class="left-menu">
			<left-menu></left-menu>
		</div>
		<div class="left-body">
			<div class="top-nav">
				<top-nav></top-nav>
			</div>
			<div class="main-view">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
import topNav from '@/components/top-nav.vue';
import leftMenu from '@/components/left-menu.vue';

export default {
	components: {
		topNav,
		leftMenu
	},
	data() {
		return {}
	},
	mounted() {
		// console.log(this.$root.user);
	}
};

</script>
<style lang="less" scoped>
// 这样引用会使 esbase.css参与编译.
// 自动补全前缀等,px转vw等
// 全局样式只在入口文件引用一次
// @import 'esbase/assets/css/esbase.css';
// @import '~vux/src/styles/reset.less';

#app{
	display: flex;
}
.left-menu{
	flex:0;
}
.left-body{
	flex:1;
	height: 100vh;
	// 垂直
	display: flex;
	// 主轴的方向 row | row-reverse | column | column-reverse;
	flex-direction: column;

}
.top-nav{
	flex: 0 0 0;
	height: 50px;
	// overflow: hidden;
	background:#3c8dbc;
}
.main-view{
	overflow: auto;
	padding: 15px;

	// 默认主视图中为div且占据全部空间
	&>div{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
}
</style>
