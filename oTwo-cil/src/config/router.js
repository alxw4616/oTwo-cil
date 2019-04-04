// 路由懒加载
// const Foo = () => import('./Foo.vue')
// import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const HelloWorld = () => import( '@/views/HelloWorld');
const list = () => import( '@/components/list.vue');
const vw = () => import( '@/views/vw');
const less = () => import( '@/views/less');
const npm = () => import( '@/views/npm');
const calenda = () => import( '@/views/calenda');




export default new VueRouter({
	routes: [{
		path: '/',
		name: 'list',
		component: list
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
	}, {
		path: '/calenda',
		name: 'calenda',
		component: calenda
	}]
})
