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
			msg: 'HelloWorld'
		};
	}
};

</script>

<!-- 用来污染公共css -->
<style lang="less">
</style>

<!-- 这里用来写私有的css -->
<style lang="less" scoped>
h1,
h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}

</style>
