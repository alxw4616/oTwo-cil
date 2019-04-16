import Vue from 'vue';
import 'normalize.css';

import router from '@/config/router.js';
import App from './App.vue';
import User from '@/components/user.js';
import FastClick from 'fastclick';

FastClick.attach(document.body);

// new User() 将返回一个对象.该对象应该是本用中唯一"保存/操作"用户账号数据的对象.
// 组件中 通过 this.$root.user 访问用户账号数据;
const rootUser = new User();

new Vue({
	data:rootUser,
	router:router,
	render: h => h(App)
}).$mount('#app-box');
