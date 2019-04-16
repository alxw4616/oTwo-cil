/**
* vue 的基础模板
* 包含 vue 常用的 属性/方法
*/
<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<div><button @click="get">get</button></div>
	</div>
</template>
<script>
	import DB from '@/assets/js/db.js';
	export default {
		// 组件
		components: {
			DB
		},
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
		methods: {
			get() {
				this.db.request().then((d) => {
					console.log('click', d);
				}).catch((e) => {});
				this.db.request().then((d) => {
					console.log('click', d);
				}).catch((e) => {});
			}
		},
		mounted() {
			// 通过DB建立的ajax 请求.有以下特性
			// 统一的错误处理 使用.catch 处理结果
			// 唯一性请求. 上次请求未完成时.再次请求. 上次请求会被放弃.使用.catch 处理结果
			this.db = new DB({
				url: 'api/t.json',
				params: {
					c: 1
				},
				// method: 'post',
				// data: {
				// 	firstName: 'Fred',
				// 	lastName: 'Flintstone'
				// }
			});
			this.db.request({
				params: {
					c: 2,
					d: 1
				}
			}).then((d) => {
				console.log('d1', d);
			}).catch((e) => {
				if (e == '错误已处理') {
					// 全局处理,这里不要单独做了.
					return;
				}
				console.log(e.response);
			});
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
