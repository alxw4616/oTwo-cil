// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import Router from '@/router/index.js';
import App from './App';

import 'normalize.css';
import '@/assets/css/base.css';

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router:Router,
  render: h => h(App)
}).$mount('#app-box');
