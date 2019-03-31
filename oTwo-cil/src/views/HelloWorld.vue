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
	 	let ss = T.formatDate(new Date(),'Y年M月D日 hh:mm:ss');
	 	console.log(ss);

 	 	ss = T.countdown(10,1000).done(function (i) {
 			console.log(i);
 			if (i < 5) {
 				this.stop();
 			};
 		});

 		ss = T.toThousands(10000);
 		console.log(ss);
		// jquery.getJSON('api/t.json').done(function (d) {
		// 	console.log(d);
		// }).fail(function(jqXHR, textStatus, errorThrown) {
		// 	console.log(jqXHR, textStatus, errorThrown);
		// })
	}
};

</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less" scoped>
@import '../assets/css/base.less';
h2 {
	font-weight: normal;
	color: @c;
	.border-radius(4px);
}


</style>
