// 路由懒加载
// const Foo = () => import('./Foo.vue')
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

var children1 = () => import('@/views/childrenRoute.vue')
var children2 = () => import('@/views/childrenRoute2.vue')
var children3 = () => import('@/views/childrenRoute3.vue')

const views = {
	list: () => import('@/views/list.vue'),
	HelloWorld: () => import('@/views/HelloWorld'),
};

const routes = [{
	path: '/',
	name: 'index',
	component: views.list
}];

routes.push({
	path:'/children1',
	name:"childrenRoute",
	component:children1,
	children:[
		{
			path:'children2',
			name:"children2",
			component:children2,
		},
		{
			path:'children3',
			name:"children3",
			component:children3,
		},
	]
})
for (let f1 in views) {
	routes.push({
		path: '/' + f1,
		name: f1,
		component: views[f1]
	});
}
export default new VueRouter({
	routes
})
