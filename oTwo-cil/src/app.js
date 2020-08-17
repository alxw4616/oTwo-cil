import Vue from 'vue';

import 'reset-css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 字体图标
// <font-awesome-icon icon="address-book" />
// <font-awesome-icon :icon="['fas', 'address-book']" />
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)


import '@/assets/css/base.less';
import '@/assets/css/flex-attribute.less';

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

			// 展开左则菜单,该属性为全局属性调用时使用$root.isCollapse
			isCollapse:false
		}
	},
	router:router,
	render: h => h(App)
}).$mount('#app-box');