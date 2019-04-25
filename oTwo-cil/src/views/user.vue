/**
* vue 的基础模板
* 包含 vue 常用的 属性/方法
*/
<template>
	<div class="hello">
		<h1>不同组件间共享数据</h1>
		<html-code>
			// 由于是单页面程序.
			// 设置根vue中的data
			// 组件中 通过 this.$root.user 访问用户账号数据;
			new Vue({
				data(){
					return {
						user:rootUser
					}
				},
				router:router,
				render: h => h(App)
			}).$mount('#app-box');
		</html-code>
		<h1>父组件</h1>
		<h1>user:{{ $root.user.user}}</h1>
		user:<input type="text" v-model="$root.user.user">
		<hr>
		<user-sub></user-sub>
		<hr>
		<router-link to="/HelloWorld"><h1>同级组件hello</h1></router-link>
	</div>
</template>
<script>
	import userSub from './userSub';
	import htmlCode from './htmlCode';
	export default {
		// 组件
		components: {
			userSub,
			htmlCode
		},
		data() {
			return {
				msg: 'HelloWorld',
				checked: true,
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
		mounted() {
			this.$root.user.get();
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
	@import '../assets/css/base.less';
	@import '~otwo-base/otwo-base.less';

	h2 {
		font-weight: normal;
		color: @c;
		.border-radius(4px);
	}

</style>
