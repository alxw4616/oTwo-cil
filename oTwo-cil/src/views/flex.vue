/**
* vue 的基础模板
* 包含 vue 常用的 属性/方法
*/
<template>
	<div class="hello"
	     flex=coltbc>
		<div></div>
		<div flex=colcc style="height: 60px;">
			<div line="s"></div>
			<div class="b">1</div>
			<div class="b">2</div>
			<div line="s"></div>
		</div>

		<div flex=colcc
		     >
		     <div line="s"></div>
			<div class="b">3</div>
			<div class="b">4</div>
			<div class="b">5</div>
			<div class="b">5</div>
			<div line="s"></div>
		</div>

		<div flex=colcc>
			<div line="s"></div>
			<div class="b"
			     style="height: 53px;">6</div>
			<div line="s"></div>
		</div>
		<div line=s></div>
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
	.hello {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		// background:#000;
		// div{
		// 	background:#fff;
		// 	width: 100%;
		// 	text-align: center;
		// }
	}

	.b {
		background: #ccc;
		border: 1px solid #000;
	}

	.line {
		height: 1px;
		width: 100%;
		background: #000;
	}

	div[line=s] {
		width: 100vw;
		height: 0.5px !important;
		border: none;
		border-top: 0.5px solid #dcdcdc;
		margin-top: -0.5px
	}

	div[flex=coltbc] {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	div[flex=coltc] {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	div[flex=colcc] {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background:#666;
	}

</style>
