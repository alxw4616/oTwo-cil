import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import vw from '@/views/vw'
import less from '@/views/less'
import npm from '@/views/npm'
Vue.use(VueRouter);
export default new VueRouter({
	routes: [{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	}, {
		path: '/vw',
		name: 'vw',
		component: vw
	}, {
		path: '/less',
		name: 'less',
		component: less
	}, {
		path: '/npm',
		name: 'npm',
		component: npm
	}]
})
