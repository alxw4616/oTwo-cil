import Vue from 'vue';

import router from '@/config/router.js';
import App from './App.vue';

// 捕获 js错误.可用于手机端调试
// Vue.config.warnHandler = function (msg, vm, trace) {
	// console.log(msg);
	// alert(msg)
	// alert(JSON.stringify(vm))
	// alert(trace)
// };


new Vue({
	data(){
		return {
		}
	},
	router:router,
	render: h => h(App)
}).$mount('#app-box');