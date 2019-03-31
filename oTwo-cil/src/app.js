// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


// import Vue from 'vue';
import router from '@/config/router.js';
import app from './app.vue';
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
// import 'normalize.css';
// import '@/assets/css/base.css';



/* eslint-disable no-new */
new Vue({
  router:router,
  render: h => h(app)
}).$mount('#app-box');
