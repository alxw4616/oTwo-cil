<template>
	<div>
		<div v-html="codeHtml" class="code">
		</div>
		<div ref="source"
		     style="display: none;">
			<slot></slot>
		</div>
	</div>
</template>
<script>
	// import Lib from 'assets/js/Lib';
	export default {
		// 组件
		components: {},
		data() {
			return {
				pre: [],
				codeHtml: ''
			};
		},
		// 计算属性
		computed: {},
		// 侦听属性
		watch: {},
		filters: {},
		methods: {
			format(str) {
				let ss = str.split(/[\r\n]/);
				return ss;
			},
			mark(arr) {
				let html = '';
				for (let i = 0, len = arr.length; i < len; i++) {
					let ss =arr[i];
					ss = this.toHtml(ss);
					html += ss;
				}
				return html;
			},
			toHtml(str){
				let reg = /^\/\//;
				str = str.replace(/\t/g,'');
				// 设置红色字
				str = str.replace(/new/g,"<span>$1</span>");

				if (reg.test(str)) {
					return `<div class="rem">${str}</div>`;
				}
				return str;
			}
		},
		mounted() {
			var ss = this.$refs.source;
			this.code = this.format(this.$refs.source.innerHTML);
			this.codeHtml = this.mark(this.code);
		}
		// beforeDestroy(){}
		// destroyed(){}
	};

</script>

<!-- 用来污染公共css -->
<style lang="less">
	.code{
    	background: #282923;
    	color: #f3f8f2;
    	font-size: 28px;
    	line-height: 1.5em;
    }
    .rem{
    	color: #74705b;
    }
</style>

<!-- 这里用来写私有的css -->
<style lang="less"
       scoped>

</style>
