<template>
	<div class="wrap">
		<h2>导航</h2>
		<router-link class="list"
		             tag="div"
		             v-for="(item,idx) in page"
		             :to="item.path"
		             :key="idx">
			{{item.name}}
		</router-link>
		<h2>调试页面</h2>
		<router-link class="list"
		             tag="div"
		             v-for="(item,idx) in tsetPage"
		             :to="item.path"
		             :key="'test' + idx">
			{{item.name}}
		</router-link>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				page: [],
				tsetPage: [{
					path: '/subscribe',
					name: '扫客户机码-引导关注页（已激活-已绑定+未关注',
				}, {
					path: '/barRoam',
					name: '扫客户机码-引导吧台激活页（未激活-已绑定+未开卡',
				}, {
					path: '/barBind',
					name: '扫客户机码-引导吧台绑定页（未绑定+未关注+未开卡',
				}, {
					path: '/roam?debug=1&subscribe=false',
					name: '扫客户机码-自助激活关注页-1激活（未激活+未关注+已开卡',
				}, {
					path: '/subscribeRoam',
					name: '扫客户机码-自助激活关注页-2关注（未激活+未关注+已开卡',
				}, {
					path: '/roam?debug=1&subscribe=true',
					name: '扫客户机码-自助激活页（未激活-已绑定+已开卡',
				}, {
					path: '/bind?debug=1&subscribe=false',
					name: '扫客户机码-自助绑定关注页-1绑定（未绑定+未关注+已开卡',
				}, {
					path: '/subscribeBind',
					name: '扫客户机码-自助绑定关注页-2关注（未绑定+未关注+已开卡',
				}, {
					path: '/roam?debug=1&subscribe=true',
					name: '扫客户机码-自助绑定页（未绑定+已关注+已开卡',
				}, ],
				step1: 0
			};
		},
		components: {},
		mounted() {
			// this.$route 当前的路由信息
			// this.$router app 的路由对象
			// this.$router.options.routes; app路由对象的所有配置信息
			this.page = this.$router.options.routes;
			// console.log('页面标准参数 list', this.$route.query, this.$route.query.icafe, this.$route.query.mac);
			// this.$vux.loading.show({
			// 	text: '加载中'
			// })
			// this.db = this.$db();
			// this.db.get('/api/t.json').then((d) => {
			// 	console.log('this.db.get todo');
			// }).catch((e) => {})
		}
	};

</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less"
       scoped>
	.list {
		border-bottom: 1px solid #000;
		line-height: 60px;
	}

	.wrap {
		padding: 20px;
	}

</style>
