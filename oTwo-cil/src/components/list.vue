<template>
	<div>
		<el-row class="tac">
			<el-col :span="12">
				<h5>导航</h5>
				<el-menu default-active="0" :router="true">
					<el-menu-item :index="item.path" v-for="(item,idx) in page" :key="idx">
						<i class="el-icon-menu"></i>{{item.name}}
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default {
	data() {
		return {
			page: []
		};
	},
	components: {},
	mounted() {
		// this.$route 当前的路由信息
		// this.$router app 的路由对象
		// this.$router.options.routes; app路由对象的所有配置信息
		var ss = this.$router.options.routes;
		this.page = ss;

		console.log(this.$root.user);
	}
};
</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less" scoped>
</style>
