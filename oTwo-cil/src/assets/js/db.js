import axios from 'axios';
var db = function(option = {}) {
	var CancelToken = axios.CancelToken;
	var abort;

	// 默认请求参数
	var def = {
		method : 'get',
		timeout : 1000 * 40,
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
		},

		// “responseType”表示服务器将响应的数据类型
		// 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
		responseType:'json'
	}
	var opt = {

	}
	opt = Object.assign(def, option);
	var ss = axios.create(opt)

	// 添加请求拦截器
	ss.interceptors.request.use((config) => {
		if (abort) {
			abort();
		}
		config.cancelToken = new CancelToken((c) => {
			abort = c;
		});
		return config;
	});
	// 添加响应拦截器
	// 统一的错误处理应该在这里添加
	ss.interceptors.response.use((response) => {
		if (response.data.errno > '0') {
			return Promise.reject('错误已处理');
		}
		return response;
	});
	return ss;
}
export default db;
