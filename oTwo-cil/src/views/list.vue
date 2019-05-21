<template>
	<div class="w">
		<router-link class="link"
		    tag="div"
		    v-for="(item,idx) in page"
		    :key="idx"
		    :to="item.path">
		    {{item.name}}
		</router-link>
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
		this.page = this.$router.options.routes;

		// console.log(this.$root.user);
	}
};

</script>
<!-- 用来污染公共css -->
<style lang="less">
</style>
<!-- 这里用来写私有的css -->
<style lang="less"
    scoped>
.w {
	padding: 30px;
}

.link {
	border-bottom: 1px solid #000;
	line-height: 60px;
}

</style>
