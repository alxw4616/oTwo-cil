import Vue from 'vue';
import 'normalize.css';
import 'esbase/assets/css/esbase.css';

import router from '@/config/router.js';
import App from './App.vue';
import User from '@/assets/js/user.js';
import FastClick from 'fastclick';
import jq from 'jquery';
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin);
FastClick.attach(document.body);
// Vue.prototype.jquery = jq;

// 捕获 js错误.可用于手机端调试
// Vue.config.warnHandler = function (msg, vm, trace) {
	// console.log(msg);
	// alert(msg)
	// alert(JSON.stringify(vm))
	// alert(trace)
// };

// new User() 将返回一个对象.该对象应该是本用中唯一"保存/操作"用户账号数据的对象.
// 组件中 通过 this.$root.user 访问用户账号数据;
const rootUser = new User();

new Vue({
	data(){
		return {
			user:rootUser
		}
	},
	router:router,
	render: h => h(App)
}).$mount('#app-box');
