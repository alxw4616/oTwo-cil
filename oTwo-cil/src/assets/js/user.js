import axios from 'axios';
import esError from './eserror.js';
var user = function () {
	let ss = {
		"user" :'123',
		"pwd":'pwd',
		//用户是否绑定，1是 0否
		"bind": "1",

		//用户在该网吧是否激活 1是 0否
		"roam": "1",

		//用户是否关注公众号 1是 0否
		"subscribe": "1",

		//用户是否在吧台开卡 1是 0否 2未知
		"card": "1",

		//用户是否已上机 1是 0否
		"online": "1",
		get(){
			axios.get('../../api/user/php',{
				action:"select",
				icafe:"select",
			})
		},
		set(){},
		login(){},
		logout(){}
	};
	return ss;
}
export default user;