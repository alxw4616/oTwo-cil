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
