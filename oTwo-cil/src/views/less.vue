<template>
	<div>
		<h1>LESS</h1>
		<h3>变量</h3>
		<hr>
		<pre class="code">
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;
@bd :1px solid #000;

#header {
  color: @light-blue;
  border: @bd;
}

Results in:

#header {
  color: #6c94be;
  border: 1px solid #000;
}
		</pre>
		<h3>混合</h3>
		<hr>
			<pre class="code">
.mixin(@c) {
  @width:  100%;
  @height: 200px;
  color:@c
}

.caller {
  .mixin(red);
  width:  @width;
  height: @height;
}

Results in:

.caller{
  color: red;
  width: 100%;
  height: 200px;
}
			</pre>
			<h3>选择器 parent selectors</h3>
			<hr>
			<pre class="code">
a {
  color: blue;
  &:hover {
    color: green;
  }
}

results in:

a {
  color: blue;
}

a:hover {
  color: green;
}
			</pre>
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
		console.log(this.$root.user = 'qwe');
		// jquery.get().done(function(d) {
		// 	console.log(d);
		// });
		// console.log(T.DB);
		// console.log(jquery('body'));
	}
};

</script>
<!-- 用来污染公共css -->
<style lang="less"></style>
<!-- 这里用来写私有的css -->
<style
  lang="less"
  scoped
>
@import '../assets/css/base.less';
@bd :1px solid #000;
.code{
	background: #000;
	color: #fff;
	border: @bd;
}

.mixin(@c) {
  @width:  100%;
  @height: 200px;
  color:@c
}

.caller {
  .mixin(red);
  width:  @width;
  height: @height;
}

</style>
