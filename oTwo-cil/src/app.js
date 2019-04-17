import Vue from 'vue';
import 'normalize.css';

import router from '@/config/router.js';
import App from './App.vue';
import User from '@/assets/js/user.js';
import FastClick from 'fastclick';
import jq from 'jquery';

FastClick.attach(document.body);

// new User() 将返回一个对象.该对象应该是本用中唯一"保存/操作"用户账号数据的对象.
// 组件中 通过 this.$root.user 访问用户账号数据;
const rootUser = new User();
Vue.prototype.jquery = jq;
new Vue({
	data:rootUser,
	router:router,
	render: h => h(App)
}).$mount('#app-box');
