// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


// import Vue from 'vue';
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
// import 'normalize.css';
// import '@/assets/css/base.css';

import router from '@/config/router.js';
import app from './app.vue';
import User from '@/components/user.js'

// new User() 将返回一个对象.该对象应该是本用中唯一"保存/操作"用户账号数据的对象.
// 组件中 通过 this.$root.user 访问用户账号数据;
const rootUser = new User();

/* eslint-disable no-new */
new Vue({
	data:rootUser,
	router:router,
	render: h => h(app)
}).$mount('#app-box');
