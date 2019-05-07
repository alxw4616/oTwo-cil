/**
 * vue 中的DB类
 * this.$db 一个工厂函数
 * this.$db() 将生产一个. ajax 链接对象.
 * 该对象拥有自动loading,错误处理,连续放弃
 * this.$http 就是 axios
 */
import axios from 'axios';
import LoadingComponent from './loading.vue';
import esError from './eserror.js';
let $vm
const plugin = {
	install(vue, options) {
		var Loading = vue.extend(LoadingComponent)
		if (!$vm) {
			$vm = new Loading({
				el: document.createElement('div')
			})
			document.body.appendChild($vm.$el)
		}
		const loading = {
			show(options = {}) {
				$vm.text = "Loading";
				$vm.list++;

				// 对于小于1秒的请求,不显示loading
				setTimeout(function () {
					if ($vm.list > 0) {
						$vm.show = true;
					}
				},1000);
			},
			hide() {
				$vm.list--;
				if ($vm.list < 1) {
					$vm.list = 0;
					$vm.show = false;
				}

			},
			isVisible() {
				return $vm.show;
			}
		}

		var db = function(option = {}) {
			var CancelToken = axios.CancelToken;
			var abort;
			// 默认请求参数
			var def = {
				method: 'get',
				timeout: 1000 * 40,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				},
				// “responseType”表示服务器将响应的数据类型
				// 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
				responseType: 'json'
			}
			var opt = {};
			opt = Object.assign(def, option);
			var ss = axios.create(opt)
			// 添加请求拦截器
			ss.interceptors.request.use((config) => {
				loading.show();
				if (abort) {
					loading.hide();
					abort('abort');
				}
				config.cancelToken = new CancelToken((c) => {
					abort = c;
				});
				return config;
			});
			// 添加响应拦截器
			// 统一的错误处理应该在这里添加
			ss.interceptors.response.use((response) => {
				loading.hide();
				if (response.data.errno > '0') {
					esError(response.data.errno, response.data.error);

					// 不是每个错误都可以统一处理.有些错误应该应用页面中处理
					return Promise.reject(response.data);
				}
				return response.data;
			},(err) =>{
				// 页面错误. 404,json解析失败等.
				// 这里统一处理, 不让捕获.catch
				loading.hide();
				console.info('页面请求失败',err.response);
			});
			return ss;
		}
		// all Vux's plugins are included in this.$vux
		vue.$db = db;
		vue.$http = axios;
		vue.mixin({
			created: function() {
				this.$db = vue.$db
				this.$http = vue.$http
			}
		})
	}
}
export default plugin
export const install = plugin.install
