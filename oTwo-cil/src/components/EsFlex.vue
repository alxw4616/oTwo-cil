<template>
	<div>
		<slot name="h"></slot>
		<slot name="b"></slot>
		<slot name="f"></slot>
	</div>

</template>
<script>
	export default {
		data() {
			return {};
		},
		components: {},
		mounted() {}
	};

</script>
<!-- 用来污染公共css -->
<style lang="less"></style>
<!-- 这里用来写私有的css -->
<style lang="less"
       scoped>
</style>
