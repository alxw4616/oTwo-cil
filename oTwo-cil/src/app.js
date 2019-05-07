import Vue from 'vue';
import 'normalize.css';
import 'esbase/assets/css/esbase-pc.css';

import router from '@/config/router.js';
import App from './App.vue';
import db from '@/assets/js/db.js';
Vue.use(db);
new Vue({
	data(){
		return {
			db:Vue.$db(),

			// 组件中 通过 this.$root.user 访问用户账号数据;
			user : {

			},
			barConfig:{

			},
			query:{

			}
		}
	},
	router:router,
	render: h => h(App),
	created(){},
	mounted(){
		this.getUser();
		this.getBarConfig();
		this.query = this.getRequest(window.location.href);
	},
	methods:{
		getRequest(ss){
			let i = '',
				search = '';
			i = ss.indexOf('#/');
			ss = ss.substr(i + 2);
			i = ss.indexOf('?');
			if (i != -1) {
				ss = ss.substr(i + 1);
			} else {
				return false;
			}
			let obj = {};
			ss.replace(/(\w+)(?:=([^&]*))?/g, function(str, key, value) {
				obj[key] = value;
			});
			return Object.keys(obj).length != 0 && obj;
		},
		getUser(){

		},
		getBarConfig(){

		}
	}
}).$mount('#app-box');
