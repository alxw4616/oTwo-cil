<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<el-checkbox v-model="checked">备选项</el-checkbox>
	</div>
</template>
<script>
import jquery from "jquery";
import T from '@/assets/js/tool.js';
export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: 'HelloWorld',
			checked: true
		};
	},
	components: {
		jquery
	},
	mounted() {
		jquery.get().done(function (d) {
			console.log(d);
		})
		console.log(T.DB);
		console.log(jquery('body'));
	}
};

</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less" scoped>
@import '../assets/css/base.less';
.hh{
	font-size: 14px;
}

</style>
