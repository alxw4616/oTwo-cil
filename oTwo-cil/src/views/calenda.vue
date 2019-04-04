<template>
	<div style="width:750px">
		<h2>{{list[list.length-1]}}</h2>
		<h2>{{list.length}}|{{list.toString()}}</h2>
		<h1>result:{{result}}</h1>
		<h1>query:{{query}}</h1>
		<div class="m1">
			<div
			  class="item"
			  v-for="(item,idx) in key"
			  :key
			  @click="f2(item)"
			>
				{{item}}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: 'HelloWorld',
			checked: true,
			key: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '*','c','back'],
			list:[],
			query: "1+0",
			result:""
		};
	},
	components: {},
	mounted() {

	},
	methods:{
		f2(v){
			// js 浮点运算BUG
			// 0.6+0+7+0.06 7.659999999999999

			// '123.123+0.'.split(/([\d\.]*)/)
			//
			var list = this.query.split(/([\d\.]*)/);

			// 拆分后 . last 可能是 '',+,*,字数
			var last = list.pop();
			if (!last) {
				last = list.pop();
			}

			console.log('b2',list.length,last);

			if ('back' == v) {
				this.query = this.query.slice(0,-1);
				if (this.query =='') {
					this.query ='0';
				}
				return;
			}
			if ('c' == v) {
				this.query='0';
				return;
			}
			if ('+*'.indexOf(v) > -1) {
				// + +
				if ('+*.'.indexOf(last) > -1) {
					this.query = this.query.slice(0,-1);
					console.log('--',this.query);
					this.f2(v);
					return;
				}
				// 0.6*0.* 问题
				// last 当前值为 '0.' '+*.'.indexOf(last) > -1 === false
				if ('0.' == last) {
					this.query = this.query.slice(0,-1);
					this.query += v;
					return;
				}
				this.query += v;
				return;
			}
			if ('.' == v) {
				// . 0 + 问题
				// + . 问题
				if ('+*'.indexOf(last) > -1) {
					v = '0.';
					this.query += v;
					return;
				}

				// 1+0...1 的问题
				// '0.' -0 == 0 ; '0..' -0 == NaN
				if (isNaN((last+v)-0)) {
					return;
				}
				this.query += v;
				return;
			}

			// 1+01 的问题
			if (last == '0') {
				this.query = this.query.slice(0,-1);
				this.query +=v;
				return;
			}

			if (this.query =='0') {
				this.query =v;
				return;
			}
			this.query +=v;
		},
		f(v){
			var last = this.list.pop() || '';
			console.log('b',last);

			if ('back' == v) {
				// 1 + . back back 问题
				last =last.slice(0,-1);
				if (last > 0) {
					this.list.push(last);
				}

				// 删到最后的问题 ok
				if (this.list.length == 0) {
					this.list.push('0');
				}
				return;
			}
			if ('c' == v) {
				this.query='';
				this.list = [0];
				return;
			}
			if ('+*'.indexOf(v) > -1) {
				// 1 + + 问题 ok
				if (last =='') {
					last = this.list.pop();
					last =v;
					this.list.push(last);
					this.list.push('');
					return;
				}
				if ('+*'.indexOf(last) > -1) {
					last =v;
					this.list.push(last);
					this.list.push('');
					return;
				}

				if ('.' == last.slice(-1)) {
					last = last.slice(0,-1);
				}

				// 处理 . + 问题
				// if (!(last > 0)) {
				// 	last = '';
				// 	this.list.push(last);
				// 	return;
				// }


				this.list.push(last);
				this.list.push(v);
				this.list.push('');
				return;
			}
			if ('.' == v) {
				// . 0 + 问题
				if ('+*'.indexOf(last) > -1) {
					v = '0.';
				}
				if (isNaN((last+v)-0)) {
					this.list.push(last);
					return;
				}
				this.list.push(last+v);
				return;
			}



			if (last =='0') {
				last =v;
			}else{
				last +=v;
			}

			this.list.push(last);

		}
	},
	watch:{
		list(){
			let ss = this.list.join('');
			this.query = ss;
			// console.log('list',eval(ss));
			let v = '';
			try{
				v = eval(ss);
				this.result = v;
				return;
			}catch(e){

			}
			try{
				v = eval(ss.slice(0,-1));
				this.result = v;
			}catch(e){}

		},
		query(){
			let ss = this.query;
			let v='';
			try{
				v = eval(ss);
				this.result = v;
				return;
			}catch(e){

			}
			try{
				v = eval(ss.slice(0,-1));
				this.result = v;
			}catch(e){}

		}
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
.m1 {
	display: flex;
	flex-wrap: wrap;
	width: 750px;
}

.item {
	flex-grow: 0;
	flex-shrink: 0;
	width: 25%;
	height: 120px;
	line-height: 120px;
	font-size: 39px;
	border: 0.5px solid #000;
	margin: -0.5px;
	text-align: center;
	box-sizing: content-box;
}

</style>
