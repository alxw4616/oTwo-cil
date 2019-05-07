<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
	</div>
</template>
<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: 'HelloWorld',
			checked: true
		};
	},
	components: {
	},
	mounted() {
		// var ss = this.$db();
		// console.log(ss.get);
		// ss.get('../../api/user_status.php', {
		// 	params: {
		// 		"action": "select",
		// 	}
		// }).then((d) => {
		// 	this.user = d.data;
		// 	// 测试用数据
		// 	// this.user = {
		// 	// 	"bind": "0",
		// 	// 	"roam": "1",
		// 	// 	"subscribe": "0",
		// 	// 	"card": "1",
		// 	// 	"online": "1"
		// 	// };
		// 	this.changeUser(this.user);
		// }).catch((e) => {});
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
