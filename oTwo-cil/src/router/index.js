import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import vw from '@/components/vw'
import less from '@/components/less'
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
	}]
})
